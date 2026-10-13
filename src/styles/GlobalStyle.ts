import { createGlobalStyle, css } from 'styled-components';
import { color, ease, font, media, palettes, type Palette } from './theme';

const vars = (p: Palette) => css`
  --bg: ${p.bg};
  --surface: ${p.surface};
  --surface-2: ${p.surface2};
  --border: ${p.border};
  --text: ${p.text};
  --muted: ${p.muted};
  --accent: ${p.accent};
  --accent-ink: ${p.accentInk};
  --accent-soft: color-mix(in srgb, var(--accent) ${p.accentSoftPct}, transparent);
  --shadow: ${p.shadow};
  --grain-opacity: ${p.grainOpacity};
`;

export const GlobalStyle = createGlobalStyle`
  :root,
  :root[data-theme='dark'] {
    ${vars(palettes.dark)}
    color-scheme: dark;
  }

  :root[data-theme='light'] {
    ${vars(palettes.light)}
    color-scheme: light;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
  }

  body {
    margin: 0;
    background: ${color.bg};
    color: ${color.text};
    font-family: ${font.sans};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.4s ${ease}, color 0.4s ${ease};
    overflow-x: hidden;
  }

  /* subtle film grain */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    opacity: ${color.grainOpacity};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  ::selection {
    background: ${color.accent};
    color: ${color.accentInk};
  }

  :focus-visible {
    outline: 2px solid ${color.accent};
    outline-offset: 3px;
    border-radius: 6px;
  }

  /* Reveal on scroll — useReveal() adds .is-visible as elements enter the viewport. */
  .reveal.reveal {
    transition: opacity 0.7s ${ease}, transform 0.7s ${ease}, background-color 0.4s ${ease},
      border-color 0.3s ${ease};
  }
  .reveal:not(.is-visible) {
    opacity: 0;
    transform: translateY(18px);
  }

  ${media.reducedMotion} {
    html {
      scroll-behavior: auto;
    }
    .reveal:not(.is-visible) {
      opacity: 1;
      transform: none;
    }
    * {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
