import styled, { css } from 'styled-components';
import { useLang } from '../i18n';
import { color, ease, font, media, radius } from '../styles/theme';
import { ButtonLink } from '../styles/ui';
import type { Theme } from '../useTheme';
import { MoonIcon, SunIcon } from './Icons';

export function Nav({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const { t, lang, setLang } = useLang();
  const n = t.ui.nav;
  const links = [
    { href: '#about', label: n.about },
    { href: '#experience', label: n.experience },
    { href: '#projects', label: n.projects },
    { href: '#skills', label: n.skills },
  ];
  const themeLabel = theme === 'dark' ? t.ui.theme.toLight : t.ui.theme.toDark;

  return (
    <Header>
      <Inner>
        <Logo href="#top" aria-label={n.backToTop}>
          <span>cg</span>
          <Dot />
        </Logo>
        <Links aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </Links>
        <Actions>
          <Toggle role="group" aria-label={t.ui.language.label}>
            {(['en', 'es'] as const).map((l) => (
              <LangOption
                key={l}
                type="button"
                lang={l}
                $active={lang === l}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                title={lang === l ? undefined : t.ui.language.switchTo}
              >
                {l.toUpperCase()}
              </LangOption>
            ))}
            <Thumb $width={34} $shift={lang === 'es' ? 36 : 0} />
          </Toggle>
          <ThemeButton type="button" onClick={onToggle} aria-label={themeLabel} title={themeLabel}>
            <ThemeIcon $active={theme === 'dark'}>
              <MoonIcon />
            </ThemeIcon>
            <ThemeIcon $active={theme === 'light'}>
              <SunIcon />
            </ThemeIcon>
            <Thumb $width={32} $shift={theme === 'light' ? 34 : 0} />
          </ThemeButton>
          <CtaLink href="#contact" $size="sm">
            {n.cta}
          </CtaLink>
        </Actions>
      </Inner>
    </Header>
  );
}

/* ---------- styles ---------- */

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 14px 0;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: color-mix(in srgb, ${color.bg} 72%, transparent);
  border-bottom: 1px solid color-mix(in srgb, ${color.border} 60%, transparent);
`;

const Inner = styled.div`
  width: min(1180px, 100% - 32px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.a`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  font-family: ${font.serif};
  font-size: 1.9rem;
  line-height: 1;
  font-style: italic;
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${color.accent};
  margin-bottom: 5px;
`;

const Links = styled.nav`
  display: flex;
  gap: 4px;
  margin-left: auto;

  a {
    padding: 8px 14px;
    border-radius: ${radius.pill};
    font-size: 0.9rem;
    color: ${color.muted};
    transition: color 0.2s, background 0.2s;
  }

  a:hover {
    color: ${color.text};
    background: ${color.surface2};
  }

  ${media.mobile} {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${media.mobile} {
    margin-left: auto;
  }
`;

const CtaLink = styled(ButtonLink)`
  ${media.small} {
    display: none;
  }
`;

/** Pill-shaped segmented switch shared by the language and theme toggles. */
const toggleStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: ${radius.pill};
  border: 1px solid ${color.border};
  background: ${color.surface};
  color: ${color.muted};
`;

const Toggle = styled.div`
  ${toggleStyles}
`;

const ThemeButton = styled.button`
  ${toggleStyles}
  cursor: pointer;
`;

const Thumb = styled.span<{ $width: number; $shift: number }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: ${(p) => p.$width}px;
  height: 30px;
  border-radius: ${radius.pill};
  background: ${color.accent};
  transform: translateX(${(p) => p.$shift}px);
  transition: transform 0.4s ${ease};
`;

const LangOption = styled.button<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  width: 34px;
  height: 30px;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${(p) => (p.$active ? color.accentInk : color.muted)};
  font: 500 0.72rem / 1 ${font.mono};
  letter-spacing: 0.04em;
  cursor: ${(p) => (p.$active ? 'default' : 'pointer')};
  transition: color 0.3s;

  &:hover {
    color: ${(p) => (p.$active ? color.accentInk : color.text)};
  }
`;

const ThemeIcon = styled.span<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 30px;
  color: ${(p) => (p.$active ? color.accentInk : 'inherit')};
  transition: color 0.3s;

  svg {
    width: 16px;
    height: 16px;
  }
`;
