# LinkForge

## Live Demo

Frontend: https://your-vercel-url.vercel.app  
Backend Health Check: https://linkforge-ydpd.onrender.com/health

LinkForge is a full-stack URL shortener application built with React, Node.js, Express, TypeScript, PostgreSQL, Prisma, and Redis.

It allows users to create short links, redirect using short codes, track clicks, view URL history, and fetch analytics. The backend uses JWT authentication with HTTP-only cookies and Redis caching for faster redirects.

---

## Features

### Authentication
- User signup and login
- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookie storage
- Protected user routes
- Logout support

### URL Shortening
- Create short URLs from long URLs
- Base62 encoding for compact short codes
- Duplicate URL prevention per user
- Public redirect route using short code
- URL validation middleware

### Analytics
- Click tracking for each short URL
- URL stats endpoint
- User URL history endpoint
- Followed status based on click count

### Redis Caching
- Redis caching for short URL redirects
- Cache miss fetches from PostgreSQL and stores result in Redis
- Cache hit redirects using cached data
- Invalid cache fallback handling

### Frontend
- React + TypeScript frontend
- Signup and login UI
- Dashboard for creating short links
- Copy short URL button
- URL history table
- Stats view
- Dashboard persistence after page reload using `/auth/me`

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- JWT
- bcrypt
- cookie-parser
- CORS

---

## Project Structure

```bash
LinkForge/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── prisma.config.ts
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md


LinkForge uses an auto-incrementing database ID and converts it into a Base62 short code.

Example:

ID: 125
Base62: 21
Short URL: http://localhost:3000/21

Flow:

Insert URL into database
        ↓
PostgreSQL generates numeric ID
        ↓
Encode ID using Base62
        ↓
Update row with shortCode
        ↓
Return short URL
Redis Caching Flow

Redirects are optimized using Redis.

User visits /:shortCode
        ↓
Check Redis cache
        ↓
If cache hit:
    Use cached original URL and ID
    Increment clicks
    Redirect user

If cache miss:
    Fetch from PostgreSQL
    Store ID and original URL in Redis
    Increment clicks
    Redirect user

