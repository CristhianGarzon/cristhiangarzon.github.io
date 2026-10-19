import styled from 'styled-components';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { PrintResume } from './components/PrintResume';
import { Marquee } from './components/Marquee';
import { About, Experience, Projects, Skills } from './components/Sections';
import { profile } from './data';
import { useLang } from './i18n';
import { GlobalStyle } from './styles/GlobalStyle';
import { color } from './styles/theme';
import { Container, Muted, TextLink } from './styles/ui';
import { useReveal } from './useReveal';
import { useTheme } from './useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  const { t, lang } = useLang();
  useReveal(lang);

  return (
    <>
      <GlobalStyle />
      <Nav theme={theme} onToggle={toggle} />
      <Container as="main">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </Container>
      <Footer>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <Muted>{t.ui.footer.builtWith}</Muted>
        <TextLink href="#top">{t.ui.nav.backToTop} ↑</TextLink>
      </Footer>
      <PrintResume />
    </>
  );
}

const Footer = styled.footer`
  width: min(1180px, 100% - 32px);
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 40px 0 48px;
  margin-top: 64px;
  border-top: 1px solid ${color.border};
  font-size: 0.88rem;
`;
