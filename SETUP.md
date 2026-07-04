# Saka Job Platform — Setup Guide

A full-stack job platform connecting verified job seekers with verified employers across Kenya.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- Expo CLI (`npx expo`)

## Project Structure

```
sakaJob/
├── client/          # Expo React Native mobile app
└── server/          # Node.js + Express API server
```

---

## 1. Server Setup

```bash
cd server
npm install
```

### Configure environment

The `.env` file already exists with sensible defaults:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | API server port |
| `DATABASE_URL` | `file:./dev.db` | SQLite database path |
| `JWT_SECRET` | `saka-dev-secret-change-in-production` | Token signing secret |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |

### Create database and seed data

```bash
# Generate Prisma client
npx prisma generate

# Push schema to SQLite database
npx prisma db push

# Seed with sample data
npx tsx src/seed.ts
```

### Start the server

```bash
npm run dev
```

Server runs at **http://localhost:3000**.

#### Default login credentials (seeded)

| Role | Email | Password |
|---|---|---|
| Job Seeker | `john.doe@example.com` | `password123` |
| Employer | `hr@safaricom.co.ke` | `password123` |

---

## 2. Client Setup

```bash
cd client
npm install
```

### Configure API URL

The client expects `http://10.0.2.2:3000/api` for Android emulator (localhost alias).
For iOS simulator or web, set:

```bash
# In constants/theme.ts — change API_BASE_URL or set env:
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

### Start the app

```bash
npm start
```

Then press:
- `a` for Android emulator
- `i` for iOS simulator
- `w` for web browser

---

## 3. API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get current user (auth required) |

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List jobs (with search, filter, pagination) |
| GET | `/api/jobs/matches` | AI-matched jobs for job seeker |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/jobs` | Create job (employer only) |
| PUT | `/api/jobs/:id` | Update job (owner only) |
| DELETE | `/api/jobs/:id` | Close job (owner only) |
| GET | `/api/jobs/employer/mine` | My posted jobs (employer only) |

### Applications

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications/:jobId/apply` | Apply for a job |
| GET | `/api/applications/mine` | My applications |
| GET | `/api/applications/job/:jobId` | Applicants for a job (employer) |
| PATCH | `/api/applications/:id/status` | Update application status |

### Messages

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/messages/:userId` | Chat with a user |
| GET | `/api/messages/conversations/list` | All conversations |
| POST | `/api/messages` | Send a message |
| GET | `/api/messages/unread/count` | Unread message count |

### Profile

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile/:userId` | View user profile |
| PUT | `/api/profile` | Update own profile |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | List notifications |
| PATCH | `/api/notifications/:id/read` | Mark one as read |
| PATCH | `/api/notifications/read-all` | Mark all as read |

### Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reviews` | Create a review |
| GET | `/api/reviews/user/:userId` | Get user's reviews |

### Lookup

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/lookup/job-categories` | Job categories |
| GET | `/api/lookup/employment-types` | Employment types |
| GET | `/api/lookup/experience-levels` | Experience levels |
| GET | `/api/lookup/counties` | Kenyan counties |

---

## 4. Tech Stack

### Client (React Native / Expo)
- **Expo SDK 54** with New Architecture
- **expo-router v6** — file-based routing
- **@expo/vector-icons** (Ionicons)
- **expo-secure-store** — token persistence
- TypeScript

### Server (Node.js)
- **Express** — HTTP framework
- **Prisma ORM** — database layer
- **SQLite** — development database
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT auth
- **zod** — request validation
- TypeScript

---

## 5. Troubleshooting

### "Cannot find module 'expo-secure-store'"
```bash
cd client
npx expo install expo-secure-store
```

### Client can't reach the server
- For Android emulator: use `10.0.2.2` (already configured)
- For iOS simulator: use `localhost`
- For physical device: use your machine's local IP

### Database errors
```bash
cd server
npx prisma db push --force-reset
npx tsx src/seed.ts
```
