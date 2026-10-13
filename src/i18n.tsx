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
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
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

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
