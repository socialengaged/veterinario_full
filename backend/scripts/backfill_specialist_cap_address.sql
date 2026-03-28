-- Backfill CAP e indirizzo per specialisti di seed (stessi valori di scripts/seed.py).
-- Compila solo i campi ancora NULL (COALESCE: non sovrascrive valori già impostati a mano).
--
-- Esempio esecuzione sul server:
--   cd /var/www/veterinari/backend
--   sudo -u postgres psql -d veterinari -f scripts/backfill_specialist_cap_address.sql
--   oppure: psql -U vetuser -h 127.0.0.1 -d veterinari -f scripts/backfill_specialist_cap_address.sql
--
-- Per specialisti reali (email diverse), copiare il modello e adattare email/CAP/indirizzo.

UPDATE specialists SET
  cap = COALESCE(cap, '73100'),
  street_address = COALESCE(street_address, 'Via degli Acaya 12')
WHERE email = 'dr.rossi.lecce@example.com';

UPDATE specialists SET
  cap = COALESCE(cap, '70121'),
  street_address = COALESCE(street_address, 'Via Napoli 45')
WHERE email = 'clinica.bari@example.com';

UPDATE specialists SET
  cap = COALESCE(cap, '00185'),
  street_address = COALESCE(street_address, 'Piazza San Giovanni 3')
WHERE email = 'ambulatorio.roma@example.com';

UPDATE specialists SET
  cap = COALESCE(cap, '73100'),
  street_address = COALESCE(street_address, 'Strada Statale 275 km 2')
WHERE email = 'emergenze.lecce@example.com';

-- Verifica: SELECT email, city, province, cap, street_address FROM specialists ORDER BY email;
