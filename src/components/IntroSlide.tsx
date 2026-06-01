import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

const NEON_GREEN = '#B4FF39';
const DARK_BG = '#0a0a0a';

export const IntroSlide: React.FC<{ totalJobs: number }> = ({ totalJobs }) => {
  const frame = useCurrentFrame();
  const easeOut = Easing.out(Easing.cubic);

  // Logo/brand fade in
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp', easing: easeOut });

  // Main title animation - words appear sequentially
  const line1Opacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y = interpolate(frame, [15, 35], [60, 0], { extrapolateRight: 'clamp', easing: easeOut });
  
  const line2Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y = interpolate(frame, [25, 45], [60, 0], { extrapolateRight: 'clamp', easing: easeOut });
  
  const line3Opacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' });
  const line3Y = interpolate(frame, [35, 55], [60, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Dark background */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, #111111 0%, ${DARK_BG} 70%)`,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${NEON_GREEN}06 1px, transparent 1px),
          linear-gradient(90deg, ${NEON_GREEN}06 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.4,
      }} />

      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        width: 800, height: 800,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${NEON_GREEN}12 0%, transparent 70%)`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(100px)',
      }} />

      {/* Content */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        {/* Logo/Brand mark */}
        <div style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 60,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: NEON_GREEN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 56,
              fontWeight: 900,
              color: DARK_BG,
            }}>
              🎯
            </span>
          </div>
        </div>

        {/* Main title - staggered reveal */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}>
            <h1 style={{
              fontSize: 90,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -3,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}>
              Your Next
            </h1>
          </div>

          <div style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}>
            <h1 style={{
              fontSize: 90,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -3,
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
            }}>
              Opportunity
            </h1>
          </div>

          <div style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
          }}>
            <h1 style={{
              fontSize: 90,
              fontWeight: 700,
              color: NEON_GREEN,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -3,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}>
              Starts Here.
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: subtitleOpacity,
          marginTop: 50,
        }}>
          <p style={{
            fontSize: 28,
            color: '#999999',
            margin: 0,
            letterSpacing: 1,
            fontWeight: 400,
          }}>
            {totalJobs} hand-picked opportunities • Fresh today
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
