# NestJS SaaS Boilerplate

Full-stack SaaS boilerplate built with modern technologies and best practices. This monorepo includes a NestJS backend API, a React frontend, and an auto-generated TypeScript API client.

## Prerequisites

- **Node.js**: >= 24.0.0
- **pnpm**: >= 10.0.0
- **Docker**: For running PostgreSQL locally

## Getting Started

From the root directory, run the following commands:

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Local Environment

```bash
pnpm setup:local
```

### 3. Start Development Servers

```bash
pnpm dev
```

## Auth0 Setup (Client ↔ API)

This boilerplate now supports an Auth0 JWT flow between the React client and the NestJS API.

### 1) Create Auth0 Applications

- **SPA Application** (for the React client)
- **API** (for the NestJS backend)

Make note of:
- **Domain** (e.g. `your-tenant.us.auth0.com`)
- **Client ID** (SPA app)
- **API Identifier / Audience** (API)

### 2) Configure Auth0 URLs

In your SPA app settings (Auth0):
- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`

Adjust the origin if your client runs on another port.

### 3) Environment Variables

Client (`apps/client/.env`):
```
VITE_API_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your_spa_client_id
VITE_AUTH0_AUDIENCE=your_api_identifier
```

API (`apps/api/.env`):
```
NODE_ENV=local
PORT=3000
AUTH0_ISSUER_URL=https://your-tenant.us.auth0.com/
AUTH0_AUDIENCE=your_api_identifier
```

### 4) Authenticated Endpoints

The `example` endpoints are protected with a JWT guard. Once logged in, the client will attach
the Auth0 access token to API requests automatically.

## Architecture

This project follows a **monorepo architecture** powered by pnpm workspaces and Turbo, organized into apps and packages:

```
nestjs-boilerplate/
├── apps/
│   ├── api/          # NestJS backend (Fastify)
│   └── client/       # React frontend (Vite)
└── packages/
    └── api-client/   # Auto-generated TypeScript client
```

### Backend Architecture (Clean Architecture / DDD)

The API follows **Domain-Driven Design** principles with a layered architecture:

- **Domain Layer**: Core business logic, entities, and value objects
- **Application Layer**: Use cases and business workflows
- **Infrastructure Layer**: External concerns (database, repositories)
- **Presentation Layer**: Controllers, DTOs, and API contracts

Example module structure:
```
modules/example/
├── domain/          # Entities, value objects, repository interfaces
├── application/     # Use cases (business logic)
├── infrastructure/  # Repository implementations, DI
└── presentation/    # Controllers, DTOs, mappers
```

## Tech Stack

### Backend (apps/api)

- **Framework**: [NestJS](https://nestjs.com/)
- **HTTP Server**: [Fastify](https://fastify.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **API Documentation**: [Scalar](https://scalar.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Observability**: [Datadog APM](https://www.datadoghq.com/)

### Frontend (apps/client)

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Compiler**: [React Compiler](https://react.dev/learn/react-compiler)

### API Client Package (packages/api-client)

- **Generator**: [Orval](https://orval.dev/)
- **Output**: [Tanstack Query](https://tanstack.com/query)
- **Mocking**: [MSW](https://mswjs.io/)
- **Test Data**: [Faker.js](https://fakerjs.dev/)

## License

This project is a boilerplate template. Set your own license as needed.

---

**Happy coding! 🚀**
