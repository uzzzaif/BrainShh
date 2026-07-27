# BrainShh — AI Mental Wellness Web Application

A calming, anonymous mental wellness companion that provides mood tracking, journaling, guided breathing, affirmations, coping strategies, and more. Built with HTML, CSS, JavaScript, and Node.js, with a fully stateless backend and a local mock AI engine for testing.

## Features

- **Daily Mood Check** — Track your mood with 5 mood options
- **AI Journal** — Write freely and analyze entries through the app's existing client flow without server-side persistence
- **AI Chat** — Talk with an empathetic mental wellness companion powered by a local mock AI engine
- **Guided Breathing** — Animated 4-4-4 breathing exercise
- **Mood Analytics** — Weekly charts, streaks, and averages (Chart.js)
- **Positive Affirmations** — 50+ affirmations, randomly generated locally
- **Coping Strategies** — 6 categorized local libraries (stress, anxiety, sadness, burnout, loneliness, overthinking)
- **Wellness Tips** — Daily wellness tips from a predefined list
- **Daily Goals** — Random wellness goal generated daily from 30+ goals
- **Gratitude Journal** — Save 3 good things each day (stored locally)
- **Relaxation Sounds** — Rain, forest, ocean, and white noise (Web Audio API)
- **Emergency Resources** — Crisis detection before AI chat + emergency resource links
- **Dark Mode Toggle** — Smooth theme switching
- **Toast Notifications** — Non-intrusive feedback
- **Mobile Responsive** — Works on all screen sizes
- **Anonymous Usage** — No login required; session ID in localStorage

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The app runs at `http://localhost:8080`.

**Note:** The backend is stateless, serves the compiled `dist/` folder when present, and uses a local keyword-based mock AI response engine. No external API key is required for testing.

## Project Structure

```
BrainShh/
├── dist/                     # Frontend static files (served by Express)
│   ├── index.html            # Main HTML page
│   ├── style.css             # Complete stylesheet
│   └── script.js             # Client-side logic & AI integration
├── server.js                 # Stateless Express server with mock AI and static file serving
├── backend/
│   └── controllers, middleware, routes, and legacy services
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a message to the mock AI wellness companion |
| POST | `/api/journal` | Accept a journal entry without server-side persistence |
| POST | `/api/mood` | Accept a mood check-in without server-side persistence |
| GET | `/api/mood/history` | Returns an empty array because the backend is stateless |
| GET | `/api/affirmation` | Get a random positive affirmation |
| GET | `/api/tip` | Get a daily wellness tip |
| GET | `/api/goal` | Get today's daily wellness goal |
| GET | `/api/health` | Health check endpoint |

## Stateless Design

BrainShh is designed to be lightweight and stateless. No user data is persisted server-side between requests. The backend returns deterministic JSON for wellness helpers and mock chat responses so the app remains usable without an API key.

## Deployment — AWS Elastic Beanstalk

- The server listens on **port 8080**.
- The backend serves the `dist/` folder when it exists and falls back gracefully when it does not.
- This layout is ready for AWS Elastic Beanstalk deployment with a fixed listener port.

## Deployment — Vercel

- The project is configured to deploy as a static site from `dist/`.
- All `/api/*` requests are handled by a serverless catch-all function in `api/[...path].js`.
- Add the repository to Vercel and deploy without a separate backend process.
- The app remains stateless and does not require a database or external AI key for testing.

## Security Notes

- **Mock AI Engine:** `/api/chat` uses a local keyword-based response engine so the app works without an external API key.
- **Environment Ready:** `.env` support remains in place for future API integration.
- **HTTP Security:** CORS is enabled for the client and the backend stays minimal for easier deployment.
- **Crisis Detection:** Critical safety keywords are detected in the existing client flow to provide immediate emergency guidance.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI Model**: Local mock AI engine
- **Security**: CORS, dotenv-ready configuration
- **Charts**: Chart.js (CDN)
- **Fonts**: Google Fonts (Inter + Playfair Display)

## License

MIT
