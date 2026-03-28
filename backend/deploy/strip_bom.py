from pathlib import Path

p = Path("alembic.ini")
raw = p.read_bytes()
if raw.startswith(b"\xef\xbb\xbf"):
    p.write_bytes(raw[3:])
