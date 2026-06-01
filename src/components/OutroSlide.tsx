import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const easeOut = Easing.out(Easing.cubic);
  const easeBack = Easing.out(Easing.back(1.3));

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const followOpacity = interpolate(frame, [8, 32], [0, 1], { extrapolateRight: 'clamp' });
  const followY = interpolate(frame, [8, 32], [60, 0], { extrapolateRight: 'clamp', easing: easeOut });

  const handleOpacity = interpolate(frame, [22, 46], [0, 1], { extrapolateRight: 'clamp' });
  const handleScale = interpolate(frame, [22, 46], [0.7, 1], { extrapolateRight: 'clamp', easing: easeBack });

  const badgeOpacity = interpolate(frame, [38, 58], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale = interpolate(frame, [38, 58], [0.5, 1], { extrapolateRight: 'clamp', easing: easeBack });

  const tagsOpacity = interpolate(frame, [50, 68], [0, 1], { extrapolateRight: 'clamp' });

  const pulse = Math.sin(frame / 18) * 0.08 + 0.92;

  return (
    <AbsoluteFill style={{
      background: '#0a0a1a',
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden',
      opacity: bgOpacity,
    }}>
      {/* Glow background */}
      <AbsoluteFill>
        <div style={{
          position: 'absolute',
          width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4169E130 0%, transparent 65%)',
          top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          scale: String(pulse),
        }} />
        <div style={{
          position: 'absolute',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00d4ff15 0%, transparent 70%)',
          top: '20%', right: '5%',
        }} />
      </AbsoluteFill>

      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        textAlign: 'center',
      }}>
        {/* "Follow" label */}
        <div style={{
          opacity: followOpacity,
          transform: `translateY(${followY}px)`,
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 52, fontWeight: 500, color: '#718096', letterSpacing: 1 }}>
            Follow for daily
          </span>
        </div>

        {/* "@nextrolenow" */}
        <div style={{
          opacity: handleOpacity,
          transform: `scale(${handleScale})`,
          marginBottom: 20,
        }}>
          <span style={{
            fontSize: 90,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #4169E1, #00d4ff, #4169E1)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -2,
          }}>
            @nextrolenow
          </span>
        </div>

        {/* "NEW JOBS DAILY" badge */}
        <div style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          background: 'linear-gradient(135deg, #4169E1, #5580f0)',
          borderRadius: 50,
          padding: '18px 52px',
          marginBottom: 60,
        }}>
          <span style={{ color: '#fff', fontSize: 34, fontWeight: 800, letterSpacing: 4 }}>
            🔥 NEW JOBS DAILY
          </span>
        </div>

        {/* Hashtags */}
        <div style={{ opacity: tagsOpacity }}>
          <span style={{
            fontSize: 26,
            fontWeight: 400,
            color: '#4169E180',
            lineHeight: 1.9,
          }}>
            #techjobs #hiring #remotejobs #jobsearch #nextrolenow
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
