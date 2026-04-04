#!/usr/bin/env bash
set -euo pipefail
IDS=/tmp/e2e_ids.txt
test -f "$IDS"
USER_ID=$(sed -n '1p' "$IDS")
RID=$(sed -n '2p' "$IDS")
CID=$(sed -n '3p' "$IDS")
EMAIL=$(sed -n '4p' "$IDS")

echo "=== DB user ==="
sudo -u postgres psql -d veterinari -c "SELECT id, email, full_name, phone FROM users WHERE id='$USER_ID';"

echo "=== DB vet_request + specialty ==="
sudo -u postgres psql -d veterinari -c "SELECT vr.id, vr.status, s.slug, s.name, vr.urgency FROM vet_requests vr JOIN specialties s ON s.id=vr.specialty_id WHERE vr.id='$RID';"

echo "=== DB request_matches (Lecce / visite) ==="
sudo -u postgres psql -d veterinari -c "SELECT rm.score, sp.full_name, sp.city, sp.province FROM request_matches rm JOIN specialists sp ON sp.id=rm.specialist_id WHERE rm.request_id='$RID' ORDER BY rm.score DESC;"

echo "=== DB conversation + message count ==="
sudo -u postgres psql -d veterinari -c "SELECT c.id, c.request_id, (SELECT count(*) FROM messages m WHERE m.conversation_id=c.id) AS msg_count FROM conversations c WHERE c.id='$CID';"

echo "=== Ultima admin_notifications (payload whatsapp_text estratto) ==="
sudo -u postgres psql -d veterinari -Atc "SELECT payload_json->'whatsapp_text' FROM admin_notifications ORDER BY created_at DESC LIMIT 1;" | head -c 1200
echo
echo "..."

echo "=== .env ADMIN_EMAIL / SMTP (maschera password) ==="
grep -E '^(ADMIN_EMAIL|SMTP_|EMAIL_LOG_ONLY)=' /var/www/veterinari/backend/.env | sed 's/SMTP_PASSWORD=.*/SMTP_PASSWORD=(segreta)/'

echo "=== journal email (ultime righe rilevanti) ==="
sudo journalctl -u veterinari -n 30 --no-pager | grep -iE 'email|smtp|exception' | tail -15 || true
