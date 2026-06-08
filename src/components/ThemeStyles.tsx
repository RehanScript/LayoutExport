import React from 'react';
import type { ThemePreset, ColorPalette } from '../types/landingPage';

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'linear-dark-emerald',
    name: 'Midnight Emerald (Shadcn)',
    background: 'bg-zinc-950',
    text: 'text-zinc-100',
    primary: 'bg-emerald-400 text-zinc-950 hover:bg-emerald-300',
    secondary: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800',
    accent: 'emerald-400',
    cardBg: 'bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm',
    borderColor: 'border-zinc-800',
    glowColor: 'rgba(16,185,129,0.15)',
    isDark: true,
  },
  {
    id: 'linear-dark-blue',
    name: 'Electric Blue (Shadcn)',
    background: 'bg-slate-950',
    text: 'text-slate-100',
    primary: 'bg-blue-500 text-white hover:bg-blue-400',
    secondary: 'bg-slate-900 text-slate-200 hover:bg-slate-800',
    accent: 'blue-500',
    cardBg: 'bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm',
    borderColor: 'border-slate-800',
    glowColor: 'rgba(59,130,246,0.15)',
    isDark: true,
  },
  {
    id: 'linear-dark-violet',
    name: 'Neon Sunset (Shadcn)',
    background: 'bg-zinc-950',
    text: 'text-zinc-100',
    primary: 'bg-violet-500 text-white hover:bg-violet-400',
    secondary: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-850',
    accent: 'violet-500',
    cardBg: 'bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm',
    borderColor: 'border-zinc-800',
    glowColor: 'rgba(139,92,246,0.15)',
    isDark: true,
  },
  {
    id: 'linear-slate-platinum',
    name: 'Slate Platinum (Premium)',
    background: 'bg-[#030303]',
    text: 'text-zinc-200',
    primary: 'bg-white text-black hover:bg-zinc-200',
    secondary: 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800',
    accent: 'white',
    cardBg: 'bg-zinc-900/40 border border-zinc-850/95 backdrop-blur-sm',
    borderColor: 'border-zinc-850',
    glowColor: 'rgba(255,255,255,0.08)',
    isDark: true,
  },
  {
    id: 'linear-amber-gold',
    name: 'Amber Gold (High Intent)',
    background: 'bg-[#0c0a09]',
    text: 'text-stone-200',
    primary: 'bg-amber-500 text-stone-950 hover:bg-amber-400',
    secondary: 'bg-stone-900 text-stone-300 hover:bg-stone-800',
    accent: 'amber-500',
    cardBg: 'bg-stone-900/40 border border-stone-850/95 backdrop-blur-sm',
    borderColor: 'border-stone-850',
    glowColor: 'rgba(245,158,11,0.12)',
    isDark: true,
  },
  {
    id: 'neubrutalism-yellow',
    name: 'Cyber Yellow (Neubrutalism)',
    background: 'bg-[#FFFDEB]',
    text: 'text-black',
    primary: 'bg-[#FACC15] text-black hover:bg-[#E2B60D]',
    secondary: 'bg-white text-black hover:bg-zinc-50',
    accent: '[#FACC15]',
    cardBg: 'bg-white border-2 border-black shadow-neubrutalism-card text-black',
    borderColor: 'border-black',
    isDark: false,
  },
  {
    id: 'neubrutalism-orange',
    name: 'Retro Orange (Neubrutalism)',
    background: 'bg-[#FFF8F5]',
    text: 'text-black',
    primary: 'bg-[#FB923C] text-black hover:bg-[#E07D2C]',
    secondary: 'bg-white text-black hover:bg-zinc-50',
    accent: '[#FB923C]',
    cardBg: 'bg-white border-2 border-black shadow-neubrutalism-card text-black',
    borderColor: 'border-black',
    isDark: false,
  },
  {
    id: 'neubrutalism-teal',
    name: 'Toxic Teal (Neubrutalism)',
    background: 'bg-[#F0FDF4]',
    text: 'text-black',
    primary: 'bg-[#2DD4BF] text-black hover:bg-[#22B3A1]',
    secondary: 'bg-white text-black hover:bg-zinc-50',
    accent: '[#2DD4BF]',
    cardBg: 'bg-white border-2 border-black shadow-neubrutalism-card text-black',
    borderColor: 'border-black',
    isDark: false,
  },
  {
    id: 'neubrutalism-magenta',
    name: 'Hot Magenta (Urgency)',
    background: 'bg-[#FFF9FC]',
    text: 'text-black',
    primary: 'bg-[#EC4899] text-white hover:bg-[#D93F89]',
    secondary: 'bg-white text-black hover:bg-zinc-50',
    accent: '[#EC4899]',
    cardBg: 'bg-white border-2 border-black shadow-neubrutalism-card text-black',
    borderColor: 'border-black',
    isDark: false,
  },
  {
    id: 'neubrutalism-lime',
    name: 'Acid Lime (Agency Pop)',
    background: 'bg-[#FAF9F5]',
    text: 'text-black',
    primary: 'bg-[#84CC16] text-black hover:bg-[#73B310]',
    secondary: 'bg-white text-black hover:bg-zinc-50',
    accent: '[#84CC16]',
    cardBg: 'bg-white border-2 border-black shadow-neubrutalism-card text-black',
    borderColor: 'border-black',
    isDark: false,
  },
  {
    id: 'glass-indigo',
    name: 'Deep space Indigo (Glass)',
    background: 'bg-slate-950',
    text: 'text-indigo-50',
    primary: 'bg-indigo-650/85 text-white border-indigo-400/35 hover:bg-indigo-650/95 shadow-indigo-500/25',
    secondary: 'bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10',
    accent: 'indigo-400',
    cardBg: 'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl',
    borderColor: 'border-white/10',
    glowColor: 'rgba(99,102,241,0.25)',
    isDark: true,
  },
  {
    id: 'glass-rose',
    name: 'Cosmic Rose (Glass)',
    background: 'bg-[#0b040e]',
    text: 'text-rose-50',
    primary: 'bg-rose-650/85 text-white border-rose-400/35 hover:bg-rose-650/95 shadow-rose-500/25',
    secondary: 'bg-white/5 text-rose-200 border-white/10 hover:bg-white/10',
    accent: 'rose-400',
    cardBg: 'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl',
    borderColor: 'border-white/10',
    glowColor: 'rgba(244,63,94,0.25)',
    isDark: true,
  },
  {
    id: 'glass-teal',
    name: 'Aurora Teal (Next-Gen)',
    background: 'bg-[#020d0f]',
    text: 'text-teal-50',
    primary: 'bg-teal-500/80 text-white border-teal-400/35 hover:bg-teal-500/95 shadow-teal-500/25',
    secondary: 'bg-white/5 text-teal-200 border-white/10 hover:bg-white/10',
    accent: 'teal-400',
    cardBg: 'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl',
    borderColor: 'border-white/10',
    glowColor: 'rgba(20,184,166,0.25)',
    isDark: true,
  },
  {
    id: 'glass-white',
    name: 'Frosty White (Premium Glass)',
    background: 'bg-[#0f1115]',
    text: 'text-slate-200',
    primary: 'bg-white/90 text-slate-950 border-white/40 hover:bg-white shadow-white/15',
    secondary: 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10',
    accent: 'white',
    cardBg: 'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl',
    borderColor: 'border-white/10',
    glowColor: 'rgba(255,255,255,0.15)',
    isDark: true,
  }
];

export interface ThemeClasses {
  globalBg: string;
  globalText: string;
  headingText: string;
  subtleText: string;
  card: string;
  buttonPrimary: string;
  buttonSecondary: string;
  borderColor: string;
  badge: string;
  tableHeader: string;
  tableCell: string;
  faqItem: string;
  inputField: string;
}

export function getThemeClasses(theme: ThemePreset, palette: ColorPalette): ThemeClasses {
  const isDark = palette.isDark;
  
  // Strict contrast compliance: Light backgrounds get dark text, dark backgrounds get light text
  const textColor = isDark ? 'text-zinc-300' : 'text-zinc-800';
  const headingColor = isDark ? 'text-white' : 'text-zinc-950';
  const subtleColor = isDark ? 'text-zinc-400 font-medium' : 'text-zinc-650 font-medium';

  switch (theme) {
    case 'neubrutalism': {
      const btnPrimaryClass = `px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black rounded-xl shadow-neubrutalism-btn hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-neubrutalism-btn-hover transition-all duration-200 text-center inline-block cursor-pointer ${palette.primary}`;
      const btnSecondaryClass = `px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black rounded-xl shadow-neubrutalism-btn hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-neubrutalism-btn-hover transition-all duration-200 text-center inline-block cursor-pointer ${palette.secondary}`;

      return {
        globalBg: palette.background,
        globalText: textColor,
        headingText: `${headingColor} font-extrabold tracking-tight font-heading`,
        subtleText: subtleColor,
        card: `border-2 border-black shadow-neubrutalism-card rounded-2xl p-6 ${palette.cardBg}`,
        buttonPrimary: btnPrimaryClass,
        buttonSecondary: btnSecondaryClass,
        borderColor: 'border-black',
        badge: `inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black border-2 border-black rounded-full uppercase tracking-wider bg-white text-black shadow-neubrutalism-sm`,
        tableHeader: `border-2 border-black p-4 font-black text-black uppercase ${palette.primary}`,
        tableCell: `border-2 border-black p-4 font-bold text-black bg-white`,
        faqItem: `border-2 border-black p-6 rounded-2xl shadow-neubrutalism-md bg-white text-black`,
        inputField: `w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-bold bg-white text-black`,
      };
    }

    case 'glassmorphism': {
      const btnPrimaryClass = `px-6 py-3 text-xs font-bold rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center inline-block cursor-pointer text-white`;
      const btnSecondaryClass = `px-6 py-3 text-xs font-bold rounded-full border border-white/10 bg-transparent hover:bg-white/5 text-white/80 hover:text-white backdrop-blur-sm transition-all duration-300 text-center inline-block cursor-pointer`;

      return {
        globalBg: `${palette.background} relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-indigo-950/40 to-slate-950`,
        globalText: textColor,
        headingText: `${headingColor} font-extrabold tracking-tight font-heading`,
        subtleText: subtleColor,
        card: `backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl p-6`,
        buttonPrimary: btnPrimaryClass,
        buttonSecondary: btnSecondaryClass,
        borderColor: 'border-white/[0.08]',
        badge: `inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full border border-white/[0.08] backdrop-blur-md bg-white/[0.04] text-white/90`,
        tableHeader: 'border-b border-white/[0.08] bg-white/[0.05] backdrop-blur-sm p-4 font-semibold text-white',
        tableCell: `border-b border-white/[0.04] p-4 bg-transparent text-white/85`,
        faqItem: 'border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm rounded-2xl transition-all duration-300 p-6',
        inputField: `w-full px-4 py-3 border border-white/[0.08] bg-white/[0.02] rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md ${textColor}`,
      };
    }

    case 'linear':
    default: {
      const btnPrimaryClass = `px-4 py-2 text-xs font-medium rounded-md transition-all hover:opacity-90 shadow text-center inline-block cursor-pointer duration-200 ${palette.primary}`;
      const btnSecondaryClass = `px-4 py-2 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 shadow-sm transition-all text-center inline-block cursor-pointer duration-200`;

      return {
        globalBg: palette.background,
        globalText: textColor,
        headingText: `${headingColor} font-semibold tracking-tight font-heading`,
        subtleText: subtleColor,
        card: `rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-6`,
        buttonPrimary: btnPrimaryClass,
        buttonSecondary: btnSecondaryClass,
        borderColor: 'border-zinc-200 dark:border-zinc-800',
        badge: `inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 uppercase tracking-wider`,
        tableHeader: `border-b border-zinc-250 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 font-semibold ${headingColor}`,
        tableCell: `border-b border-zinc-150 dark:border-zinc-900 p-3 bg-transparent ${textColor}`,
        faqItem: `border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg p-5`,
        inputField: `w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white dark:bg-zinc-950 ${textColor}`,
      };
    }
  }
}

export function getIcon(name: string, className = "w-5 h-5") {
  // We use standard React element rendering for SVGs in our preview
  const iconMap: Record<string, React.ReactNode> = {
    zap: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    globe: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    star: (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    rocket: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    code: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    heart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    twitter: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  };

  return iconMap[name.toLowerCase()] || (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
