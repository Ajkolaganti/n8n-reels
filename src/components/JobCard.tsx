import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

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

const LOCATION_COLORS: Record<string, string> = {
  REMOTE: '#10B981',
  HYBRID: '#F59E0B',
  ONSITE: '#3B82F6',
  'ON-SITE': '#3B82F6',
};

export const JobCard: React.FC<JobCardProps> = ({ job, index, total }) => {
  const frame = useCurrentFrame();
  const easeOut = Easing.out(Easing.cubic);
  const easeBack = Easing.out(Easing.back(1.4));

  const { role, company } = parseHeading(job.heading);
  const { salary, location, type } = parseDescription(job.description);
  const locationKey = location.toUpperCase().replace(/\s+/g, '-');
  const locationColor = LOCATION_COLORS[locationKey] || LOCATION_COLORS['REMOTE'];

  // Background slide in from right
  const bgX = interpolate(frame, [0, 30], [1080, 0], { extrapolateRight: 'clamp', easing: easeOut });
  // Background slide out to left
  const bgExitX = interpolate(frame, [108, 132], [0, -1100], { extrapolateLeft: 'clamp', easing: Easing.in(Easing.cubic) });
  const cardX = frame >= 108 ? bgExitX : bgX;

  // Top badge (work type)
  const badgeOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateRight: 'clamp' });
  const badgeX = interpolate(frame, [8, 28], [-120, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Job number
  const numOpacity = interpolate(frame, [10, 30], [0, 0.12], { extrapolateRight: 'clamp' });

  // Role text — words stagger up
  const roleOpacity = interpolate(frame, [22, 50], [0, 1], { extrapolateRight: 'clamp' });
  const roleY = interpolate(frame, [22, 50], [70, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Company
  const companyOpacity = interpolate(frame, [38, 62], [0, 1], { extrapolateRight: 'clamp' });
  const companyY = interpolate(frame, [38, 62], [45, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Salary chip
  const salaryScale = interpolate(frame, [58, 78], [0, 1], { extrapolateRight: 'clamp', easing: easeBack });
  const salaryOpacity = interpolate(frame, [58, 78], [0, 1], { extrapolateRight: 'clamp' });

  // Location chip
  const locScale = interpolate(frame, [66, 86], [0, 1], { extrapolateRight: 'clamp', easing: easeBack });
  const locOpacity = interpolate(frame, [66, 86], [0, 1], { extrapolateRight: 'clamp' });

  // CTA button
  const ctaOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [80, 100], [30, 0], { extrapolateRight: 'clamp', easing: easeOut });

  // Progress dots
  const dotsOpacity = interpolate(frame, [85, 105], [0, 1], { extrapolateRight: 'clamp' });

  // Animated glow pulse (subtle)
  const glowPulse = Math.sin(frame / 25) * 0.15 + 0.35;

  const jobNum = String(index + 1).padStart(2, '0');

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Main card - slides in/out */}
      <AbsoluteFill style={{ transform: `translateX(${cardX}px)` }}>
        {/* Background gradient */}
        <AbsoluteFill style={{
          background: `linear-gradient(160deg, #0d0d22 0%, #111128 50%, #0a0a1a 100%)`,
        }} />

        {/* Accent glow blob */}
        <div style={{
          position: 'absolute',
          width: 800, height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${locationColor}${Math.round(glowPulse * 255).toString(16).padStart(2,'0')} 0%, transparent 65%)`,
          top: '5%', right: '-20%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4169E115 0%, transparent 70%)',
          bottom: '10%', left: '-10%',
          pointerEvents: 'none',
        }} />

        {/* Large decorative job number */}
        <div style={{
          position: 'absolute',
          top: 60, right: 40,
          opacity: numOpacity,
          fontSize: 320,
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: -10,
          fontFamily: '"Inter", system-ui, sans-serif',
          userSelect: 'none',
        }}>
          {jobNum}
        </div>

        {/* Work type badge — top left */}
        <div style={{
          position: 'absolute',
          top: 80,
          left: 60,
          opacity: badgeOpacity,
          transform: `translateX(${badgeX}px)`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            background: locationColor,
            borderRadius: 8,
            padding: '10px 24px',
          }}>
            <span style={{ color: '#fff', fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>
              {location.toUpperCase()}
            </span>
          </div>
          <div style={{
            background: '#ffffff18',
            border: '1px solid #ffffff20',
            borderRadius: 8,
            padding: '10px 20px',
          }}>
            <span style={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>{type}</span>
          </div>
        </div>

        {/* Main content — centered */}
        <AbsoluteFill style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 60px',
          paddingTop: 180,
          paddingBottom: 220,
          fontFamily: '"Inter", system-ui, sans-serif',
        }}>
          {/* Role title */}
          <div style={{
            opacity: roleOpacity,
            transform: `translateY(${roleY}px)`,
            marginBottom: 20,
          }}>
            <span style={{
              fontSize: role.length > 30 ? 60 : 72,
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: -1.5,
              display: 'block',
            }}>
              {role}
            </span>
          </div>

          {/* Company */}
          {company && (
            <div style={{
              opacity: companyOpacity,
              transform: `translateY(${companyY}px)`,
              marginBottom: 48,
            }}>
              <span style={{
                fontSize: 44,
                fontWeight: 600,
                color: '#718096',
                letterSpacing: -0.5,
              }}>
                @ {company}
              </span>
            </div>
          )}

          {/* Chips row */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 56 }}>
            {/* Salary chip */}
            <div style={{
              opacity: salaryOpacity,
              transform: `scale(${salaryScale})`,
              transformOrigin: 'left center',
              background: 'linear-gradient(135deg, #4169E1, #5580f0)',
              borderRadius: 50,
              padding: '16px 36px',
            }}>
              <span style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>💰 {salary}</span>
            </div>

            {/* Location chip */}
            <div style={{
              opacity: locOpacity,
              transform: `scale(${locScale})`,
              transformOrigin: 'left center',
              background: '#ffffff12',
              border: `2px solid ${locationColor}`,
              borderRadius: 50,
              padding: '16px 36px',
            }}>
              <span style={{ color: locationColor, fontSize: 32, fontWeight: 700 }}>📍 {location}</span>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              background: '#ffffff08',
              border: '1px solid #ffffff20',
              borderRadius: 16,
              padding: '20px 44px',
            }}>
              <span style={{ color: '#A0AEC0', fontSize: 30, fontWeight: 600 }}>
                Link in bio to apply
              </span>
              <span style={{ fontSize: 30 }}>→</span>
            </div>
          </div>
        </AbsoluteFill>

        {/* Progress dots — bottom center */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 16,
          opacity: dotsOpacity,
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === index ? 40 : 12,
              height: 12,
              borderRadius: 6,
              background: i === index ? '#4169E1' : '#ffffff30',
              transition: 'width 0.3s ease',
            }} />
          ))}
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute',
          top: 160,
          left: 60, right: 60,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #4169E140, transparent)',
          opacity: badgeOpacity,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
