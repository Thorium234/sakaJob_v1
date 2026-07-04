# sakaJob — Job Marketplace App

A full-stack mobile-first job marketplace connecting job seekers and employers in Kenya, featuring AI-powered job matching and real-time messaging.

## Architecture

```
reactNode/
├── client/          # React Native (Expo SDK 54) — mobile app
│   ├── app/         # expo-router file-based routing
│   ├── components/  # Reusable UI primitives
│   ├── context/     # Auth state management
│   ├── constants/   # Theme & design tokens
│   ├── types/       # TypeScript interfaces
│   └── lib/         # API client
├── server/          # Node.js (Express + Prisma) — REST API
│   ├── prisma/      # Database schema & migrations
│   └── src/
│       ├── routes/      # Route handlers
│       ├── services/    # Business logic (matching, notifications)
│       └── middleware/  # Auth & role guards
└── ...
```

## Features

- **JWT Authentication** — Role-based access (Job Seeker / Employer)
- **AI Job Matching** — Scores jobs vs applicants on skills (35%), education (20%), experience (25%), and location (20%)
- **Application Lifecycle** — Status tracking: Received → Shortlisted → Interview → Accepted/Declined
- **Real-time Messaging** — 1-on-1 chat between users
- **Employer Verification** — National ID for seekers, company registration for employers
- **Kenya-focused** — County-based location, KES currency, Kenyan ID fields

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (0.81), Expo SDK 54, Expo Router v6 |
| Backend | Node.js, Express 4, TypeScript |
| Database | SQLite (Prisma ORM) |
| Auth | JWT + bcryptjs |
| Linting | ESLint (flat config) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for emulators)

### Clone & Install

```bash
git clone https://github.com/Thorium234/sakaJob_v1.git
cd reactNode

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..

# Set up the database (from server/)
cd server && npx prisma db push && cd ..
```

### Run the App

**Start the API server:**
```bash
cd server
npm run dev
```

**Start the mobile app:**
```bash
cd client
npx expo start
# Then press 'a' for Android, 'i' for iOS, or 'w' for web
```

## Scripts

### Client (`client/`)

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npx expo start --android` | Start on Android emulator |
| `npx expo start --ios` | Start on iOS simulator |
| `npx expo start --web` | Start on web browser |
| `npm run lint` | Run ESLint |

### Server (`server/`)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:migrate` | Run Prisma migrations |

## License

MIT — see [LICENSE](LICENSE).
