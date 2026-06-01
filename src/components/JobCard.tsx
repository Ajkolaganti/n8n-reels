import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, staticFile } from 'remotion';

interface Job {
  heading: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  index: number;
  total: number;
}

function parseDescription(desc: string): { salary: string; location: string; type: string } {
  const parts = desc.split('|').map((p) => p.trim());
  const salary = parts[0] || 'Competitive';
  const location = parts[1] || 'REMOTE';
  const type = parts[2] || 'Full-time';
  return { salary, location, type };
}

function parseHeading(heading: string): { role: string; company: string } {
  const atIdx = heading.lastIndexOf(' @ ');
  if (atIdx !== -1) {
    return { role: heading.slice(0, atIdx).trim(), company: heading.slice(atIdx + 3).trim() };
  }
  return { role: heading, company: '' };
}

// Neon lime green matching ResumePass style
const NEON_GREEN = '#B4FF39';
const DARK_BG = '#0a0a0a';
const CARD_BG = '#111111';

export const JobCard: React.FC<JobCardProps> = ({ job, index, total }) => {
  const frame = useCurrentFrame();
  const easeOut = Easing.out(Easing.cubic);
  const easeBack = Easing.out(Easing.back(1.2));

  const { role, company } = parseHeading(job.heading);
  const { salary, location, type } = parseDescription(job.description);

  // Card slide in from bottom
  const cardY = interpolate(frame, [0, 35], [1920, 0], { extrapolateRight: 'clamp', easing: easeOut });
  // Card slide out to top
  const cardExitY = interpolate(frame, [105, 132], [0, -1920], { extrapolateLeft: 'clamp', easing: Easing.in(Easing.cubic) });
  const finalY = frame >= 105 ? cardExitY : cardY;

  // Label fade in
  const labelOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  
  // Role title - split animation
  const roleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });
  const roleY = interpolate(frame, [25, 45], [50, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Company
  const companyOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' });
  const companyScale = interpolate(frame, [35, 55], [0.9, 1], { extrapolateRight: 'clamp', easing: easeOut });

  // Stats boxes
  const statsOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' });
  const statsScale = interpolate(frame, [50, 70], [0.85, 1], { extrapolateRight: 'clamp', easing: easeBack });

  // Job number indicator
  const numOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateRight: 'clamp' });

  const jobNum = `${index + 1}/${total}`;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Background music - disabled until file is added */}
      {/* Uncomment when you add public/background-music.mp3 */}
      {/*
      {index === 0 && (
        <Audio 
          src={staticFile('background-music.mp3')} 
          volume={0.3}
          startFrom={0}
          onError={() => console.log('Background music not found - rendering without audio')}
        />
      )}
      */}

      {/* Main card container */}
      <AbsoluteFill style={{ transform: `translateY(${finalY}px)` }}>
        {/* Dark gradient background */}
        <AbsoluteFill style={{
          background: `radial-gradient(ellipse at top, ${CARD_BG} 0%, ${DARK_BG} 70%)`,
        }} />

        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${NEON_GREEN}08 1px, transparent 1px),
            linear-gradient(90deg, ${NEON_GREEN}08 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }} />

        {/* Glow accent - top right */}
        <div style={{
          position: 'absolute',
          width: 600, height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${NEON_GREEN}15 0%, transparent 70%)`,
          top: '-15%', right: '-10%',
          filter: 'blur(80px)',
        }} />

        {/* Content container with padding */}
        <AbsoluteFill style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {/* Top label */}
          <div style={{
            opacity: labelOpacity,
            marginBottom: 40,
          }}>
            <span style={{
              color: NEON_GREEN,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}>
              ✦ Hot Job Alert
            </span>
          </div>

          {/* Role title - large serif style */}
          <div style={{
            opacity: roleOpacity,
            transform: `translateY(${roleY}px)`,
            marginBottom: 30,
          }}>
            <h1 style={{
              fontSize: role.length > 25 ? 68 : 82,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: -2,
              margin: 0,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}>
              {role}
              <span style={{ color: NEON_GREEN }}>.</span>
            </h1>
          </div>

          {/* Company name */}
          {company && (
            <div style={{
              opacity: companyOpacity,
              transform: `scale(${companyScale})`,
              transformOrigin: 'left center',
              marginBottom: 60,
            }}>
              <span style={{
                fontSize: 36,
                fontWeight: 400,
                color: '#999999',
                fontStyle: 'italic',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}>
                @ {company}
              </span>
            </div>
          )}

          {/* Stats cards - similar to "75%" and "6 sec" design */}
          <div style={{
            display: 'flex',
            gap: 30,
            flexWrap: 'wrap',
            opacity: statsOpacity,
            transform: `scale(${statsScale})`,
            transformOrigin: 'left center',
          }}>
            {/* Salary box */}
            <div style={{
              border: `2px solid ${NEON_GREEN}`,
              borderRadius: 20,
              padding: '30px 40px',
              background: 'rgba(17, 17, 17, 0.6)',
              backdropFilter: 'blur(10px)',
              minWidth: 280,
            }}>
              <div style={{
                color: '#666666',
                fontSize: 16,
                letterSpacing: 3,
                marginBottom: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Compensation
              </div>
              <div style={{
                color: NEON_GREEN,
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {salary}
              </div>
            </div>

            {/* Location box */}
            <div style={{
              border: `2px solid ${NEON_GREEN}`,
              borderRadius: 20,
              padding: '30px 40px',
              background: 'rgba(17, 17, 17, 0.6)',
              backdropFilter: 'blur(10px)',
              minWidth: 280,
            }}>
              <div style={{
                color: '#666666',
                fontSize: 16,
                letterSpacing: 3,
                marginBottom: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Work Mode
              </div>
              <div style={{
                color: '#ffffff',
                fontSize: 42,
                fontWeight: 600,
                lineHeight: 1,
              }}>
                {location}
              </div>
              <div style={{
                color: '#999999',
                fontSize: 18,
                marginTop: 8,
                fontWeight: 500,
              }}>
                {type}
              </div>
            </div>
          </div>

          {/* Job number indicator - bottom left */}
          <div style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            opacity: numOpacity,
          }}>
            <span style={{
              color: '#333333',
              fontSize: 24,
              fontWeight: 700,
              fontFamily: 'monospace',
            }}>
              {jobNum}
            </span>
          </div>

          {/* Progress bar - bottom */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            right: 80,
            height: 4,
            background: '#222222',
            borderRadius: 2,
            overflow: 'hidden',
            opacity: numOpacity,
          }}>
            <div style={{
              height: '100%',
              width: `${((index + 1) / total) * 100}%`,
              background: NEON_GREEN,
              borderRadius: 2,
            }} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
