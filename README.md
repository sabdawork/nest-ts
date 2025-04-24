# Sabda Nest

A clean, minimal Sabda Nest with full TypeScript strict mode, MongoDB integration, ESLint, Prettier, PM2 process manager, and Docker support.

## 🚀 Features

- ✅ NestJS with TypeScript (`strict: true`)
- ✅ MongoDB module (reusable across feature modules)
- ✅ ESLint + Prettier
- ✅ Husky + Commitlint (Git hook support)
- ✅ Helmet, CORS, Global Filters/Guards
- ✅ Dockerized for easy deployment

## 🧑‍💻 Local Development

```bash
# Install dependencies
pnpm install

# Start the app in development mode
pnpm start:dev
```

## 🐳 Docker Usage

### Build the image

```bash
docker build -t sqm-v3-api .
```

### Run the container

```bash
docker run -p 8000:8000 --env-file .env sqm-v3-api

#or

docker run -p 8000:8000 --env-file .env.prod sqm-v3-api
```

> ℹ️ Make sure MongoDB is running and accessible at the configured URI in `.env`.

## 📂 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── mongodb/          # MongoDB module setup
├── schema/           # MongoDB Schema & Document Interface
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

## 🔐 Security

- Helmet for setting secure HTTP headers
- CORS enabled and configurable
- Global exception filters and guards

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
