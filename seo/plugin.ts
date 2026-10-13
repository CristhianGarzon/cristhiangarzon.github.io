// Build-time SEO for a client-rendered SPA.
//
// Search engines and AI agents that don't run JavaScript would otherwise see an empty
// <div id="root">. This plugin reads src/data.ts and, at build time:
//   • fills <!--seo:head--> with title/description, canonical + hreflang links, Open Graph /
//     Twitter cards and schema.org JSON-LD (Person, ProfilePage, WebSite);
//   • fills <!--seo:body--> with the full page content as plain semantic HTML (React replaces it
//     on load, so visitors see the normal app);
//   • emits robots.txt, sitemap.xml, llms.txt and llms-full.txt.
// Everything comes from data.ts, so edits there flow through automatically.

import type { Plugin } from 'vite';
import { content, profile, type Content, type Lang } from '../src/data';

const SITE = profile.siteUrl.endsWith('/') ? profile.siteUrl : `${profile.siteUrl}/`;
const abs = (path: string) => new URL(path, SITE).toString();
const urlFor = (lang: Lang) => (lang === 'en' ? SITE : `${SITE}?lang=es`);
const [firstName, ...rest] = profile.name.split(' ');
const lastName = rest.join(' ');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Every distinct skill/tool listed on the site. */
function allSkills(t: Content) {
  return [...new Set([...t.aiSkills, ...t.skills].flatMap((g) => g.items))];
}

/* ------------------------------------------------------------------ */
/* <head>                                                              */
/* ------------------------------------------------------------------ */

function jsonLd() {
  const t = content.en;
  const es = content.es;
  const personId = `${SITE}#person`;
  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      givenName: firstName,
      familyName: lastName,
      url: SITE,
      image: abs(profile.photo),
      email: `mailto:${profile.email}`,
      jobTitle: t.role,
      description: t.meta.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.city,
        addressRegion: profile.region,
        addressCountry: profile.country,
      },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: allSkills(t),
      knowsLanguage: [
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      worksFor: { '@type': 'Organization', name: t.current.name, url: t.current.url },
      alumniOf: t.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.place })),
      hasCredential: t.certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.title,
        recognizedBy: { '@type': 'Organization', name: c.place },
        dateCreated: c.year,
      })),
    },
    {
      '@type': 'Organization',
      name: t.current.name,
      url: t.current.url,
      description: t.current.tagline,
      founder: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}#profile`,
      url: SITE,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: ['en', 'es'],
      mainEntity: { '@id': personId },
      primaryImageOfPage: abs(profile.ogImage),
      dateModified: new Date().toISOString(),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}#website`,
      url: SITE,
      name: profile.name,
      alternateName: es.meta.title,
      inLanguage: ['en', 'es'],
      publisher: { '@id': personId },
    },
  ];
  // Escape "<" so the JSON can never close the <script> tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
}

function head() {
  const t = content.en;
  const og = abs(profile.ogImage);
  const tags = [
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${esc(t.meta.description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0d10" />`,
    `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eef2f6" />`,
    `<link rel="canonical" href="${SITE}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor('en')}" />`,
    `<link rel="alternate" hreflang="es" href="${urlFor('es')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}" />`,
    `<link rel="alternate" type="text/plain" title="llms.txt" href="${abs('llms.txt')}" />`,
    `<link rel="sitemap" type="application/xml" href="${abs('sitemap.xml')}" />`,
    `<link rel="me" href="${profile.linkedin}" />`,
    `<link rel="me" href="${profile.github}" />`,
    `<link rel="preload" as="image" type="image/webp" href="/${profile.photoWebp}" fetchpriority="high" />`,
    // Open Graph (LinkedIn, Facebook, Slack, WhatsApp, iMessage…)
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:url" content="${SITE}" />`,
    `<meta property="og:title" content="${esc(t.meta.title)}" />`,
    `<meta property="og:description" content="${esc(t.meta.description)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${profile.name} — ${t.role}`)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:locale:alternate" content="es_CO" />`,
    `<meta property="profile:first_name" content="${esc(firstName)}" />`,
    `<meta property="profile:last_name" content="${esc(lastName)}" />`,
    // X / Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.meta.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    // Structured data
    `<script type="application/ld+json">\n${jsonLd()}\n    </script>`,
  ];
  return tags.join('\n    ');
}

/* ------------------------------------------------------------------ */
/* Pre-rendered body (plain semantic HTML, English)                    */
/* ------------------------------------------------------------------ */

function body() {
  const t = content.en;
  const ui = t.ui;
  const heading = (p: [string, string, string]) => esc(p.join(''));
  const list = (items: string[]) => items.map((i) => `<li>${esc(i)}</li>`).join('');

  return `
      <div data-prerendered>
        <header>
          <nav aria-label="Sections">
            <a href="#about">${esc(ui.nav.about)}</a> · <a href="#experience">${esc(ui.nav.experience)}</a> ·
            <a href="#projects">${esc(ui.nav.projects)}</a> · <a href="#skills">${esc(ui.nav.skills)}</a> ·
            <a href="#contact">${esc(ui.nav.cta)}</a> · <a href="${urlFor('es')}" hreflang="es" lang="es">Español</a>
          </nav>
        </header>
        <main>
          <section id="top">
            <h1>${esc(profile.name)} — ${esc(t.role)}</h1>
            <p>${esc(t.headline)}</p>
            <img src="/${profile.photo}" alt="${esc(ui.hero.photoAlt)}" width="${profile.photoSize.width}" height="${profile.photoSize.height}" />
            <p>${esc(t.location)} · <a href="mailto:${profile.email}">${profile.email}</a> ·
              <a href="${profile.linkedin}" rel="me">LinkedIn</a> · <a href="${profile.github}" rel="me">GitHub</a></p>
            <p>${esc(ui.hero.nowBuilding)}: <a href="${t.current.url}">${esc(t.current.name)}</a> — ${esc(t.current.tagline)} (${esc(t.current.status)})</p>
            <ul>${t.stats.map((s) => `<li>${esc(s.value)} ${esc(s.label)}</li>`).join('')}</ul>
          </section>

          <section id="about">
            <h2>${heading(ui.sections.about)}</h2>
            ${t.about.map((p) => `<p>${esc(p)}</p>`).join('\n            ')}
            <h3>${esc(ui.sections.languages)}</h3>
            <ul>${t.languages.map((l) => `<li>${esc(l.name)} — ${esc(l.level)}</li>`).join('')}</ul>
          </section>

          <section id="experience">
            <h2>${heading(ui.sections.experience)}</h2>
            <p>${esc(ui.sections.experienceKicker)}</p>
            ${t.experience
              .map(
                (j) => `<article>
              <h3>${esc(j.role)} ${esc(ui.sections.at)} ${j.url ? `<a href="${j.url}">${esc(j.company)}</a>` : esc(j.company)}</h3>
              <p><time>${esc(j.period)}</time> · ${esc(j.location)}</p>
              <p>${esc(j.summary)}</p>
              <ul>${list(j.tags)}</ul>
            </article>`,
              )
              .join('\n            ')}
          </section>

          <section id="projects">
            <h2>${heading(ui.sections.projects)}</h2>
            ${t.projects
              .map(
                (p) => `<article>
              <h3>${p.url ? `<a href="${p.url}">${esc(p.title)}</a>` : esc(p.title)}</h3>
              <p>${esc(p.kind)} · ${esc(p.year)}</p>
              <p>${esc(p.description)}</p>
            </article>`,
              )
              .join('\n            ')}
          </section>

          <section id="skills">
            <h2>${heading(ui.sections.skills)}</h2>
            ${[...t.aiSkills, ...t.skills]
              .map(
                (g) => `<h3>${esc(g.group)}</h3>
            ${'blurb' in g ? `<p>${esc(g.blurb as string)}</p>` : ''}
            <ul>${list(g.items)}</ul>`,
              )
              .join('\n            ')}
            <h3>${esc(ui.sections.education)}</h3>
            <ul>${t.education.map((e) => `<li>${esc(e.title)} — ${esc(e.place)} (${esc(e.year)})</li>`).join('')}</ul>
            <h3>${esc(ui.sections.certifications)}</h3>
            <ul>${t.certifications.map((c) => `<li>${esc(c.title)} — ${esc(c.place)} (${esc(c.year)})</li>`).join('')}</ul>
          </section>

          <section id="contact">
            <h2>${heading(ui.contact.title)}</h2>
            <p>${esc(ui.contact.intro)}</p>
            <p><a href="mailto:${profile.email}">${profile.email}</a> · <a href="${profile.linkedin}">LinkedIn</a></p>
          </section>
        </main>
      </div>
    `;
}

/* ------------------------------------------------------------------ */
/* Files for crawlers and AI agents                                    */
/* ------------------------------------------------------------------ */

function robotsTxt() {
  // Explicitly welcome search engines and AI assistants/crawlers.
  const bots = [
    'Googlebot',
    'Bingbot',
    'DuckDuckBot',
    'Applebot',
    'Google-Extended',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'CCBot',
    'Meta-ExternalAgent',
  ];
  return [
    '# Search engines and AI agents are welcome to read and index this site.',
    ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${abs('sitemap.xml')}`,
    '',
  ].join('\n');
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = (['en', 'es'] as const)
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(urlFor(l))}" />`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}" />`)
    .join('\n');
  const entry = (loc: string) => `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(urlFor('en'))}
${entry(urlFor('es'))}
</urlset>
`;
}

/** Full profile as Markdown, in one language. */
function profileMarkdown(lang: Lang) {
  const t = content[lang];
  const ui = t.ui;
  const h = (p: [string, string, string]) => p.join('').trim();
  const out: string[] = [];
  out.push(`## ${h(ui.sections.about)}`, '', ...t.about.flatMap((p) => [p, '']));
  out.push(`**${ui.sections.languages}:** ${t.languages.map((l) => `${l.name} (${l.level})`).join(', ')}`, '');
  out.push(`## ${ui.hero.nowBuilding}: ${t.current.name}`, '', `${t.current.tagline} — ${t.current.status}. ${t.current.url}`, '');
  out.push(`## ${h(ui.sections.experience)}`, '');
  for (const j of t.experience) {
    out.push(`### ${j.role} — ${j.company}`, `*${j.period} · ${j.location}*${j.url ? ` · ${j.url}` : ''}`, '', j.summary, '', `\`${j.tags.join('` `')}\``, '');
  }
  out.push(`## ${h(ui.sections.projects)}`, '');
  for (const p of t.projects) out.push(`- **${p.title}** (${p.kind}, ${p.year}): ${p.description}${p.url ? ` ${p.url}` : ''}`);
  out.push('', `## ${h(ui.sections.skills)}`, '');
  for (const g of [...t.aiSkills, ...t.skills]) out.push(`- **${g.group}:** ${g.items.join(', ')}`);
  out.push('', `## ${ui.sections.education}`, '');
  for (const e of t.education) out.push(`- ${e.title} — ${e.place} (${e.year})`);
  out.push('', `## ${ui.sections.certifications}`, '');
  for (const c of t.certifications) out.push(`- ${c.title} — ${c.place} (${c.year})`);
  return out.join('\n');
}

function contactBlock() {
  return [
    `- Website: ${SITE} (Spanish: ${urlFor('es')})`,
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- GitHub: ${profile.github}`,
    `- Location: ${content.en.location}`,
  ].join('\n');
}

/** llms.txt — the short, link-oriented summary AI agents look for (https://llmstxt.org). */
function llmsTxt() {
  const t = content.en;
  return `# ${profile.name}

> ${t.meta.description}

${t.role}, based in ${t.location}. Currently founder of ${t.current.name} (${t.current.url}) — ${t.current.tagline}
Open to collaborations, engineering roles and consulting. The site is available in English and Spanish.

## Contact

${contactBlock()}

## Profile

- [Full profile (Markdown)](${abs('llms-full.txt')}): about, experience, projects, skills, education and certifications in English and Spanish
- [Portfolio website](${SITE}): interactive version of the same content
- [LinkedIn](${profile.linkedin}): professional history and recommendations
- [GitHub](${profile.github}): code

## Current work

${t.experience
  .slice(0, 2)
  .map((j) => `- ${j.role} — ${j.company} (${j.period}): ${j.summary}`)
  .join('\n')}

## Key skills

${[...t.aiSkills, ...t.skills].map((g) => `- ${g.group}: ${g.items.join(', ')}`).join('\n')}
`;
}

/** llms-full.txt — the complete content, both languages, for agents that want everything. */
function llmsFullTxt() {
  return `# ${profile.name}

> ${content.en.meta.description}

${contactBlock()}

---

# English

${content.en.headline}

${profileMarkdown('en')}

---

# Español

> ${content.es.meta.description}

${content.es.headline}

${profileMarkdown('es')}
`;
}

/* ------------------------------------------------------------------ */

export function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html.replace('<!--seo:head-->', head()).replace('<!--seo:body-->', body());
    },
    generateBundle() {
      const files: Record<string, string> = {
        'robots.txt': robotsTxt(),
        'sitemap.xml': sitemapXml(),
        'llms.txt': llmsTxt(),
        'llms-full.txt': llmsFullTxt(),
      };
      for (const [fileName, source] of Object.entries(files)) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
  };
}
