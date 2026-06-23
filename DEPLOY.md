# Deploy Guide: Smart Link POS (الربط الذكي)

## Render (Production)

### 1. Create a PostgreSQL database
- Go to https://console.neon.tech and create a new project
- Copy the connection string (DATABASE_URL)

### 2. Deploy to Render
- Connect your GitHub repo to Render
- Create a new **Web Service**
- Use these settings:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npx prisma db push --accept-data-loss && npx next start -p $PORT` |
| **Plan** | Free |

### 3. Environment Variables
Set these in Render dashboard:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `NEXTAUTH_SECRET` | Generate via `openssl rand -base64 32` |
| `AUTH_SECRET` | Same as NEXTAUTH_SECRET |
| `NODE_VERSION` | `22` |

### 4. After Deploy
- The app will auto-seed the admin user on first start via `prisma db push`
- Login at `https://your-app.onrender.com/login`
- Default credentials: **admin@pos.com** / **admin123**

### 5. Troubleshooting
- **Build fails**: Check DATABASE_URL is correct in env vars
- **Prisma errors**: Run `npx prisma db push --accept-data-loss` manually via Render Shell
- **Login fails**: Ensure NEXTAUTH_SECRET is set and matches
- **Blank page**: Check browser console for JS errors

## Local Development

```bash
# Install
npm install

# Set up .env
cp .env.example .env
# Edit .env with your local DATABASE_URL

# Database
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# Start
npm run dev
# → http://localhost:3000
```

## Tech Stack
- Next.js 16.2.9 + React 19.2.4
- Tailwind CSS 4 + framer-motion
- Prisma 7 + PostgreSQL (Neon)
- next-auth v5 (credentials)
- recharts, lucide-react, remotion
