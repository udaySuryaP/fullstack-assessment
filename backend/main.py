from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Audio Track Catalogue API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

tracks = [
    {"id": 1, "title": "City Lights", "artist": "Maya Brooks", "genre": "Pop", "duration": "3:18"},
    {"id": 2, "title": "Quiet Roads", "artist": "Northbound", "genre": "Folk", "duration": "4:02"},
    {"id": 3, "title": "After Midnight", "artist": "Neon Harbor", "genre": "Electronic", "duration": "3:45"},
    {"id": 4, "title": "Paper Planes", "artist": "June Ellis", "genre": "Indie", "duration": "2:58"},
    {"id": 5, "title": "Golden Hour", "artist": "The Sundials", "genre": "Rock", "duration": "4:16"},
    {"id": 6, "title": "Blue Horizon", "artist": "Ari Stone", "genre": "Jazz", "duration": "5:07"},
    {"id": 7, "title": "Open Window", "artist": "Clara Finch", "genre": "Acoustic", "duration": "3:31"},
    {"id": 8, "title": "Static Dreams", "artist": "Signal Coast", "genre": "Electronic", "duration": "3:54"},
    {"id": 9, "title": "Morning Train", "artist": "Eli Parker", "genre": "Folk", "duration": "4:10"},
    {"id": 10, "title": "Borrowed Time", "artist": "The Common Hours", "genre": "Rock", "duration": "3:27"},
    {"id": 11, "title": "Soft Focus", "artist": "Lena Hart", "genre": "Pop", "duration": "3:12"},
    {"id": 12, "title": "Riverstone", "artist": "Cedar Lane", "genre": "Country", "duration": "4:34"},
    {"id": 13, "title": "Night Market", "artist": "Juniper Club", "genre": "Jazz", "duration": "5:22"},
    {"id": 14, "title": "Parallel Lines", "artist": "Echo Avenue", "genre": "Indie", "duration": "3:49"},
    {"id": 15, "title": "Still Water", "artist": "Mara Vale", "genre": "Ambient", "duration": "4:41"},
    {"id": 16, "title": "Weekend Weather", "artist": "Sunday Arcade", "genre": "Pop", "duration": "2:55"},
    {"id": 17, "title": "Last Broadcast", "artist": "Radio Silence", "genre": "Rock", "duration": "4:08"},
    {"id": 18, "title": "Small Hours", "artist": "Nora Reed", "genre": "Acoustic", "duration": "3:37"},
    {"id": 19, "title": "Silver Current", "artist": "Tidal Frame", "genre": "Electronic", "duration": "4:25"},
    {"id": 20, "title": "Old Photographs", "artist": "Sam Rowan", "genre": "Folk", "duration": "3:59"},
    {"id": 21, "title": "Corner Booth", "artist": "Miles Grant", "genre": "Jazz", "duration": "5:14"},
    {"id": 22, "title": "Satellite Heart", "artist": "Nova Street", "genre": "Indie", "duration": "3:33"},
    {"id": 23, "title": "Summer Rain", "artist": "Olive Gray", "genre": "Pop", "duration": "3:21"},
    {"id": 24, "title": "Long Way Home", "artist": "Redwood Miles", "genre": "Country", "duration": "4:47"},
    {"id": 25, "title": "Glass Houses", "artist": "Bright Divide", "genre": "Rock", "duration": "3:42"},
    {"id": 26, "title": "Low Tide", "artist": "Harbor Sleep", "genre": "Ambient", "duration": "4:53"},
    {"id": 27, "title": "First Light", "artist": "Ember Field", "genre": "Acoustic", "duration": "3:06"},
]


@app.get("/tracks")
def get_tracks(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=5, ge=1, le=20),
):
    start = (page - 1) * limit
    end = start + limit

    return {"tracks": tracks[start:end], "total": len(tracks)}
