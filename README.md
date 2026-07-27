# BrainShh — AI Mental Wellness Web Application

A calming, anonymous mental wellness companion that provides mood tracking, journaling with AI analysis, guided breathing, affirmations, coping strategies, and more. Built with HTML, CSS, JavaScript, Node.js, and powered by server-side AI (Google Gemini).

## Features

- **Daily Mood Check** — Track your mood with 5 mood options
- **AI Journal** — Write freely; get summaries, emotion detection, and coping suggestions via server-side AI (Google Gemini)
- **AI Chat** — Talk with an empathetic mental wellness companion powered by Google Gemini
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

**Note:** The AI features (Chat and Journal) are executed server-side using the Google Gemini API; API keys are stored on the server and not exposed to clients.

## Project Structure

```
BrainShh/
├── dist/                     # Frontend static files (served by Express)
│   ├── index.html            # Main HTML page
│   ├── style.css             # Complete stylesheet
│   └── script.js             # Client-side logic & AI integration
├── backend/
│   ├── server.js             # Express server entry point
│   ├── config/
│   │   └── env.js            # Environment configuration
│   ├── controllers/
│   │   ├── chatController.js # Legacy AI chat logic
│   │   ├── journalController.js # Legacy Journal AI analysis
│   │   ├── moodController.js   # Mood tracking (stateless)
│   │   └── wellnessController.js # Affirmations, tips, goals
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── rateLimiter.js        # Request rate limiting
│   │   └── sanitize.js           # Input sanitization
│   ├── routes/
│   │   ├── chat.js
│   │   ├── journal.js
│   │   ├── mood.js
│   │   └── wellness.js
│   └── services/
│       └── geminiService.js      # Legacy Gemini AI integration
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a message to the AI wellness companion (server-side Gemini) |
| POST | `/api/journal` | Analyze a journal entry with server-side AI (Gemini) |
| POST | `/api/mood` | Record a mood entry (stateless) |
| GET | `/api/mood/history` | Get mood history (returns empty — stateless) |
| GET | `/api/wellness/affirmation` | Get a random positive affirmation |
| GET | `/api/wellness/tip` | Get a daily wellness tip |
| GET | `/api/wellness/goal` | Get today's daily wellness goal |
| GET | `/api/health` | Health check endpoint |

## Stateless Design

BrainShh is designed to be lightweight and stateless. No data is persisted server-side between requests. The frontend stores the session ID in `localStorage` and passes it via the `x-session-id` header. This makes the app extremely easy to deploy and scale.

## Deployment — AWS Elastic Beanstalk

- The server listens on **port 8080** by default (configured via the `PORT` environment variable).
- Set `PORT=8080` in your Elastic Beanstalk environment configuration.
- The `dist/` folder is served as static files; the Express server handles API routes and SPA fallback.

## Security Notes

- **Server-Side AI:** AI processing is performed server-side using Google Gemini. API keys are kept on the server and never sent to clients.
- **Input Sanitization:** User input is sanitized on the backend to prevent XSS.
- **Rate Limiting:** API endpoints are protected by `express-rate-limit` to prevent abuse.
- **HTTP Security:** Helmet and CORS headers secure the communication layer.
- **Crisis Detection:** Critical safety keywords are detected on the frontend to provide immediate emergency resources.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI Model**: Google Gemini (server-side)
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Morgan
- **Charts**: Chart.js (CDN)
- **Fonts**: Google Fonts (Inter + Playfair Display)

## License

MIT
