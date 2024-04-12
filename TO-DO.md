### Security

- [ ] Implement best practices for `CORS` & `Helmet` middleware.
- [ ] Implement Content Security Policy `(CSP)` headers to prevent XSS, clickjacking, and other code injection attacks.
- [ ] Utilize a Web Application Firewall (WAF) for additional security measures.
- [ ] Integrate npm package [validator](https://www.npmjs.com/package/validator) for input validation and security.
- [ ] Use `express-mongo-sanitize`

### Application Build

- [ ] Implement pagination functionality.
- [ ] Implement a Request Query feature to allow clients to specify data requirements such as limit and filters.
- [ ] DTOs & Role-based Data Transformation Objects

- [ ] Set up Docker & Docker Compose.
- [ ] Implement unit tests, integration tests, and end-to-end tests to ensure code quality and reliability.
- [ ] Set up CI/CD pipelines using Github Actions.

- [ ] Implement OAuth2, with `Google`, `Github`, `X`

### Performance & Enhancement

- [ ] Develop optimization strategies for databases.
- [ ] Implement database indexing for improved query performance.
- [ ] Set up Rate Limiting & Caching mechanisms in both server and client.
- [ ] Incorporate Redis for caching and session management.

### User Experience & Error Handling

- [ ] Establish Role-Based Access Control (RBAC) to manage user permissions effectively.
- [ ] Implement redirection to `/404` or return `req.socket.destroy()` response for unauthorized access attempts to admin APIs by non-admin users.
- [x] Use [Zod](https://zod.dev/) for request data validation
- [ ] Use [@hapi/boom](https://hapi.dev/module/boom/api) form error responses

### Documentation & Quality Assurance

- [ ] Set up centralized error logging with services like Sentry or Loggly for better error monitoring and debugging.
- [ ] Utilize Redocly lint for OpenAPI-spec validation.
- [x] Generate and maintain comprehensive API documentation using tools like Swagger or OpenAPI.

### Production Deployment

- [ ] Ensure all functions are asynchronous for improved single-thread performance.
- [ ] Implement compression and adhere to Express best practices for production deployment.
- [ ] Implement multi thread & use PM2
- [ ] Handle App crash, you can see [This](https://blog.heroku.com/best-practices-nodejs-errors)
- [ ] Better logger setup for production to `winston` and `morgan`