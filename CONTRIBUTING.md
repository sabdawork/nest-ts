# Contributing to Sabda Nest API

Thank you for your interest in improving the Sabda Nest API! 🎉  
We value clean code, maintainability, and thoughtful contributions. This document outlines our expectations, setup instructions, and code conventions to help streamline your contribution process.

---

## 🧰 Requirements

Ensure you have the following installed:

- **Node.js** `>= 22.x`
- **pnpm** `>= 9.x`
- **Docker** (for local MongoDB or services)
- **MongoDB** (local instance, Docker container, or cloud)

---

## 🛠 Local Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Modify `.env` with appropriate local or cloud credentials

# Start development server
pnpm start:dev
```

---

## 💡 Code & Architecture Standards

### TypeScript

- Strict mode enabled (`strict: true`)
- All code must be type-safe with minimal usage of `any`
- Prefer `interface` over `type` for data contracts

### Linting & Formatting

- ESLint configured with strict rules
- Prettier for auto-formatting
- `pnpm lint` & `pnpm format` must pass before commit

### Git Hooks

- [Husky](https://typicode.github.io/husky) manages pre-commit and commit-msg hooks
- Includes automatic formatting, linting, and commit message checks

---

## 🧱 Naming & Structure Conventions

- All service files: `*.service.ts`  
  Example: `example.service.ts`
- Static/mock data files: `*-data.ts`  
  Example: `example-data.ts`

- Functions: Use `camelCase`, starting with a lowercase letter  
  Example: `exampleFunc`, `loadInitialData`

- Directory structure should follow domain-driven and modular architecture

---

## 🔁 Git Flow & Branching Strategy

### 1. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
```

Use appropriate prefixes:

- `feat/`: New feature
- `fix/`: Bug fix
- `chore/`: Tooling or infra
- `refactor/`: Code restructure
- `test/`: Testing improvements
- `docs/`: Documentation changes

### 2. Make Changes and Commit

```bash
# Use Conventional Commits format
git commit -m "feat: implement login logic"
```

### 3. Push and Open a PR

```bash
git push origin feat/your-feature-name
```

Then open a **Pull Request** on GitHub.

---

## ✅ PR Checklist

Before requesting a review:

- [ ] Code is formatted (`pnpm format`) and linted (`pnpm lint`)
- [ ] Tests are added or updated
- [ ] `pnpm test` passes (unit + e2e)
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Docs and README are updated if applicable

---

## 🧪 Testing Strategy

We use a layered test approach:

```bash
# Unit tests
pnpm test

# End-to-End tests
pnpm test:e2e
```

- All new features must be covered by tests
- Mocks should be used for external dependencies
- Use descriptive test names and group related tests with `describe()`

---

## 🙌 Thank You
