require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const VIDEOS_DIR = path.join(__dirname, 'public', 'videos');
const BASE_URL = process.env.BASE_URL || 'https://n8n.sidhiratech.com';
const PORT = parseInt(process.env.PORT || '4001', 10);
const ENTRY_POINT = path.join(__dirname, 'src', 'JobsReelEntry.tsx');

// In-memory job store
const jobs = new Map();

// Lazy-loaded bundle cache
let cachedBundle = null;

async function getBundle() {
  if (cachedBundle) return cachedBundle;
  console.log('[render] Bundling JobsReelEntry (first run — may take ~30s)...');
  const { bundle } = await import('@remotion/bundler');
  cachedBundle = await bundle({
    entryPoint: ENTRY_POINT,
    webpackOverride: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        modules: [
          path.join(__dirname, 'node_modules'),
          'node_modules',
          ...(config.resolve?.modules ?? []),
        ],
      },
    }),
  });
  console.log('[render] Bundle ready — cached for reuse');
  return cachedBundle;
}

async function renderReel(jobId, reelJobs) {
  const { renderMedia, selectComposition } = await import('@remotion/renderer');

  await fs.mkdir(VIDEOS_DIR, { recursive: true });
  const outputPath = path.join(VIDEOS_DIR, `${jobId}.mp4`);

  const bundleLocation = await getBundle();

  const inputProps = { jobs: reelJobs };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'JobsReel',
    inputProps,
  });

  console.log(`[render] ${jobId} — ${composition.durationInFrames} frames @ ${composition.fps}fps`);

  jobs.set(jobId, { status: 'rendering', progress: 0, startedAt: new Date().toISOString() });

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps,
    onProgress: ({ progress }) => {
      jobs.set(jobId, { ...jobs.get(jobId), progress: Math.round(progress * 100) });
    },
    logLevel: 'error',
  });

  const videoUrl = `${BASE_URL}/videos/${jobId}.mp4`;
  jobs.set(jobId, {
    status: 'done',
    progress: 100,
    videoUrl,
    completedAt: new Date().toISOString(),
  });
  console.log(`[render] ${jobId} — done → ${videoUrl}`);
}

// ── POST /render-jobs-reel ────────────────────────────────────────────────────
app.post('/render-jobs-reel', async (req, res) => {
  const { jobs: reelJobs } = req.body;

  if (!Array.isArray(reelJobs) || reelJobs.length === 0) {
    return res.status(400).json({ error: 'jobs[] array is required' });
  }

  const jobId = uuidv4();
  jobs.set(jobId, { status: 'queued', progress: 0, queuedAt: new Date().toISOString() });

  // Start render asynchronously
  renderReel(jobId, reelJobs.slice(0, 5)).catch((err) => {
    console.error(`[render] ${jobId} failed:`, err.message);
    jobs.set(jobId, { status: 'failed', error: err.message });
  });

  res.json({ jobId, status: 'queued', message: 'Render started' });
});

// ── GET /status/:jobId ────────────────────────────────────────────────────────
app.get('/status/:jobId', (req, res) => {
  const state = jobs.get(req.params.jobId);
  if (!state) return res.status(404).json({ error: 'Job not found' });
  res.json(state);
});

// ── GET /health ───────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'jobs-reel-render' }));

// ── Static video files ────────────────────────────────────────────────────────
app.use('/videos', express.static(VIDEOS_DIR));

app.listen(PORT, () => {
  console.log(`[render] Jobs reel render server running on port ${PORT}`);
  console.log(`[render] Videos: ${VIDEOS_DIR}`);
  console.log(`[render] Base URL: ${BASE_URL}`);
  // Warm up the bundle in the background
  getBundle().catch((err) => console.error('[render] Bundle warm-up failed:', err.message));
});
