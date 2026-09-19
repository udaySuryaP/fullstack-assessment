# Audio Track Catalogue

A compact full-stack assessment project for browsing a paginated catalogue of music tracks. It pairs a FastAPI JSON API with a responsive Next.js interface and keeps the frontend and backend deployable as separate services.

## Live demo

[Open the deployed catalogue](https://fullstack-assessment-sigma.vercel.app)

The hosted frontend depends on its deployed API. If that service is unavailable, the interface shows a clear recovery message instead of failing silently.

## Architecture

```text
Browser
  |
  | GET /tracks?page=<number>&limit=<number>
  v
Next.js frontend  --->  FastAPI backend  --->  in-memory track catalogue
```

- The Next.js App Router client owns loading, error, pagination, and table presentation states.
- FastAPI validates query parameters, selects the requested slice, and returns the total record count.
- CORS is configured at the API boundary for the local and deployed frontend origins.
- The dataset is intentionally in memory to keep the assessment focused on the API and client integration.

## API and pagination

### `GET /tracks`

| Parameter | Default | Validation | Purpose |
| --- | ---: | --- | --- |
| `page` | `1` | integer, minimum `1` | Page to return |
| `limit` | `5` | integer, `1` to `20` | Tracks per page |

Example response:

```json
{
  "tracks": [
    {
      "id": 1,
      "title": "Starboy",
      "artist": "The Weeknd",
      "genre": "R&B/Soul",
      "duration": "3:50",
      "artwork": "https://...",
      "album_url": "https://music.apple.com/..."
    }
  ],
  "total": 23
}
```

The frontend requests five records at a time and derives the page count from `total`. Previous and next controls are disabled while loading and at the respective boundaries.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| Deployment | Vercel frontend with a separately hosted API |

## Local setup

### 1. Start the backend

```sh
cd backend
python -m venv .venv
```

Activate the environment:

```powershell
.venv\Scripts\Activate.ps1
```

On macOS or Linux, use `source .venv/bin/activate` instead. Then install and run the API:

```sh
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

The API is available at `http://localhost:8000/tracks`. Interactive API documentation is available at `http://localhost:8000/docs`.

### 2. Start the frontend

In a second terminal:

```sh
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

The frontend uses `http://localhost:8000` by default. To target another API, copy `frontend/.env.example` to `frontend/.env.local` and set `NEXT_PUBLIC_API_URL`.

## Assessment context

The original architecture questions and answers are preserved in [ASSESSMENT_NOTES.md](./ASSESSMENT_NOTES.md) so the project README can stay focused on the application itself.
