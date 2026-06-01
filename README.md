# N8N Reels

Remotion-based video render server for creating Instagram job reels with motion graphics.

## Features

- 🎬 Automated video generation from job data
- 🎨 Professional motion graphics using Remotion
- 📊 Progress tracking for render jobs
- 🚀 REST API for easy integration with n8n workflows
- 📦 Serves rendered MP4 videos

## Tech Stack

- **Framework**: Express.js + Remotion
- **Renderer**: @remotion/renderer + @remotion/bundler
- **Video Format**: H.264 MP4
- **Node Version**: >=20.0.0

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
PORT=4001
BASE_URL=https://your-domain.com
```

## Usage

Start the server:

```bash
npm start
```

## API Endpoints

### POST /render-jobs-reel

Submit jobs for rendering (max 5 jobs per reel):

```json
{
  "jobs": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "Remote",
      "salary": "$120k - $180k"
    }
  ]
}
```

**Response:**
```json
{
  "jobId": "uuid-here",
  "status": "queued",
  "message": "Render started"
}
```

### GET /status/:jobId

Check render progress:

**Response:**
```json
{
  "status": "rendering",
  "progress": 45,
  "startedAt": "2026-06-01T16:03:00.000Z"
}
```

Status values: `queued`, `rendering`, `done`, `failed`

### GET /videos/:jobId.mp4

Download the rendered video (available when status is `done`).

### GET /health

Health check endpoint.

## Output

Rendered videos are saved to `public/videos/` and accessible via the `/videos/:jobId.mp4` endpoint.

## Integration with n8n

This server is designed to work with n8n workflows:

1. n8n workflow posts job data to `/render-jobs-reel`
2. Workflow polls `/status/:jobId` until done
3. Video URL is retrieved and posted to Instagram/social media

## Project Structure

```
jobs-reel/
├── server.js           # Express server & render orchestration
├── src/
│   └── JobsReelEntry.tsx   # Remotion composition entry point
├── public/
│   └── videos/         # Rendered MP4 outputs
└── package.json
```

## Performance

- First render includes bundling (~30s)
- Subsequent renders use cached bundle (faster)
- In-memory job tracking (resets on server restart)

## License

MIT
