# Background Music Setup

## To add background music to your videos:

1. Get a copyright-free background track (30-60 seconds, upbeat/motivational)
   - Sources: YouTube Audio Library, Epidemic Sound, Artlist, Pixabay Music
   - Recommended: Upbeat electronic/corporate track, 120-130 BPM

2. Convert to MP3 format if needed:
   ```bash
   ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k background-music.mp3
   ```

3. Place the file here: `public/background-music.mp3`

4. The video composition will automatically include it at 30% volume

## Current status:
- ⚠️ No music file present - videos will render without audio
- 📝 Add `background-music.mp3` to enable audio in videos

## Recommended tracks (royalty-free):
- "Upbeat Corporate" style tracks
- "Tech & Innovation" background music
- "Motivational Inspiring" instrumentals
