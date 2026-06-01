import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

interface IntroSlideProps {
  totalJobs: number;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ totalJobs }) => {
  const frame = useCurrentFrame();

  const easeOut = Easing.out(Easing.cubic);

  // Background glow pulse
  const glowOpacity = interpolate(frame, [0, 45, 75], [0, 0.6, 0.4], { extrapolateRight: 'clamp' });

  // Logo / handle
  const handleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const handleY = interpolate(frame, [0, 20], [-30, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // "TOP 5" big text
  const topOpacity = interpolate(frame, [12, 35], [0, 1], { extrapolateRight: 'clamp' });
  const topY = interpolate(frame, [12, 35], [80, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // "TECH JOBS" text
  const techOpacity = interpolate(frame, [25, 48], [0, 1], { extrapolateRight: 'clamp' });
  const techY = interpolate(frame, [25, 48], [60, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // "TODAY" accent line
  const todayOpacity = interpolate(frame, [38, 58], [0, 1], { extrapolateRight: 'clamp' });
  const todayScale = interpolate(frame, [38, 58], [0.7, 1], { extrapolateRight: 'clamp', easing: easeOut });

  // Tagline
  const tagOpacity = interpolate(frame, [52, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Animated grid lines
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.07], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#0a0a1a', fontFamily: '"Inter", system-ui, sans-serif', overflow: 'hidden' }}>
      {/* Animated grid background */}
      <AbsoluteFill style={{ opacity: gridOpacity }}>
        <svg width="1080" height="1920" style={{ position: 'absolute' }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="1920" stroke="#4169E1" strokeWidth="1" />
          ))}
          {Array.from({ length: 39 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1080" y2={i * 50} stroke="#4169E1" strokeWidth="1" />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Glow orbs */}
      <AbsoluteFill style={{ opacity: glowOpacity }}>
        <div style={{
          position: 'absolute',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4169E130 0%, transparent 70%)',
          top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        }} />
        <div style={{
          position: 'absolute',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00d4ff20 0%, transparent 70%)',
          top: '65%', left: '30%', transform: 'translate(-50%, -50%)',
        }} />
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>

        {/* Handle badge */}
        <div style={{
          opacity: handleOpacity,
          transform: `translateY(${handleY}px)`,
          background: 'linear-gradient(135deg, #4169E1, #00d4ff)',
          borderRadius: 50,
          padding: '14px 36px',
          marginBottom: 60,
        }}>
          <span style={{ color: '#fff', fontSize: 32, fontWeight: 800, letterSpacing: 2 }}>@nextrolenow</span>
        </div>

        {/* "TOP 5" */}
        <div style={{
          opacity: topOpacity,
          transform: `translateY(${topY}px)`,
          textAlign: 'center',
          marginBottom: 4,
        }}>
          <span style={{
            fontSize: 130,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: -4,
          }}>TOP 5</span>
        </div>

        {/* "TECH JOBS" */}
        <div style={{
          opacity: techOpacity,
          transform: `translateY(${techY}px)`,
          textAlign: 'center',
          marginBottom: 32,
        }}>
          <span style={{
            fontSize: 80,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #4169E1, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -2,
          }}>TECH JOBS</span>
        </div>

        {/* "TODAY" pill */}
        <div style={{
          opacity: todayOpacity,
          transform: `scale(${todayScale})`,
          border: '2px solid #4169E1',
          borderRadius: 50,
          padding: '12px 48px',
          marginBottom: 64,
        }}>
          <span style={{ color: '#4169E1', fontSize: 38, fontWeight: 700, letterSpacing: 8 }}>TODAY</span>
        </div>

        {/* Tagline */}
        <div style={{ opacity: tagOpacity }}>
          <span style={{ color: '#718096', fontSize: 28, fontWeight: 400, letterSpacing: 1 }}>
            Swipe for top picks →
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
