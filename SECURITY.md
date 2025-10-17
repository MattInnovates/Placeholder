# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by emailing the project maintainer. Please do not create a public GitHub issue for security vulnerabilities.

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if applicable)

We will respond to security reports within 48 hours and will keep you updated on our progress toward fixing the vulnerability.

## Security Considerations

This server:
- Validates and sanitizes all input parameters
- Limits image dimensions to prevent resource exhaustion
- Uses safe color parsing to prevent injection attacks
- Implements proper error handling to prevent information leakage

## Best Practices for Deployment

When deploying this server:

1. **Use HTTPS** in production environments
2. **Set proper rate limiting** to prevent abuse
3. **Monitor resource usage** especially memory and CPU
4. **Keep dependencies updated** by running `npm audit` regularly
5. **Use environment variables** for configuration
6. **Implement proper logging** for security monitoring