import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

const NEON_GREEN = '#B4FF39';
const DARK_BG = '#0a0a0a';

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const easeOut = Easing.out(Easing.cubic);
  const easeBack = Easing.out(Easing.back(1.2));

  // CTA button animation
  const ctaOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = interpolate(frame, [0, 25], [0.8, 1], { extrapolateRight: 'clamp', easing: easeBack });

  // Main text
  const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [15, 35], [50, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });

  // Pulsing glow effect
  const glowPulse = Math.sin(frame / 15) * 0.1 + 0.9;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Dark background */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, #111111 0%, ${DARK_BG} 70%)`,
      }} />

      {/* Grid pattern */}
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

      {/* Animated glow */}
      <div style={{
        position: 'absolute',
        width: 900, height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${NEON_GREEN}${Math.round(glowPulse * 20).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%) scale(${glowPulse})`,
        filter: 'blur(120px)',
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
        {/* Main CTA message */}
        <div style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          marginBottom: 50,
        }}>
          <h1 style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            marginBottom: 20,
            lineHeight: 1.1,
            letterSpacing: -2,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}>
            Ready to
          </h1>
          <h1 style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            marginBottom: 20,
            lineHeight: 1.1,
            letterSpacing: -2,
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
          }}>
            make your move
          </h1>
          <h1 style={{
            fontSize: 82,
            fontWeight: 700,
            color: NEON_GREEN,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -2,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}>
            ?
          </h1>
        </div>

        {/* CTA Button */}
        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}>
          <div style={{
            background: NEON_GREEN,
            borderRadius: 50,
            padding: '24px 60px',
            cursor: 'pointer',
            boxShadow: `0 8px 32px ${NEON_GREEN}40`,
          }}>
            <span style={{
              color: DARK_BG,
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}>
              LINK IN BIO →
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: subtitleOpacity,
          marginTop: 40,
        }}>
          <p style={{
            fontSize: 22,
            color: '#666666',
            margin: 0,
            letterSpacing: 1,
            fontWeight: 500,
          }}>
            Tap the link to apply • New jobs daily
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
