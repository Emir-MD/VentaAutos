"""Utilidades generales."""
import secrets

def generate_token() -> str:
    """Token URL-safe criptofuerte (~22-24 chars)."""
    return secrets.token_urlsafe(16)
