import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { IntroSlide } from './components/IntroSlide';
import { JobCard } from './components/JobCard';
import { OutroSlide } from './components/OutroSlide';

export interface JobsReelProps {
  jobs: Array<{ heading: string; description: string }>;
}

const INTRO_FRAMES = 75;   // 2.5s
const JOB_FRAMES = 132;    // 4.4s per job
const OUTRO_FRAMES = 75;   // 2.5s

export const JobsReelComposition: React.FC<JobsReelProps> = ({ jobs }) => {
  useVideoConfig();

  const validJobs = jobs.slice(0, 5);
  let offset = 0;

  return (
    <AbsoluteFill style={{ background: '#0a0a1a' }}>
      {/* Intro */}
      <Sequence from={offset} durationInFrames={INTRO_FRAMES}>
        <IntroSlide totalJobs={validJobs.length} />
      </Sequence>
      {(() => { offset += INTRO_FRAMES; return null; })()}

      {/* Job cards */}
      {validJobs.map((job, i) => {
        const from = offset;
        offset += JOB_FRAMES;
        return (
          <Sequence key={i} from={from} durationInFrames={JOB_FRAMES}>
            <JobCard job={job} index={i} total={validJobs.length} />
          </Sequence>
        );
      })}

      {/* Outro */}
      <Sequence from={offset} durationInFrames={OUTRO_FRAMES}>
        <OutroSlide />
      </Sequence>
    </AbsoluteFill>
  );
};

export { INTRO_FRAMES, JOB_FRAMES, OUTRO_FRAMES };
