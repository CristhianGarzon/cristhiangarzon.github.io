// A one-page A4 CV that only appears when printing (Hero → "Download CV", or Ctrl/⌘+P).
// It is built from the same data as the site, in the current language, and its colours come from
// the active theme's CSS variables — so a dark-mode export is dark and a light-mode export is light.
import styled from 'styled-components';
import { PLANNED_AI_ITEMS, profile } from '../data';
import { useLang } from '../i18n';
import { color, font } from '../styles/theme';

/** How many of the most recent roles to include. */
const MAX_ROLES = 5;

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function PrintResume() {
  const { t } = useLang();
  const r = t.ui.resume;
  const roles = t.experience.slice(0, MAX_ROLES);
  const planned = new Set(PLANNED_AI_ITEMS);
  const skillGroups = [...t.aiSkills, ...t.skills].map((g) => ({ ...g, items: g.items.filter((i) => !planned.has(i)) }));

  return (
    <Sheet data-print-root aria-hidden="true">
      <Layout>
        <Sidebar>
          <Photo src={`${import.meta.env.BASE_URL}${profile.photo}`} alt="" />

          <Block>
            <BlockTitle>{r.contact}</BlockTitle>
            <ContactList>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.linkedin}>{strip(profile.linkedin)}</a>
              </li>
              <li>
                <a href={profile.github}>{strip(profile.github)}</a>
              </li>
              <li>{t.location}</li>
            </ContactList>
          </Block>

          <Block>
            <BlockTitle>{r.skills}</BlockTitle>
            {skillGroups.map((g) => (
              <SkillGroup key={g.group}>
                <strong>{g.group}</strong>
                <span>{g.items.join(' · ')}</span>
              </SkillGroup>
            ))}
          </Block>

          <Block>
            <BlockTitle>{r.languages}</BlockTitle>
            {t.languages.map((l) => (
              <Line key={l.name}>
                <strong>{l.name}</strong> — {l.level}
              </Line>
            ))}
          </Block>

          <Block>
            <BlockTitle>{r.education}</BlockTitle>
            {t.education.map((e) => (
              <Entry key={e.title}>
                <strong>{e.title}</strong>
                <span>{e.place}</span>
                <Muted>{e.year}</Muted>
              </Entry>
            ))}
          </Block>

          <Block>
            <BlockTitle>{r.certifications}</BlockTitle>
            {t.certifications.map((c) => (
              <Entry key={c.title}>
                <strong>{c.title}</strong>
                <Muted>
                  {c.place} · {c.year}
                </Muted>
              </Entry>
            ))}
          </Block>
        </Sidebar>

        <Main>
          <Header>
            <Name>
              <em>{profile.firstName}</em> {profile.name.replace(profile.firstName, '').trim()}
            </Name>
            <Role>{t.role}</Role>
            <Lead>{t.headline}</Lead>
          </Header>

          <Section>
            <SectionTitle>{r.profile}</SectionTitle>
            <Text>{t.about.slice(0, 2).join(' ')}</Text>
          </Section>

          <Section>
            <SectionTitle>{r.experience}</SectionTitle>
            {roles.map((j) => (
              <Job key={j.company + j.period}>
                <JobHead>
                  <strong>
                    {j.role} · {j.url ? <a href={j.url}>{j.company}</a> : j.company}
                  </strong>
                  <Muted>{j.period}</Muted>
                </JobHead>
                <Muted as="div">{j.location}</Muted>
                <Text>{j.summary}</Text>
                <Tags>{j.tags.join(' · ')}</Tags>
              </Job>
            ))}
          </Section>

          <Footer>
            {r.portfolio}: <a href={profile.siteUrl}>{strip(profile.siteUrl)}</a>
          </Footer>
        </Main>
      </Layout>
    </Sheet>
  );
}

/* ---------- styles (print only) ---------- */

/** Sidebar width — keep in sync with the print background in styles/GlobalStyle.ts. */
const SIDEBAR = '70mm';

const Sheet = styled.div`
  display: none;

  @media print {
    display: block;
    font-family: ${font.sans};
    font-size: 8.6pt;
    line-height: 1.42;
    color: ${color.text};

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${SIDEBAR} 1fr;
  /* Exactly one A4 page. */
  height: 297mm;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  padding: 10mm 7mm 8mm 8mm;
  font-size: 8.1pt;
  line-height: 1.38;
  display: flex;
  flex-direction: column;
  gap: 3.6mm;
`;

const Photo = styled.img`
  width: 30mm;
  height: 30mm;
  object-fit: cover;
  object-position: 50% 30%;
  border-radius: 50%;
  border: 0.8mm solid ${color.accent};
  align-self: center;
`;

const Block = styled.section`
  break-inside: avoid;
`;

const BlockTitle = styled.h3`
  font-family: ${font.mono};
  font-size: 7pt;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${color.accent};
  margin: 0 0 1.5mm;
  padding-bottom: 1mm;
  border-bottom: 0.3mm solid ${color.border};
`;

const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1mm;
  word-break: break-word;
`;

const SkillGroup = styled.div`
  margin-bottom: 1.4mm;

  strong {
    display: block;
    font-weight: 600;
  }

  span {
    color: ${color.muted};
  }
`;

const Line = styled.div`
  margin-bottom: 0.8mm;
`;

const Entry = styled.div`
  display: grid;
  margin-bottom: 1.2mm;

  strong {
    font-weight: 600;
  }
`;

const Muted = styled.span`
  color: ${color.muted};
`;

/* A flex column filling the page height, so the footer sits at the bottom however much content is above it. */
const Main = styled.main`
  padding: 10mm 12mm 8mm 10mm;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Header = styled.header`
  margin-bottom: 5mm;
`;

const Name = styled.h1`
  font-size: 26pt;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 2mm;

  em {
    font-family: ${font.serif};
    font-weight: 400;
    color: ${color.accent};
  }
`;

const Role = styled.p`
  font-family: ${font.mono};
  font-size: 8pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${color.accent};
  margin: 0 0 2.5mm;
`;

const Lead = styled.p`
  font-size: 9.5pt;
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 4.5mm;
`;

const SectionTitle = styled.h2`
  font-family: ${font.mono};
  font-size: 7.5pt;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${color.accent};
  margin: 0 0 2mm;
  padding-bottom: 1.2mm;
  border-bottom: 0.3mm solid ${color.border};
  break-after: avoid;
`;

const Text = styled.p`
  margin: 0.8mm 0 0;
`;

const Job = styled.article`
  break-inside: avoid;
  margin-bottom: 3mm;
`;

const JobHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4mm;

  strong {
    font-size: 9.2pt;
    font-weight: 600;
  }

  a {
    color: ${color.accent};
  }

  > span {
    white-space: nowrap;
    font-family: ${font.mono};
    font-size: 7.2pt;
  }
`;

const Tags = styled.div`
  font-family: ${font.mono};
  font-size: 6.8pt;
  color: ${color.accent};
  margin-top: 0.8mm;
`;

const Footer = styled.p`
  font-family: ${font.mono};
  font-size: 7pt;
  color: ${color.muted};
  margin: auto 0 0;
  padding-top: 3mm;

  a {
    color: ${color.accent};
  }
`;
