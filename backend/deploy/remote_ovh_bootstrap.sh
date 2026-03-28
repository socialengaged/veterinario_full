#!/usr/bin/env bash
# Sul server OVH. Porta 8060: 8000/8001/8010 già usati da altri progetti.
set -euo pipefail
API_PORT="${API_PORT:-8060}"
BACKEND="/var/www/veterinari/backend"

sudo -u postgres psql -v ON_ERROR_STOP=0 -c "CREATE USER vetuser WITH PASSWORD 'strongpassword';" 2>/dev/null || true
sudo -u postgres psql -v ON_ERROR_STOP=0 -c "CREATE DATABASE veterinari OWNER vetuser;" 2>/dev/null || true
sudo -u postgres psql -d veterinari -v ON_ERROR_STOP=0 -c "GRANT ALL ON SCHEMA public TO vetuser;" 2>/dev/null || true

SECRET="$(openssl rand -hex 32)"
cat > "$BACKEND/.env" <<EOF
DATABASE_URL=postgresql+psycopg://vetuser:strongpassword@127.0.0.1:5432/veterinari
SECRET_KEY=${SECRET}
# In produzione con dominio e HTTPS: FRONTEND_URL=https://veterinariovicino.it (link email verifica)
FRONTEND_URL=http://80.225.90.151:8080
API_PUBLIC_URL=http://80.225.90.151
ADMIN_EMAIL=seomantis@gmail.com
EMAIL_LOG_ONLY=true
SMTP_HOST=127.0.0.1
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=noreply@localhost
SMTP_USE_TLS=false
EOF

cd "$BACKEND"
. venv/bin/activate
alembic upgrade head
python scripts/seed.py

sudo tee /etc/systemd/system/veterinari.service > /dev/null <<EOF
[Unit]
Description=VeterinarioVicino API
After=network.target postgresql.service

[Service]
User=ubuntu
WorkingDirectory=${BACKEND}
EnvironmentFile=${BACKEND}/.env
ExecStart=${BACKEND}/venv/bin/uvicorn main:app --host 127.0.0.1 --port ${API_PORT}
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo tee /etc/nginx/sites-available/veterinari-ovh-ip > /dev/null <<'NGX'
server {
    listen 80;
    server_name 80.225.90.151;

    location / {
        proxy_pass http://127.0.0.1:8060;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGX

sudo systemctl daemon-reload
sudo systemctl enable veterinari
sudo systemctl restart veterinari
sudo ln -sf /etc/nginx/sites-available/veterinari-ovh-ip /etc/nginx/sites-enabled/veterinari-ovh-ip
sudo nginx -t
sudo systemctl reload nginx

echo -n "health direct: "
curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${API_PORT}/health" || true
echo ""
echo -n "health nginx: "
curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1/health" -H "Host: 80.225.90.151" || true
echo ""
systemctl is-active veterinari
