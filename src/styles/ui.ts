// Shared styled building blocks used across sections.
import styled, { css, keyframes } from 'styled-components';
import { color, ease, font, media, radius } from './theme';

/* ---------- Layout ---------- */

export const Container = styled.div`
  width: min(1180px, 100% - 32px);
  margin-inline: auto;
`;

export const Section = styled.section`
  padding: 96px 0 0;

  ${media.mobile} {
    padding-top: 72px;
  }
`;

export const cardStyles = css`
  position: relative;
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${radius.lg};
  padding: 26px;
  box-shadow: ${color.shadow};
  transition: background-color 0.4s ${ease}, border-color 0.3s ${ease}, transform 0.35s ${ease};

  ${media.mobile} {
    padding: 22px;
  }
`;

export const Card = styled.article`
  ${cardStyles}
`;

/** A card that is itself a link. */
export const CardLink = styled.a`
  ${cardStyles}
`;

/** Soft accent-coloured glow, placed with a pseudo-element on a card. */
export const glow = (size: number, position: string) => css`
  content: '';
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  ${position};
  border-radius: 50%;
  background: radial-gradient(circle, ${color.accentSoft}, transparent 65%);
  pointer-events: none;
`;

/* ---------- Text ---------- */

/** The italic serif word used in headings ("about", "worked", …). */
export const SerifEm = styled.span<{ $accent?: boolean }>`
  font-family: ${font.serif};
  font-weight: 400;
  font-style: italic;
  ${(p) => p.$accent && `color: ${color.accent};`}
`;

export const Label = styled.p`
  font-family: ${font.mono};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${color.muted};
  margin-bottom: 14px;
`;

export const Mono = styled.span<{ $muted?: boolean; $small?: boolean }>`
  font-family: ${font.mono};
  font-size: ${(p) => (p.$small ? '0.85rem' : '0.8rem')};
  letter-spacing: 0.02em;
  ${(p) => p.$muted && `color: ${color.muted};`}
`;

export const Muted = styled.span<{ $small?: boolean }>`
  color: ${color.muted};
  ${(p) => p.$small && 'font-size: 0.85rem;'}
`;

export const TextLink = styled.a`
  color: ${color.text};
  background-image: linear-gradient(${color.accent}, ${color.accent});
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ${ease}, color 0.2s;

  &:hover {
    color: ${color.accent};
    background-size: 100% 1px;
  }
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

/* ---------- Buttons ---------- */

type ButtonProps = { $variant?: 'primary' | 'ghost'; $size?: 'md' | 'sm'; $block?: boolean };

const buttonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${(p) => (p.$size === 'sm' ? '9px 16px' : '13px 22px')};
  border-radius: ${radius.pill};
  border: 1px solid ${color.accent};
  background: ${color.accent};
  color: ${color.accentInk};
  font: 500 ${(p) => (p.$size === 'sm' ? '0.85rem' : '0.95rem')} / 1 ${font.sans};
  cursor: pointer;
  transition: transform 0.25s ${ease}, box-shadow 0.25s ${ease}, background 0.25s;
  ${(p) => p.$block && 'width: 100%;'}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px -10px ${color.accent};
  }

  &:disabled {
    opacity: 0.6;
    cursor: progress;
    transform: none;
  }

  ${(p) =>
    p.$variant === 'ghost' &&
    css`
      background: transparent;
      color: ${color.text};
      border-color: ${color.border};

      &:hover {
        border-color: ${color.text};
        box-shadow: none;
      }
    `}
`;

export const Button = styled.button<ButtonProps>`
  ${buttonStyles}
`;

export const ButtonLink = styled.a<ButtonProps>`
  ${buttonStyles}
`;

export const IconButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: auto;
  border-radius: 8px;
  border: 1px solid ${color.border};
  background: transparent;
  color: ${color.muted};
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: ${color.accent};
    border-color: ${color.accent};
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const RoundArrow = styled.span`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${color.border};
  flex-shrink: 0;
  transition: transform 0.35s ${ease}, background 0.25s, color 0.25s, border-color 0.25s;
`;

/** Styles applied to a RoundArrow when its parent card is hovered. */
export const roundArrowActive = css`
  ${RoundArrow} {
    background: ${color.accent};
    border-color: ${color.accent};
    color: ${color.accentInk};
    transform: rotate(45deg);
  }
`;

/* ---------- Chips ---------- */

export const Chips = styled.div<{ $lg?: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  ${(p) =>
    p.$lg &&
    css`
      && > * {
        font-size: 0.78rem;
        padding: 7px 13px;
        color: ${color.text};
      }
    `}
`;

export const Chip = styled.span<{ $accent?: boolean }>`
  font-family: ${font.mono};
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: ${radius.pill};
  border: 1px solid ${color.border};
  background: ${color.surface2};
  color: ${color.muted};
  white-space: nowrap;

  ${(p) =>
    p.$accent &&
    css`
      background: ${color.accentSoft};
      border-color: transparent;
      color: ${color.accent};
    `}
`;

/* ---------- Status dot ---------- */

const pulse = keyframes`
  70% { box-shadow: 0 0 0 8px rgba(62, 207, 142, 0); }
  100% { box-shadow: 0 0 0 0 rgba(62, 207, 142, 0); }
`;

export const Pulse = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${color.success};
  box-shadow: 0 0 0 0 rgba(62, 207, 142, 0.6);
  animation: ${pulse} 2.2s infinite;
`;
