import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { content, type Content, type Lang } from './data';

type LangState = { lang: Lang; t: Content; setLang: (l: Lang) => void; toggle: () => void };

const LangContext = createContext<LangState | null>(null);

function initialLang(): Lang {
  const fromDom = document.documentElement.lang;
  if (fromDom === 'en' || fromDom === 'es') return fromDom;
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const meta = content[lang].meta;
    document.documentElement.lang = lang;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:locale"]', lang === 'es' ? 'es_CO' : 'en_AU');

    // Each language has its own address (?lang=es) so search engines can index both.
    const url = new URL(window.location.href);
    const wanted = lang === 'es' ? 'es' : null;
    if (url.searchParams.get('lang') !== wanted) {
      if (wanted) url.searchParams.set('lang', wanted);
      else url.searchParams.delete('lang');
      window.history.replaceState(null, '', url);
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const c = new URL(canonical.href);
      c.search = lang === 'en' ? '' : '?lang=es';
      canonical.href = c.toString();
    }

    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage unavailable — language still works for this visit */
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), []);
  const value = useMemo(() => ({ lang, t: content[lang], setLang, toggle }), [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
