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



## Question 2 — Architecture scenario

1. A teammate suggests putting the third-party service's API key directly in the frontend code, so the browser can call it directly. What's the problem with that, and where should the key actually live instead?

`Answer:` It will allow everyone to see the API Key and they can use the key to call the AI provider directly, which leads to increase in cost.
If i were to integrate something like that I would have kept API key in the backend as secret env variables, and during development I'll be keeping those keys in a env file and add that file to the gitignore.

2. Once the key is moved off the frontend, anyone who can reach your backend can still trigger those paid calls. What would you add so only your own app's users can trigger them? 

`Answer:` Yes, that can happen if the endpoint can be called without authentication. In-order to control this I'll add an authentication layer and also an authorization too for individual users, and if required I'll add a rate-limiting too.

3. Say your frontend (on Vercel) calls your backend (on Render), and the browser blocks the request with a cross-origin error, even though the code looks correct. What's most likely misconfigured, and where would you go fix it? 

`Answer:` As both the frontend and backend are on different origins, the browser will enforce CORS, and even if the code is correct, if the backend hasn't explicitly allowed the frontend origin the browser can block the request. I would fix the CORS middleware backend part and not the vercel configuration in the first place.
