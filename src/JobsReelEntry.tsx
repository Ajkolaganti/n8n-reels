import { registerRoot, Composition } from 'remotion';
import React from 'react';
import { JobsReelComposition, JobsReelProps, INTRO_FRAMES, JOB_FRAMES, OUTRO_FRAMES } from './JobsReelComposition';

// Load Google Fonts
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/700-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const defaultJobs: JobsReelProps['jobs'] = [
  { heading: 'Senior Engineer @ Google', description: '$180K–$240K | REMOTE | Full-time' },
  { heading: 'Backend Developer @ Stripe', description: '$160K–$210K | HYBRID | Full-time' },
  { heading: 'Frontend Engineer @ Airbnb', description: '$140K–$190K | REMOTE | Full-time' },
  { heading: 'Software Engineer @ Netflix', description: '$170K–$230K | ONSITE | Full-time' },
  { heading: 'Full Stack Engineer @ Shopify', description: '$130K–$175K | REMOTE | Full-time' },
];

const RemotionRoot: React.FC = () => (
  <Composition
    id="JobsReel"
    component={JobsReelComposition}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{ jobs: defaultJobs }}
    calculateMetadata={({ props }) => {
      const n = Math.min(props.jobs?.length ?? 5, 5);
      const total = INTRO_FRAMES + n * JOB_FRAMES + OUTRO_FRAMES;
      return { durationInFrames: total };
    }}
  />
);

registerRoot(RemotionRoot);
