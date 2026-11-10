import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export type Lang = 'pt' | 'en';

const LanguageContext = createContext<[Lang, Dispatch<SetStateAction<Lang>>] | null>(null);
const STORAGE_KEY = 'bv-lang';

function idiomaSalvo(): Lang {
  try { return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'pt'; } catch { return 'pt'; }
}

/* ─── Tradução automática (Google Translate) ───────────────────────────
   Páginas com textos próprios em inglês usam `lang` direto; o restante do
   conteúdo (escrito só em português) é traduzido dinamicamente no navegador. */
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

let scriptCarregado = false;

function carregarTradutor() {
  if (scriptCarregado) return;
  scriptCarregado = true;
  const alvo = document.createElement('div');
  alvo.id = 'google_translate_element';
  alvo.style.display = 'none';
  document.body.appendChild(alvo);
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'pt', includedLanguages: 'en,pt', autoDisplay: false },
      'google_translate_element',
    );
  };
  const s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

function definirCookie(valor: string | null) {
  const exp = valor ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const v = valor ?? '';
  document.cookie = `googtrans=${v}; path=/${exp}`;
  document.cookie = `googtrans=${v}; path=/; domain=${location.hostname}${exp}`;
}

function aplicarTraducao(lang: Lang, tentativas = 40) {
  definirCookie(lang === 'en' ? '/pt/en' : null);
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!combo) {
    if (lang === 'en' && tentativas > 0) setTimeout(() => aplicarTraducao(lang, tentativas - 1), 250);
    return;
  }
  combo.value = lang;
  combo.dispatchEvent(new Event('change'));
  // Voltar ao original nem sempre funciona pelo seletor; nesse caso recarrega (cookie já limpo).
  if (lang === 'pt') {
    setTimeout(() => {
      if (document.documentElement.classList.contains('translated-ltr')) location.reload();
    }, 800);
  }
}

/* O tradutor troca nós de texto por <font>; sem isto o React quebra ao atualizar a página traduzida. */
function protegerDomContraTradutor() {
  const proto = Node.prototype as any;
  if (proto.__bvProtegido) return;
  proto.__bvProtegido = true;
  const removeChild = proto.removeChild;
  proto.removeChild = function (child: Node) {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child);
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function (node: Node, ref: Node | null) {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const estado = useState<Lang>(idiomaSalvo);
  const [lang] = estado;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* sem armazenamento */ }
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    if (lang === 'en') {
      protegerDomContraTradutor();
      carregarTradutor();
    }
    if (scriptCarregado) aplicarTraducao(lang);
  }, [lang]);

  return <LanguageContext.Provider value={estado}>{children}</LanguageContext.Provider>;
}

/** Idioma global do site: `const [lang, setLang] = useLanguage();` */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage precisa estar dentro de <LanguageProvider>');
  return ctx;
}
