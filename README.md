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
