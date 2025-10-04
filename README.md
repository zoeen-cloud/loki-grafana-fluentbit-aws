# Loki + Grafana + Fluent Bit (AWS) — IP Test Mode

This repo contains a production-ready stack for logs with **Loki (S3 backend)** and **Grafana**, fronted by **Caddy**.
It works immediately using your **Elastic IP** (no DNS needed) via a self-signed certificate.

## Quick start
1. Replace `<ElasticIP>` in:
   - `docker-compose.yml` (GF_SERVER_ROOT_URL)
   - `proxy/Caddyfile`
2. Generate a bcrypt password hash for Loki basic auth and replace `REPLACE_WITH_BCRYPT_HASH`:
   ```bash
   docker run --rm caddy:2.7 caddy hash-password --plaintext 'ChangeThis!2025'
   ```
3. On the EC2:
   ```bash
   cd /opt/gps-observability
   docker compose pull
   docker compose up -d
   ```
4. Visit Grafana: `https://<ElasticIP>/grafana` (admin / ChangeMe_#2025)
5. Agents (Fluent Bit) on app servers send logs to `https://<ElasticIP>/loki` with basic auth.

## Switching to domain mode later
- Point DNS A records for `grafana.zoeencloud.in` and `loki.zoeencloud.in` to the Elastic IP.
- Swap `proxy/Caddyfile` to a domain-mode config (Let’s Encrypt).
- Change `GF_SERVER_ROOT_URL` to `https://grafana.zoeencloud.in`.
