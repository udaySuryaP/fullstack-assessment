# Audio Track Catalogue

A small full-stack assessment project that displays a paginated catalogue of real music tracks with album artwork.

## Stack

- FastAPI backend with an in-memory Python dataset
- Next.js App Router frontend with TypeScript and Tailwind CSS

## Run the backend

From the `backend` directory:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API is available at `http://localhost:8000/tracks`.

## Run the frontend

From the `frontend` directory in a second terminal:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend uses `http://localhost:8000` by default. To use a different backend URL, copy `.env.example` to `.env.local` and change `NEXT_PUBLIC_API_URL`.

## Architecture scenario responses

`Q1.` A teammate suggests putting the third-party service's API key directly in the frontend code, so the browser can call it directly. What's the problem with that, and where should the key actually live instead?

`Answer:` Putting the key in frontend code exposes it to anyone using the application. They could call the provider directly, consume the quota, and increase costs. The key should live on the backend as a secret environment variable. During local development, it should be stored in an ignored environment file and never committed.

`Q2.` Once the key is moved off the frontend, anyone who can reach your backend can still trigger those paid calls. What would you add so only your own app's users can trigger them? 

`Answer:` If the endpoint is publicly reachable, moving the key to the backend is not enough. I would add authentication, enforce authorization for each user, and apply rate limiting where appropriate.

`Q3.` Say your frontend (on Vercel) calls your backend (on Render), and the browser blocks the request with a cross-origin error, even though the code looks correct. What's most likely misconfigured, and where would you go fix it? 

`Answer:` Because the frontend and backend use different origins, the browser enforces CORS. If the backend has not explicitly allowed the deployed frontend origin, the browser can block an otherwise valid request. I would first correct the backend CORS middleware rather than the Vercel configuration.
