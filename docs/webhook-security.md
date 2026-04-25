# YooKassa Webhook Security

## Backend settings

Webhook security is controlled by environment variables:

- `TRUST_PROXY` - Express trust proxy setting (default: `loopback`).
- `YOOKASSA_WEBHOOK_ALLOWED_IPS` - comma-separated allowlist of source IPs.
- `YOOKASSA_WEBHOOK_RATE_LIMIT_MAX` - max requests per window per source IP.
- `YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS` - rate limit window in milliseconds.
- `YOOKASSA_WEBHOOK_REDIS_URL` - Redis URL for distributed rate limiting.  
  Fallback: `REDIS_URL`.
- `YOOKASSA_WEBHOOK_ALERT_THRESHOLD` - rejected-event threshold for spike alert.
- `YOOKASSA_WEBHOOK_ALERT_WINDOW_MS` - spike alert window in milliseconds.

## Reverse proxy / ingress

Use IP allowlist at proxy level before forwarding to app:

```nginx
location /payments/webhooks/yookassa {
    allow 185.71.76.0/27;
    allow 185.71.77.0/27;
    allow 77.75.153.0/25;
    deny all;

    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://backend_upstream;
}
```

Keep `TRUST_PROXY` enabled so Nest/Express uses forwarded client IP.

## Audit and alert events

Application emits structured JSON logs:

- `event=yookassa_webhook_rejected`
- `event=yookassa_webhook_rejected_spike`
- `event=yookassa_webhook_rate_limited`

Key reject reasons:

- `VERIFY_FAILED`
- `STATUS_MISMATCH`
- `MISSING_PAYMENT_ID`
- `AMOUNT_MISMATCH`
- `CURRENCY_MISMATCH`

## Example Loki alerts

```yaml
groups:
  - name: yookassa-webhook
    rules:
      - alert: YooKassaWebhookVerifyFailedSpike
        expr: sum(count_over_time({app="backend"} |= "yookassa_webhook_rejected" |= "\"reason\":\"VERIFY_FAILED\"" [5m])) > 20
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Spike of YooKassa VERIFY_FAILED webhook rejects"
      - alert: YooKassaWebhookStatusMismatchSpike
        expr: sum(count_over_time({app="backend"} |= "yookassa_webhook_rejected" |= "\"reason\":\"STATUS_MISMATCH\"" [5m])) > 20
        for: 2m
        labels:
          severity: high
        annotations:
          summary: "Spike of YooKassa STATUS_MISMATCH webhook rejects"
```
