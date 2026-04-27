import type { JSX } from 'react';

export type Bot = {
  id:          string;
  name:        string;
  color:       string;
  bg:          string;
  tagline:     string;
  personality: string;
  Avatar:      (props: { size?: number }) => JSX.Element;
};

// ── Avatars ───────────────────────────────────────────────────────────────────

function SofiaAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#FFF0E0" />
      <ellipse cx="24" cy="19" rx="13" ry="11" fill="#7B3F00" />
      <ellipse cx="13" cy="27" rx="4"  ry="8"  fill="#7B3F00" />
      <ellipse cx="35" cy="27" rx="4"  ry="8"  fill="#7B3F00" />
      <ellipse cx="24" cy="27" rx="10" ry="11" fill="#F9C59B" />
      <circle cx="20" cy="26" r="1.6" fill="#4A2C0A" />
      <circle cx="28" cy="26" r="1.6" fill="#4A2C0A" />
      <circle cx="20.6" cy="25.4" r="0.55" fill="white" />
      <circle cx="28.6" cy="25.4" r="0.55" fill="white" />
      <path d="M 20 30.5 Q 24 34.5 28 30.5" stroke="#4A2C0A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MarcoAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#E3F2FD" />
      <circle cx="16" cy="20" r="6"  fill="#1A0A00" />
      <circle cx="24" cy="15" r="7"  fill="#1A0A00" />
      <circle cx="32" cy="20" r="6"  fill="#1A0A00" />
      <ellipse cx="24" cy="27" rx="10" ry="11" fill="#C68642" />
      <rect x="15" y="23.5" width="7.5" height="4.5" rx="2.2" fill="#111" />
      <rect x="25.5" y="23.5" width="7.5" height="4.5" rx="2.2" fill="#111" />
      <line x1="22.5" y1="25.8" x2="25.5" y2="25.8" stroke="#111" strokeWidth="1.5" />
      <path d="M 20 32 Q 26 35.5 29 31.5" stroke="#5C3317" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Elena redesign: chestnut bun, round glasses, pearl earrings ───────────────
function ElenaAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#F0EBF8" />
      {/* side hair strands */}
      <ellipse cx="14" cy="25" rx="3.5" ry="6.5" fill="#5C3317" />
      <ellipse cx="34" cy="25" rx="3.5" ry="6.5" fill="#5C3317" />
      {/* face */}
      <ellipse cx="24" cy="27" rx="10" ry="11" fill="#F5DEB3" />
      {/* bun */}
      <circle cx="24" cy="11" r="7.5" fill="#5C3317" />
      {/* hair tie */}
      <circle cx="24" cy="17.5" r="2.8" fill="#3A1F0A" />
      {/* round glasses */}
      <circle cx="19.5" cy="26.5" r="4.3" fill="none" stroke="#7B68A0" strokeWidth="1.6" />
      <circle cx="28.5" cy="26.5" r="4.3" fill="none" stroke="#7B68A0" strokeWidth="1.6" />
      <line x1="23.8" y1="26.5" x2="24.2" y2="26.5" stroke="#7B68A0" strokeWidth="1.6" />
      <line x1="13.5" y1="26.5" x2="15.2" y2="26.5" stroke="#7B68A0" strokeWidth="1.4" />
      <line x1="32.8" y1="26.5" x2="34.5" y2="26.5" stroke="#7B68A0" strokeWidth="1.4" />
      {/* eyes */}
      <circle cx="19.5" cy="26.5" r="1.4" fill="#2C1A0E" />
      <circle cx="28.5" cy="26.5" r="1.4" fill="#2C1A0E" />
      <circle cx="20.1" cy="25.9" r="0.5" fill="white" />
      <circle cx="29.1" cy="25.9" r="0.5" fill="white" />
      {/* pearl earrings */}
      <circle cx="13.8" cy="28.5" r="1.8" fill="#EAD8F5" stroke="#9C7BB8" strokeWidth="0.8" />
      <circle cx="34.2" cy="28.5" r="1.8" fill="#EAD8F5" stroke="#9C7BB8" strokeWidth="0.8" />
      {/* smile */}
      <path d="M 21 31.5 Q 24 33.5 27 31.5" stroke="#5C3317" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Carlos redesign: slicked hair, goatee, mustache, raised brow ──────────────
function CarlosAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#E8F5EC" />
      {/* slicked-back hair */}
      <ellipse cx="24" cy="14" rx="13" ry="9" fill="#0D0600" />
      <path d="M 11 17 Q 20 11 37 15" stroke="#0D0600" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* face */}
      <ellipse cx="24" cy="27" rx="11" ry="12" fill="#A0714F" />
      {/* mustache */}
      <path d="M 19 31.5 Q 21.5 29.5 24 30.5 Q 26.5 29.5 29 31.5 Q 26.5 33 24 32 Q 21.5 33 19 31.5 Z" fill="#0D0600" />
      {/* goatee */}
      <path d="M 21.5 34 Q 24 39 26.5 34 Q 25.5 37.5 24 38 Q 22.5 37.5 21.5 34 Z" fill="#0D0600" />
      {/* eyes */}
      <circle cx="20" cy="25" r="1.8" fill="#0D0600" />
      <circle cx="28" cy="25" r="1.8" fill="#0D0600" />
      <circle cx="20.6" cy="24.3" r="0.6" fill="white" />
      <circle cx="28.6" cy="24.3" r="0.6" fill="white" />
      {/* raised left brow (expressive) */}
      <path d="M 17 21 Q 20 19.5 22.5 21" stroke="#0D0600" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 25.5 21.5 Q 28 20.5 31 21.5" stroke="#0D0600" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* big white smile */}
      <path d="M 19 32.5 Q 24 37.5 29 32.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Luna redesign: dark navy hair, golden crescent, silver sparkles ───────────
function LunaAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#F0F2FF" />
      {/* dark hair behind */}
      <ellipse cx="24" cy="31" rx="15" ry="17" fill="#0A1540" />
      {/* hair top */}
      <ellipse cx="24" cy="12"  rx="11" ry="7"  fill="#0A1540" />
      {/* face */}
      <ellipse cx="24" cy="25" rx="9" ry="11" fill="#EDE6F5" />
      {/* crescent moon in hair */}
      <circle cx="13.5" cy="10" r="5"   fill="#FFD700" />
      <circle cx="16"   cy="8.5" r="4.2" fill="#0A1540" />
      {/* almond eyes with lashes */}
      <ellipse cx="20" cy="24" rx="2.4" ry="2" fill="#1A0A3A" />
      <ellipse cx="28" cy="24" rx="2.4" ry="2" fill="#1A0A3A" />
      <circle cx="20.8" cy="23.3" r="0.7" fill="white" />
      <circle cx="28.8" cy="23.3" r="0.7" fill="white" />
      <path d="M 17.6 22.3 Q 20 20.8 22.4 22.3" stroke="#1A0A3A" strokeWidth="0.9" fill="none" />
      <path d="M 25.6 22.3 Q 28 20.8 30.4 22.3" stroke="#1A0A3A" strokeWidth="0.9" fill="none" />
      {/* soft smile */}
      <path d="M 21.5 29 Q 24 31 26.5 29" stroke="#8B6BA0" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* silver sparkles */}
      <circle cx="37" cy="12" r="1.4" fill="#B0C0FF" />
      <circle cx="40" cy="17" r="0.9" fill="#B0C0FF" />
      <circle cx="36" cy="18" r="0.7" fill="#B0C0FF" />
    </svg>
  );
}

// ── Aria: tech-savvy creator, hot-pink streak, earbuds ───────────────────────
function AriaAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#FFE4F0" />
      {/* short dark hair */}
      <ellipse cx="22" cy="17" rx="12" ry="9"  fill="#1A0A00" />
      <ellipse cx="23" cy="11" rx="10" ry="5.5" fill="#1A0A00" />
      {/* hot-pink streak on right side */}
      <ellipse cx="34" cy="18" rx="4.5" ry="8" fill="#E91E8C" />
      {/* face */}
      <ellipse cx="24" cy="27" rx="10" ry="11" fill="#E8B89A" />
      {/* earbuds */}
      <circle cx="13.5" cy="27.5" r="2.8" fill="#E91E8C" />
      <circle cx="34.5" cy="27.5" r="2.8" fill="#E91E8C" />
      {/* eyes */}
      <circle cx="20" cy="26" r="1.7" fill="#1A0A00" />
      <circle cx="28" cy="26" r="1.7" fill="#1A0A00" />
      <circle cx="20.6" cy="25.3" r="0.6" fill="white" />
      <circle cx="28.6" cy="25.3" r="0.6" fill="white" />
      {/* playful smile */}
      <path d="M 19.5 30.5 Q 24 34.5 28.5 30.5" stroke="#1A0A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Bruno: silver-haired intellectual, bow-tie, reading glasses ───────────────
function BrunoAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#E0F5F0" />
      {/* silver hair */}
      <ellipse cx="24" cy="18" rx="13" ry="10" fill="#A8B0BC" />
      {/* slightly receded top */}
      <ellipse cx="24" cy="13" rx="9"  ry="4.5" fill="#BCC4CC" />
      {/* face */}
      <ellipse cx="24" cy="27" rx="10" ry="11" fill="#FFECD2" />
      {/* rectangular reading glasses (lower) */}
      <rect x="14.5" y="24" width="7"   height="4.5" rx="1" fill="none" stroke="#1A4A3A" strokeWidth="1.5" />
      <rect x="26.5" y="24" width="7"   height="4.5" rx="1" fill="none" stroke="#1A4A3A" strokeWidth="1.5" />
      <line x1="21.5" y1="26.25" x2="26.5" y2="26.25" stroke="#1A4A3A" strokeWidth="1.5" />
      <line x1="11"   y1="26.25" x2="14.5" y2="26.25" stroke="#1A4A3A" strokeWidth="1.2" />
      <line x1="33.5" y1="26.25" x2="37"   y2="26.25" stroke="#1A4A3A" strokeWidth="1.2" />
      {/* eyes */}
      <circle cx="18"   cy="26.25" r="1.3" fill="#2C1A0E" />
      <circle cx="29.7" cy="26.25" r="1.3" fill="#2C1A0E" />
      {/* distinguished brows */}
      <path d="M 15 22 Q 18.5 20.5 21.5 22" stroke="#888" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 26.5 22 Q 29.5 20.5 33" stroke="#888" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* bow tie */}
      <path d="M 19.5 38.5 L 24 36 L 28.5 38.5 L 24 41 Z" fill="#1A4A3A" />
      {/* warm smile */}
      <path d="M 20 32 Q 24 35 28 32" stroke="#5C3317" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Zara: sporty ponytail, headband, rosy cheeks ─────────────────────────────
function ZaraAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#FFF3E0" />
      {/* hair base */}
      <ellipse cx="22" cy="17" rx="12" ry="9" fill="#8B4513" />
      {/* ponytail shooting up-right */}
      <ellipse cx="35" cy="13" rx="5" ry="10" fill="#8B4513" transform="rotate(-20 35 13)" />
      {/* hair band at ponytail base */}
      <circle cx="32" cy="17" r="3" fill="#F57C00" />
      {/* headband across forehead */}
      <path d="M 11 20 Q 24 15 37 20" stroke="#F57C00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* face */}
      <ellipse cx="23" cy="28" rx="10" ry="11" fill="#E8A87C" />
      {/* energetic eyes */}
      <circle cx="19" cy="26.5" r="2"   fill="#1A0A00" />
      <circle cx="28" cy="26.5" r="2"   fill="#1A0A00" />
      <circle cx="19.7" cy="25.7" r="0.7" fill="white" />
      <circle cx="28.7" cy="25.7" r="0.7" fill="white" />
      {/* rosy cheeks */}
      <ellipse cx="15.5" cy="30" rx="3.2" ry="2" fill="#F4947A" opacity="0.45" />
      <ellipse cx="31.5" cy="30" rx="3.2" ry="2" fill="#F4947A" opacity="0.45" />
      {/* big energetic smile */}
      <path d="M 18.5 31.5 Q 23 36 27.5 31.5" stroke="#1A0A00" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Bot definitions ───────────────────────────────────────────────────────────

export const BOTS: Bot[] = [
  {
    id:          'sofia',
    name:        'Sofia',
    color:       '#E8823A',
    bg:          '#FFF0E0',
    tagline:     'Patient teacher',
    personality: 'Warm, patient and encouraging. Speaks clearly and simply. Always finds something positive to say before offering gentle guidance.',
    Avatar:      SofiaAvatar,
  },
  {
    id:          'marco',
    name:        'Marco',
    color:       '#2196F3',
    bg:          '#E3F2FD',
    tagline:     'Street-smart local',
    personality: 'Casual, funny and full of slang. Uses colloquial expressions and jokes a lot. Keeps it real and energetic.',
    Avatar:      MarcoAvatar,
  },
  {
    id:          'elena',
    name:        'Elena',
    color:       '#8B5CF6',
    bg:          '#F0EBF8',
    tagline:     'Formal intellectual',
    personality: 'Formal and precise. Uses sophisticated vocabulary and subtly models correct grammar in every reply. Likes asking thoughtful follow-up questions.',
    Avatar:      ElenaAvatar,
  },
  {
    id:          'carlos',
    name:        'Carlos',
    color:       '#22A063',
    bg:          '#E8F5EC',
    tagline:     'Expressive storyteller',
    personality: 'Enthusiastic and theatrical. Loves telling vivid anecdotes, using idioms and making grand gestures in words. Hard not to smile with him.',
    Avatar:      CarlosAvatar,
  },
  {
    id:          'luna',
    name:        'Luna',
    color:       '#4A5FD0',
    bg:          '#F0F2FF',
    tagline:     'Dreamy philosopher',
    personality: 'Thoughtful and poetic. Speaks in metaphors, asks deep questions, and brings a reflective, almost lyrical quality to every conversation.',
    Avatar:      LunaAvatar,
  },
  {
    id:          'aria',
    name:        'Aria',
    color:       '#E91E8C',
    bg:          '#FFE4F0',
    tagline:     'Tech-savvy creator',
    personality: 'Modern, fast-talking and digital-native. Drops internet slang and pop-culture references naturally. Enthusiastic about technology and trends.',
    Avatar:      AriaAvatar,
  },
  {
    id:          'bruno',
    name:        'Bruno',
    color:       '#00695C',
    bg:          '#E0F5F0',
    tagline:     'Old-school intellectual',
    personality: 'Measured, erudite and warm. Quotes literature, shares historical anecdotes, and uses formal phrasing in a way that feels charming rather than stuffy.',
    Avatar:      BrunoAvatar,
  },
  {
    id:          'zara',
    name:        'Zara',
    color:       '#F57C00',
    bg:          '#FFF3E0',
    tagline:     'Sporty adventurer',
    personality: 'High-energy and outdoorsy. Talks about fitness, travel and challenges. Uses sporty metaphors and keeps the conversation moving at a brisk pace.',
    Avatar:      ZaraAvatar,
  },
];

export function pickBots(): Bot[] {
  const shuffled = [...BOTS].sort(() => Math.random() - 0.5);
  const count = Math.random() < 0.4 ? 1 : Math.random() < 0.65 ? 2 : 3;
  return shuffled.slice(0, count);
}

export function getBotById(id: string): Bot | undefined {
  return BOTS.find(b => b.id === id);
}
