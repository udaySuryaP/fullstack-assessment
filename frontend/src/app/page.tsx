"use client";

import { useEffect, useState } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
}

interface TracksResponse {
  tracks: Track[];
  total: number;
}

const limit = 5;
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${apiUrl}/tracks?page=${page}&limit=${limit}`);

        if (!response.ok) {
          throw new Error("The request failed.");
        }

        const data: TracksResponse = await response.json();
        setTracks(data.tracks);
        setTotal(data.total);
      } catch {
        setError("Could not load tracks. Please check that the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [page]);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Audio Track Catalogue</h1>
        <p className="mt-2 text-slate-600">Browse the catalogue five tracks at a time.</p>
      </header>

      <section aria-live="polite">
        {loading ? (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Loading tracks...</p>
        ) : error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-100 text-sm text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Artist</th>
                  <th className="px-4 py-3 font-medium">Genre</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track) => (
                  <tr className="border-t border-slate-200" key={track.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">{track.title}</td>
                    <td className="px-4 py-3 text-slate-700">{track.artist}</td>
                    <td className="px-4 py-3 text-slate-700">{track.genre}</td>
                    <td className="px-4 py-3 text-slate-700">{track.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <nav className="mt-6 flex items-center justify-between" aria-label="Track pages">
        <button
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={loading || page === 1}
          onClick={() => setPage((currentPage) => currentPage - 1)}
        >
          Previous
        </button>
        <p className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </p>
        <button
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={loading || page >= totalPages}
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          Next
        </button>
      </nav>
    </main>
  );
}
