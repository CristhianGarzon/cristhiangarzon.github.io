import { useState } from 'react';
import styled from 'styled-components';
import { profile } from '../data';
import { useLang } from '../i18n';
import { color, ease, font, media, radius } from '../styles/theme';
import {
  ButtonLink,
  Card,
  CardLink,
  Chip,
  Chips,
  IconButton,
  Label,
  Pulse,
  RoundArrow,
  roundArrowActive,
  SerifEm,
  SrOnly,
  glow,
} from '../styles/ui';
import { ArrowIcon, CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';

function CopyEmail({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <IconButton type="button" onClick={copy} aria-label={label} title={label}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <SrOnly aria-live="polite">{copied ? copiedLabel : ''}</SrOnly>
    </IconButton>
  );
}

export function Hero() {
  const { t } = useLang();
  const h = t.ui.hero;

  return (
    <HeroSection id="top">
      <Bento>
        <IntroCard className="reveal">
          <Eyebrow>
            <Pulse /> {t.role}
          </Eyebrow>
          <Title>
            {h.greeting} <SerifEm $accent>{profile.firstName}</SerifEm>.
            <br />
            {h.tagline}
          </Title>
          <Lead>{t.headline}</Lead>
          <Ctas>
            <ButtonLink href="#contact">
              {h.connect} <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="#experience" $variant="ghost">
              {h.seeWork}
            </ButtonLink>
          </Ctas>
        </IntroCard>

        <PhotoCard className="reveal">
          <img src={profile.photo} alt={h.photoAlt} width={234} height={256} />
          <PhotoBadge>
            <Pulse /> {h.open}
          </PhotoBadge>
        </PhotoCard>

        <ContactCard className="reveal">
          <Label>{h.contact}</Label>
          <ContactList>
            <li>
              <MailIcon />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail label={h.copyEmail} copiedLabel={h.copied} />
            </li>
            <li>
              <PinIcon />
              <span>{t.location}</span>
            </li>
            <li>
              <LinkedInIcon />
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/cristhian-garzon
              </a>
            </li>
            <li>
              <GitHubIcon />
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/CristhianGarzon
              </a>
            </li>
          </ContactList>
        </ContactCard>

        <NowCard className="reveal" href={t.current.url} target="_blank" rel="noreferrer">
          <NowTop>
            <Label>{h.nowBuilding}</Label>
            <Chip $accent>{t.current.status}</Chip>
          </NowTop>
          <NowName>{t.current.name}</NowName>
          <NowTagline>{t.current.tagline}</NowTagline>
          <NowFoot>
            <Chips>
              {t.current.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </Chips>
            <RoundArrow>
              <ArrowIcon />
            </RoundArrow>
          </NowFoot>
        </NowCard>

        <StatsCard className="reveal">
          {t.stats.map((s) => (
            <Stat key={s.value + s.label}>
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </Stat>
          ))}
        </StatsCard>
      </Bento>
    </HeroSection>
  );
}

/* ---------- styles ---------- */

const HeroSection = styled.section`
  padding: 40px 0 28px;

  ${media.mobile} {
    padding-top: 20px;
  }
`;

const Bento = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(0, auto);
  gap: 16px;

  /* stagger the cards as they fade in */
  ${[2, 3, 4, 5].map((n) => `& > .reveal:nth-child(${n}) { transition-delay: ${(n - 1) * 0.06}s; }`).join('\n')}
`;

const IntroCard = styled(Card)`
  grid-column: span 8;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  padding: 36px;
  overflow: hidden;

  &::after {
    ${glow(420, 'right: -160px; bottom: -220px;')}
  }

  ${media.tablet} {
    grid-column: span 12;
    grid-row: auto;
  }

  ${media.mobile} {
    padding: 26px 22px;
  }
`;

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  padding: 7px 14px;
  border: 1px solid ${color.border};
  border-radius: ${radius.pill};
  font-family: ${font.mono};
  font-size: 0.74rem;
  color: ${color.muted};
`;

const Title = styled.h1`
  font-size: clamp(2.3rem, 5vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 500;

  ${SerifEm} {
    font-size: 1.12em;
    letter-spacing: -0.01em;
  }
`;

const Lead = styled.p`
  max-width: 560px;
  color: ${color.muted};
  font-size: 1.08rem;
`;

const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PhotoCard = styled(Card)`
  grid-column: span 4;
  grid-row: span 2;
  padding: 0;
  overflow: hidden;
  min-height: 380px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 30%;
    transition: transform 0.8s ${ease};
  }

  &:hover img {
    transform: scale(1.04);
  }

  ${media.tablet} {
    grid-column: span 5;
    grid-row: auto;
  }

  ${media.mobile} {
    grid-column: span 12;
    min-height: 360px;
    padding: 0;
  }
`;

const PhotoBadge = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: ${radius.pill};
  font-size: 0.8rem;
  font-weight: 500;
  color: #eef1f5;
  background: rgba(11, 13, 16, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const ContactCard = styled(Card)`
  grid-column: span 4;

  ${media.tablet} {
    grid-column: span 7;
  }

  ${media.mobile} {
    grid-column: span 12;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.92rem;
    min-width: 0;
  }

  li > svg {
    flex-shrink: 0;
    color: ${color.accent};
  }

  a,
  li > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a:hover {
    color: ${color.accent};
  }
`;

const NowCard = styled(CardLink)`
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover {
    border-color: ${color.accent};
    transform: translateY(-3px);
    ${roundArrowActive}
  }

  ${media.tablet} {
    grid-column: span 7;
  }

  ${media.mobile} {
    grid-column: span 12;
  }
`;

const NowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  ${Label} {
    margin: 0;
  }
`;

const NowName = styled.h2`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: 2.6rem;
  line-height: 1;
  letter-spacing: 0.01em;
`;

const NowTagline = styled.p`
  color: ${color.muted};
  font-size: 0.95rem;
`;

const NowFoot = styled.div`
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
`;

const StatsCard = styled(Card)`
  grid-column: span 3;
  display: grid;
  gap: 14px;
  align-content: center;

  ${media.tablet} {
    grid-column: span 5;
  }

  ${media.mobile} {
    grid-column: span 12;
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;

  & + & {
    border-top: 1px solid ${color.border};
    padding-top: 12px;
  }
`;

const StatValue = styled.span`
  font-family: ${font.serif};
  font-size: 2.4rem;
  line-height: 1;
  color: ${color.accent};
  min-width: 52px;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: ${color.muted};
  line-height: 1.3;
`;
