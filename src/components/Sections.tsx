import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { Title } from '../data';
import { useLang } from '../i18n';
import { color, font, media, radius } from '../styles/theme';
import {
  Card,
  CardLink,
  cardStyles,
  Chip,
  Chips,
  Label,
  Mono,
  Muted,
  RoundArrow,
  roundArrowActive,
  Section,
  SerifEm,
  TextLink,
  glow,
} from '../styles/ui';
import { ArrowIcon } from './Icons';

/* ---------- Shared section heading ---------- */

/** Renders [before, emphasised, after] with the middle word in italic serif. */
export function Heading({ parts }: { parts: Title }) {
  const [before, em, after] = parts;
  return (
    <>
      {before}
      <SerifEm>{em}</SerifEm>
      {after}
    </>
  );
}

function SectionHead({ index, title, kicker }: { index: string; title: ReactNode; kicker?: string }) {
  return (
    <Head className="reveal">
      <SectionIndex>{index}</SectionIndex>
      <HeadTitle>{title}</HeadTitle>
      {kicker && <Kicker>{kicker}</Kicker>}
    </Head>
  );
}

export const SectionIndex = styled.span`
  font-family: ${font.mono};
  font-size: 0.78rem;
  color: ${color.accent};
  padding: 4px 10px;
  border: 1px solid ${color.accent};
  border-radius: ${radius.pill};
  align-self: center;
  justify-self: start;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: 6px 20px;
  margin-bottom: 40px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const HeadTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.05;

  ${SerifEm} {
    font-size: 1.1em;
  }
`;

const Kicker = styled.p`
  grid-column: 2;
  color: ${color.muted};

  ${media.mobile} {
    grid-column: 1;
  }
`;

/* ---------- About ---------- */

export function About() {
  const { t } = useLang();
  return (
    <Section id="about">
      <SectionHead index="01" title={<Heading parts={t.ui.sections.about} />} />
      <AboutGrid>
        <AboutText className="reveal">
          {t.about.map((p, i) => (i === 0 ? <AboutLead key={i}>{p}</AboutLead> : <p key={i}>{p}</p>))}
        </AboutText>
        <LangCard className="reveal">
          <Label>{t.ui.sections.languages}</Label>
          {t.languages.map((l, i) => (
            <Row key={i}>
              <span>{l.name}</span>
              <Muted>{l.level}</Muted>
            </Row>
          ))}
        </LangCard>
      </AboutGrid>
    </Section>
  );
}

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: start;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  display: grid;
  gap: 18px;
  color: ${color.muted};
  font-size: 1.05rem;
  max-width: 720px;
`;

const AboutLead = styled.p`
  color: ${color.text};
  font-size: clamp(1.3rem, 2.2vw, 1.65rem);
  line-height: 1.4;
  letter-spacing: -0.01em;
`;

const LangCard = styled.aside`
  ${cardStyles}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid ${color.border};
  font-size: 0.92rem;
`;

/* ---------- Experience ---------- */

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience">
      <SectionHead
        index="02"
        title={<Heading parts={t.ui.sections.experience} />}
        kicker={t.ui.sections.experienceKicker}
      />
      <Timeline>
        {t.experience.map((job, idx) => (
          <Job className="reveal" key={idx}>
            <JobMeta>
              <Period>{job.period}</Period>
              <Muted $small>{job.location}</Muted>
            </JobMeta>
            <div>
              <JobTitle>
                {job.role} <Muted>{t.ui.sections.at}</Muted>{' '}
                {job.url ? (
                  <TextLink href={job.url} target="_blank" rel="noreferrer">
                    {job.company}
                  </TextLink>
                ) : (
                  job.company
                )}
              </JobTitle>
              <JobSummary>{job.summary}</JobSummary>
              <Chips>
                {job.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </Chips>
            </div>
          </Job>
        ))}
      </Timeline>
    </Section>
  );
}

const Timeline = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${color.border};
`;

const Period = styled(Mono)`
  color: ${color.text};
`;

const Job = styled.li`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  padding: 30px 0;
  border-bottom: 1px solid ${color.border};

  &:first-child ${Period} {
    color: ${color.accent};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const JobTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin-bottom: 8px;
`;

const JobSummary = styled.p`
  color: ${color.muted};
  margin-bottom: 14px;
  max-width: 720px;
`;

/* ---------- Projects ---------- */

export function Projects() {
  const { t } = useLang();
  return (
    <Section id="projects">
      <SectionHead index="03" title={<Heading parts={t.ui.sections.projects} />} />
      <ProjectGrid>
        {t.projects.map((p, i) => {
          const inner = (
            <>
              <ProjectTop $withArrow={!!p.url}>
                <Mono $muted>{String(i + 1).padStart(2, '0')}</Mono>
                <Mono $muted>{p.year}</Mono>
              </ProjectTop>
              <ProjectTitle>{p.title}</ProjectTitle>
              <ProjectKind>{p.kind}</ProjectKind>
              <ProjectDesc>{p.description}</ProjectDesc>
              {p.url && (
                <ProjectArrow>
                  <ArrowIcon />
                </ProjectArrow>
              )}
            </>
          );
          return p.url ? (
            <ProjectLink key={i} className="reveal" href={p.url} target="_blank" rel="noreferrer">
              {inner}
            </ProjectLink>
          ) : (
            <ProjectCard key={i} className="reveal">
              {inner}
            </ProjectCard>
          );
        })}
      </ProjectGrid>
    </Section>
  );
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const projectStyles = `
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 250px;

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, ${color.accent} 60%, ${color.border});
  }
`;

const ProjectCard = styled(Card)`
  ${projectStyles}
`;

const ProjectLink = styled(CardLink)`
  ${projectStyles}

  &:hover {
    ${roundArrowActive}
  }
`;

const ProjectTop = styled.div<{ $withArrow: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
  padding-bottom: 28px;

  & > :last-child {
    margin-right: ${(p) => (p.$withArrow ? '52px' : '0')};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  padding-right: 44px;
`;

const ProjectKind = styled.p`
  font-family: ${font.mono};
  font-size: 0.72rem;
  color: ${color.accent};
`;

const ProjectDesc = styled.p`
  color: ${color.muted};
  font-size: 0.93rem;
  margin-top: 6px;
`;

const ProjectArrow = styled(RoundArrow)`
  position: absolute;
  top: 22px;
  right: 22px;
`;

/* ---------- Skills ---------- */

export function Skills() {
  const { t } = useLang();
  return (
    <Section id="skills">
      <SectionHead index="04" title={<Heading parts={t.ui.sections.skills} />} />
      <AiGrid>
        {t.aiSkills.map((s, idx) => (
          <AiCard className="reveal" key={idx}>
            <AiHead>
              <Label>{s.group}</Label>
              <Chip $accent>{t.ui.sections.aiBadge}</Chip>
            </AiHead>
            <AiBlurb>{s.blurb}</AiBlurb>
            <Chips $lg>
              {s.items.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </Chips>
          </AiCard>
        ))}
      </AiGrid>
      <SkillGrid>
        {t.skills.map((s, idx) => (
          <Card className="reveal" key={idx}>
            <Label>{s.group}</Label>
            <Chips $lg>
              {s.items.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </Chips>
          </Card>
        ))}
      </SkillGrid>
      <CredGrid>
        <Card className="reveal">
          <Label>{t.ui.sections.education}</Label>
          {t.education.map((e, idx) => (
            <Cred key={idx}>
              <div>
                <CredTitle>{e.title}</CredTitle>
                <CredPlace>{e.place}</CredPlace>
              </div>
              <Mono $muted $small>
                {e.year}
              </Mono>
            </Cred>
          ))}
        </Card>
        <Card className="reveal">
          <Label>{t.ui.sections.certifications}</Label>
          {t.certifications.map((c, idx) => (
            <Cred key={idx}>
              <div>
                <CredTitle>{c.title}</CredTitle>
                <CredPlace>{c.place}</CredPlace>
              </div>
              <Mono $muted $small>
                {c.year}
              </Mono>
            </Cred>
          ))}
        </Card>
      </CredGrid>
    </Section>
  );
}

const AiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const AiCard = styled(Card)`
  overflow: hidden;
  border-color: color-mix(in srgb, ${color.accent} 35%, ${color.border});

  &::before {
    ${glow(360, 'right: -140px; top: -200px;')}
  }
`;

const AiHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

const AiBlurb = styled.p`
  position: relative;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  margin: -2px 0 16px;
  max-width: 440px;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const CredGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Cred = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid ${color.border};
`;

const CredTitle = styled.p`
  font-weight: 500;
`;

const CredPlace = styled.p`
  color: ${color.muted};
  font-size: 0.85rem;
`;
