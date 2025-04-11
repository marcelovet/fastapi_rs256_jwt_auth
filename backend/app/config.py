import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Carregar chaves RSA
with open(os.path.join(BASE_DIR, "private_key.pem"), "r") as f:
    PRIVATE_KEY = f.read()

with open(os.path.join(BASE_DIR, "public_key.pem"), "r") as f:
    PUBLIC_KEY = f.read()

# Configurações JWT
JWT_ALGORITHM = "RS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
