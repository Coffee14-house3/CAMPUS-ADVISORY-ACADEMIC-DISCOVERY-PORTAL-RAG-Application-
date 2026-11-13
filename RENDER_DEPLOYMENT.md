# Split Deployment Guide: GitHub Pages (Frontend) + Render Free Tier (Backend & API Keys)

This project is configured so you can host:
- **Frontend (React + Vite)** for free on **GitHub Pages** (`https://<your-username>.github.io/<repo-name>/`)
- **Backend API & Secrets (Express + Gemini + ChromaDB)** on **Render Free Tier** (`https://<your-service>.onrender.com`)

Your `GEMINI_API_KEY` and `CHROMA_API_KEY` stay strictly on Render's backend server and are never exposed in the GitHub Pages frontend bundle.

---

## Step 1: Deploy the Backend + API Keys on Render (Free Tier)

1. Push this repository to GitHub (make sure `.env` is **not** committed — it is already ignored by `.gitignore`).
2. Open [Render Dashboard](https://dashboard.render.com/) and click **New + → Web Service** (or **Blueprint** to auto-import `render.yaml`).
3. Connect your GitHub repository and configure:
   - **Runtime**: `Node`
   - **Instance Type**: `Free` ($0/month, 512 MB RAM)
   - **Build Command**: `npm install --include=dev --legacy-peer-deps && npm run build:server`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
4. Under **Environment → Environment Variables**, add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `NODE_OPTIONS` | `--max-old-space-size=384` |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `CHROMA_API_KEY` | Your ChromaDB Cloud API key |
| `CHROMA_TENANT` | Your ChromaDB Tenant ID |
| `CHROMA_DATABASE` | `internship` |
| `ALLOWED_ORIGINS` | `https://<your-github-username>.github.io` |
| `QUERY_NOTIFICATION_EMAIL` | `25sp2180007@student.hindustanuniv.ac.in` |
| `SMTP_USER` | Gmail address used to send notification emails |
| `SMTP_PASS` | 16-character Google App Password for `SMTP_USER` |

5. Click **Create Web Service** and copy your live Render URL once deployed, e.g. `https://hindustan-univ-rag-api.onrender.com`.
6. Verify `https://<your-service>.onrender.com/api/health` returns `{"status":"ok", ...}`.

> **Free Tier Note:** Render Free Tier services sleep after 15 minutes of inactivity and take ~30–50 seconds to wake up on the first request. The frontend automatically pings `/api/health` in the background when opened so the backend starts waking immediately.

---

## Step 2: Deploy the Frontend on GitHub Pages

1. On GitHub, open your repository **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open **Settings → Secrets and variables → Actions → Variables** tab and click **New repository variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://<your-service>.onrender.com` *(no trailing slash)*
4. Push to `main` (or open the **Actions** tab → **Deploy Frontend to GitHub Pages** → **Run workflow**).
5. Once the workflow finishes, your frontend is live at:
   `https://<your-github-username>.github.io/<your-repo-name>/`

---

## Troubleshooting

- **CORS errors in browser console:** Make sure `ALLOWED_ORIGINS` on Render matches your GitHub Pages origin (`https://<your-github-username>.github.io`, without a path or trailing slash).
- **404 on `/api/rag/chat`:** Confirm `VITE_API_URL` was set in GitHub Actions **Variables** before running the GitHub Pages workflow, then re-run the workflow so `VITE_API_URL` is baked into the static build.
- **First chat takes ~30–45s:** Normal Render Free Tier cold start while the backend wakes from sleep.
