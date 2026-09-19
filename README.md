# Audio Track Catalogue

A small full-stack assessment project that displays a responsive, paginated catalogue of music tracks with album artwork and links to the corresponding Apple Music albums.

## Live demo

[Open the deployed frontend](https://fullstack-assessment-sigma.vercel.app)

## Architecture

```text
Browser
  |
  v
Next.js frontend
  |
  | GET /tracks?page={page}&limit={limit}
  v
FastAPI backend
  |
  v
In-memory track catalogue
```

The browser renders five tracks per page. The frontend requests only the active page from the API and uses the returned total count to calculate the available pages.

## Stack

- FastAPI and Uvicorn backend
- Next.js App Router frontend
- React, TypeScript, and Tailwind CSS

## API and pagination

`GET /tracks` accepts two query parameters:

| Parameter | Default | Validation | Purpose |
| --- | --- | --- | --- |
| `page` | `1` | Integer greater than or equal to 1 | Selects the page of results |
| `limit` | `5` | Integer from 1 to 20 | Sets the number of tracks returned |

Example:

```http
GET /tracks?page=2&limit=5
```

The response contains the selected `tracks` and the catalogue `total`:

```json
{
  "tracks": [],
  "total": 23
}
```

## Local setup

### Backend

From the `backend` directory:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API is available at `http://localhost:8000/tracks`.

### Frontend

From the `frontend` directory in a second terminal:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend uses `http://localhost:8000` by default. To use a different backend URL, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`.

The assessment's architecture and security discussion is preserved in [ASSESSMENT_NOTES.md](./ASSESSMENT_NOTES.md).
