import { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

// ─── Vídeo de introdução (YouTube, começa sozinho) ───────────────────────────
// Começa sozinho e SEM som; o usuário liga o áudio pelo botão "Ativar som"
// (ou pelos controles do próprio player).
// Vídeo padrão (Devocional, Pregação, Família etc.); cada página pode passar outro via props
const VIDEO_INTRO_ID = 'cjLoSgCJF6Y';
const VIDEO_INTRO_INICIO = 3; // segundos (t=3s)

type YTPlayer = {
  playVideo(): void; mute(): void; unMute(): void; setVolume(v: number): void;
  getPlayerState(): number; destroy(): void;
};
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: object) => YTPlayer; PlayerState: { PLAYING: number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function carregarApiYouTube(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise(resolve => {
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { anterior?.(); resolve(); };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });
}

export default function VideoIntro({ pt, videoId = VIDEO_INTRO_ID, inicio = VIDEO_INTRO_INICIO }: { pt: boolean; videoId?: string; inicio?: number }) {
  const alvoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [mudo, setMudo] = useState(true);

  const ativarSom = () => {
    const pl = playerRef.current;
    if (!pl) return;
    pl.unMute();
    pl.setVolume(100);
    pl.playVideo();
    setMudo(false);
  };

  useEffect(() => {
    let cancelado = false;

    carregarApiYouTube().then(() => {
      if (cancelado || !alvoRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(alvoRef.current, {
        videoId,
        playerVars: { autoplay: 1, mute: 1, start: inicio, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
          },
        },
      });
    });

    return () => {
      cancelado = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-3 bg-gradient-to-br from-brand-blue/25 via-brand-purple/20 to-brand-rose/25 blur-2xl rounded-[2rem] -z-10" />
      <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.55)] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full">
        <div ref={alvoRef} title={pt ? 'Bíblia Visual Expositiva — Introdução' : 'Visual Expository Bible — Introduction'} />
        {mudo && (
          <button
            type="button"
            onClick={ativarSom}
            className="absolute right-3 bottom-14 md:right-5 md:bottom-16 inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-brand-blue text-white text-xs md:text-sm font-black uppercase tracking-wider shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-white hover:text-brand-blue transition-colors animate-pulse"
          >
            <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
            {pt ? 'Ativar som' : 'Turn on sound'}
          </button>
        )}
      </div>
    </div>
  );
}
