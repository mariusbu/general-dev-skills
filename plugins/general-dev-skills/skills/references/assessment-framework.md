# System Health Assessment Framework

Use this framework when evaluating an existing system's health, identifying risks, or prioritizing improvements.

## Performance Assessment

### Response Time
- P50, P95, P99 latency for key endpoints
- Database query times (flag anything > 100ms)
- External API call times and timeout configurations

### Throughput
- Current requests/sec vs. capacity
- Database connection pool utilization
- Queue depth and processing lag (if applicable)

### Resource Usage
- CPU and memory trends (stable, growing, spiky?)
- Disk I/O and storage growth rate
- Network bandwidth utilization

## Security Assessment

### Authentication & Authorization
- [ ] All endpoints require authentication (or explicitly opted out)
- [ ] Authorization checks at the resource level, not just route level
- [ ] Session/token expiration configured and enforced
- [ ] Password hashing uses bcrypt/argon2/scrypt (not MD5/SHA)

### Input Handling
- [ ] SQL queries use parameterized statements (no string concatenation)
- [ ] HTML output escaped to prevent XSS
- [ ] File upload validation (type, size, filename sanitization)
- [ ] Rate limiting on authentication and public endpoints

### Data Protection
- [ ] Secrets stored in environment variables or secret manager (not in code)
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced on all endpoints
- [ ] PII access logged for audit trail

### Dependencies
- [ ] No known vulnerabilities in dependencies (run audit tool)
- [ ] Dependencies pinned to specific versions
- [ ] Automated dependency update process in place

## Reliability Assessment

### Failure Modes
- [ ] Single points of failure identified and documented
- [ ] Graceful degradation under load (sheds non-critical work)
- [ ] Circuit breakers on external service calls
- [ ] Health check endpoints for all services

### Observability
- [ ] Structured logging with correlation IDs
- [ ] Key metrics exported (latency, error rate, throughput)
- [ ] Alerts configured for critical failures
- [ ] Dashboards available for on-call engineers

### Recovery
- [ ] Database backup schedule and tested restore procedure
- [ ] Deployment rollback procedure documented and tested
- [ ] Incident response runbooks for common failures
- [ ] Disaster recovery plan with defined RTO/RPO

## Technical Debt Scoring

For each debt item, score:

| Factor | 1 (Low) | 2 (Medium) | 3 (High) |
|--------|---------|------------|----------|
| **Impact** | Annoyance | Slows team | Blocks work or risks outage |
| **Frequency** | Rarely encountered | Weekly | Daily |
| **Effort** | < 1 day | 1-5 days | > 1 week |

Priority = (Impact × Frequency) / Effort — highest score first.
