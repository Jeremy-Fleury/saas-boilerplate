# NestJS SaaS Boilerplate

A production-ready, full-stack SaaS boilerplate built with modern technologies and best practices. This monorepo includes a NestJS backend API, a React frontend, and an auto-generated TypeScript API client.

## 🏗️ Architecture

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

## 🚀 Tech Stack

### Backend (apps/api)

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **HTTP Server**: [Fastify](https://fastify.dev/) - High-performance web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.9
- **Database ORM**: [Prisma](https://www.prisma.io/) 7.0 with PostgreSQL adapter
- **Database**: [PostgreSQL](https://www.postgresql.org/) 17 (via Docker)
- **Validation**: [class-validator](https://github.com/typestack/class-validator) & class-transformer
- **API Documentation**: 
  - [Swagger/OpenAPI](https://swagger.io/) - API specification
  - [Scalar](https://scalar.com/) - Interactive API documentation UI
- **Testing**: [Vitest](https://vitest.dev/) with coverage
- **Observability**: [Datadog APM](https://www.datadoghq.com/) (dd-trace)

### Frontend (apps/client)

- **Framework**: [React](https://react.dev/) 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: [Vite](https://vitejs.dev/) 7.2
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query) 5.90
- **HTTP Client**: [Axios](https://axios-http.com/) 1.13
- **Compiler**: [React Compiler](https://react.dev/learn/react-compiler) (Babel plugin)

### API Client Package (packages/api-client)

- **Generator**: [Orval](https://orval.dev/) - Auto-generates from OpenAPI spec
- **Output**: TypeScript client with TanStack Query hooks
- **Mocking**: [MSW](https://mswjs.io/) (Mock Service Worker)
- **Test Data**: [Faker.js](https://fakerjs.dev/)

### Developer Tools

- **Monorepo Manager**: [Turbo](https://turbo.build/) - Fast build system
- **Package Manager**: [pnpm](https://pnpm.io/) 10.0
- **Linter/Formatter**: [Biome](https://biomejs.dev/) - Fast linter & formatter
- **Commit Linting**: [Commitlint](https://commitlint.js.org/) with conventional commits
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) 9.1
- **Containerization**: [Docker Compose](https://docs.docker.com/compose/) for local database

## 📋 Prerequisites

- **Node.js**: >= 24.0.0
- **pnpm**: >= 10.0.0
- **Docker**: For running PostgreSQL locally

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Local Database

```bash
cd apps/api
pnpm docker:up
```

This starts a PostgreSQL 17 container on port 5432 with:
- Database: `db`
- User: `admin`
- Password: `password`

### 3. Setup Database Schema

```bash
cd apps/api

# Run migrations
pnpm prisma:migrate

# Generate Prisma client
pnpm prisma:generate
```

### 4. Start Development Servers

From the root directory:

```bash
pnpm dev
```

This command (via Turbo):
1. Starts the Docker database (if not running)
2. Generates the API client from OpenAPI spec
3. Starts the NestJS API (http://localhost:3000)
4. Starts the React app (http://localhost:5173)

## 📚 Available Scripts

### Root Level (Monorepo)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm check` | Run Biome linter checks |
| `pnpm check:fix` | Fix Biome linting issues |

### Backend (apps/api)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start API in watch mode |
| `pnpm build` | Build API for production |
| `pnpm start:prod` | Start production build |
| `pnpm test` | Run Vitest tests |
| `pnpm docker:up` | Start PostgreSQL container |
| `pnpm prisma:migrate` | Run database migrations |
| `pnpm prisma:generate` | Generate Prisma client |
| `pnpm prisma:studio` | Open Prisma Studio (DB GUI) |
| `pnpm openapi:export` | Export OpenAPI specification |
| `pnpm build:api-client` | Generate API client with Orval |

### Frontend (apps/client)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in `apps/api/`:

```env
NODE_ENV=local
PORT=3000
DATABASE_URL="postgresql://admin:password@localhost:5432/db"
```

### Vite Configuration (Frontend)

Set `VITE_API_URL` in `apps/client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

## 📖 API Documentation

Once the API is running, access the documentation at:

- **Interactive Docs (Scalar)**: http://localhost:3000/docs

## 🗄️ Database

### Prisma Schema Organization

The Prisma schema is organized into multiple files:

```
apps/api/prisma/schema/
├── main.prisma         # Main config (generator, datasource)
├── enums/              # Enum definitions
└── models/             # Model definitions
    ├── company.model.prisma
    └── example.model.prisma
```

### Useful Prisma Commands

```bash
# Create a new migration
pnpm prisma:migrate

# Format Prisma schema files
pnpm prisma:format

# Validate schema
pnpm prisma:validate

# Open Prisma Studio (visual DB editor)
pnpm prisma:studio

# Generate ERD diagram
pnpm prisma:generate  # Creates README_DATABASE.md
```

## 🧪 Testing

Run tests with Vitest:

```bash
cd apps/api
pnpm test

# With coverage
pnpm test --coverage
```

## 📦 API Client Generation

The TypeScript API client is automatically generated from the OpenAPI specification:

1. **Export OpenAPI spec**: `pnpm openapi:export` (in apps/api)
2. **Generate client**: `pnpm build:api-client` (in apps/api)

The generated client provides:
- Type-safe API calls
- TanStack Query hooks (e.g., `useAppControllerHealth`)
- Request/Response TypeScript interfaces

Usage in frontend:

```typescript
import { useAppControllerHealth } from "@org/api-client";

function MyComponent() {
  const { data, isLoading, error } = useAppControllerHealth();
  // ...
}
```

## 🎨 Code Quality

### Linting & Formatting

This project uses **Biome** for fast linting and formatting:

```bash
# Check for issues
pnpm check

# Auto-fix issues
pnpm check:fix
```

### Commit Conventions

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve database connection issue
docs: update README
```

Commitlint enforces this via Husky pre-commit hooks.

## 🏢 Project Modules

The boilerplate includes example modules demonstrating the architecture:

- **Example Module**: Full CRUD example with DDD structure

## 🔐 Security Features

- **CORS**: Configured with credentials support
- **Validation Pipes**: Global DTO validation
- **Exception Filters**: Standardized error responses
- **Datadog Tracing**: Request tracking and monitoring

## 🚢 Deployment

### Build for Production

```bash
# Build all apps
pnpm build

# API output: apps/api/dist/
# Client output: apps/client/dist/
```

### Running in Production

```bash
cd apps/api
pnpm start:prod
```

Ensure production environment variables are configured.

## 📝 Development Workflow

1. **Create a new feature module** following the DDD structure
2. **Define Prisma models** in `apps/api/prisma/schema/models/`
3. **Run migrations** to update the database
4. **Implement domain logic** (entities, value objects)
5. **Create use cases** in the application layer
6. **Add controllers** and DTOs in the presentation layer
7. **Export OpenAPI spec** and regenerate the API client
8. **Use generated hooks** in the React frontend

## 🤝 Contributing

1. Follow the existing architecture patterns
2. Use conventional commits
3. Run `pnpm check` before committing
4. Write tests for new features
5. Update documentation as needed

## 📄 License

This project is a boilerplate template. Set your own license as needed.

## 🙏 Credits

Built with modern tools and best practices for scalable SaaS applications.

---

**Happy coding! 🚀**

