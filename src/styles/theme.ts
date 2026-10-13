// Design tokens. Edit colours here — both themes are generated from these values.
//
// Colours are exposed to components as CSS custom properties (var(--accent) etc.) so the
// dark/light switch is instant and the saved theme can be applied before React loads
// (see the inline script in index.html). Components should use `color.*` below rather
// than hard-coding hex values.

export const palettes = {
  dark: {
    bg: '#0b0d10',
    surface: '#12151a',
    surface2: '#181c22',
    border: '#252a33',
    text: '#eef1f5',
    muted: '#8d96a3',
    accent: '#0a66c2',
    accentInk: '#ffffff',
    accentSoftPct: '18%',
    shadow: '0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 20px 40px -24px rgba(0, 0, 0, 0.6)',
    grainOpacity: '0.05',
  },
  light: {
    bg: '#eef2f6',
    surface: '#f9fbfd',
    surface2: '#e9eef4',
    border: '#d8dfe8',
    text: '#11161d',
    muted: '#5d6773',
    accent: '#0077b5',
    accentInk: '#ffffff',
    accentSoftPct: '10%',
    shadow: '0 1px 0 rgba(177, 216, 255, 0.776) inset, 0 18px 36px -24px rgba(20, 40, 70, 0.22)',
    grainOpacity: '0.035',
  },
} as const;

export type Palette = { [K in keyof (typeof palettes)['dark']]: string };

/** References to the theme colours, for use inside styled-components templates. */
export const color = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  border: 'var(--border)',
  text: 'var(--text)',
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  accentInk: 'var(--accent-ink)',
  accentSoft: 'var(--accent-soft)',
  shadow: 'var(--shadow)',
  grainOpacity: 'var(--grain-opacity)',
  success: '#3ecf8e',
  danger: '#e5484d',
} as const;

export const font = {
  sans: "'Inter Tight', system-ui, -apple-system, 'Segoe UI', sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace",
} as const;

export const radius = { lg: '22px', sm: '12px', pill: '999px' } as const;

export const ease = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

export const media = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 760px)',
  small: '@media (max-width: 420px)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const;
