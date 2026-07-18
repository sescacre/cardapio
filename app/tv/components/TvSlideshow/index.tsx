'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { valueToCurrency } from '@/app/utils/dataFormat';
import { getTvPlaylistAction } from '@/app/tv/actions';
import type { TvSlide } from '@/app/tv/buildTvPlaylist';
import { getTvDurationMs, TV_POLL_INTERVAL_MS } from '@/app/tv/tvConfig';
import styles from './TvSlideshow.module.css';

const ITEMS_PER_PAGE = 4;
const EXIT_MS = 450;
const ENTER_MS = 450;

type TvSlideshowProps = {
  slides: TvSlide[];
};

type AnimPhase = 'enter' | 'idle' | 'exit';

function formatClock(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Rio_Branco',
  });
}

function chunkSlides(slides: TvSlide[], size: number): TvSlide[][] {
  const pages: TvSlide[][] = [];
  for (let i = 0; i < slides.length; i += size) {
    pages.push(slides.slice(i, i + size));
  }
  return pages;
}

function slidesSignature(slides: TvSlide[]): string {
  return slides
    .map(
      (slide) =>
        [
          slide.item.id,
          slide.categoryName,
          slide.item.name,
          slide.item.description ?? '',
          slide.item.comerciarioPrice,
          slide.item.publicoPrice,
          slide.item.visible,
        ].join(':'),
    )
    .join('|');
}

function ItemCard({ slide }: { slide: TvSlide }) {
  return (
    <article className={styles.itemCard}>
      <div className={styles.chip}>{slide.categoryName}</div>
      <h2 className={styles.pratoNome}>{slide.item.name}</h2>
      {slide.item.description ? (
        <p className={styles.pratoDesc}>{slide.item.description}</p>
      ) : null}
      <div className={styles.precos}>
        <div className={styles.precoLinha}>
          <span className={styles.precoLabel}>Comerciário</span>
          <span className={styles.precoValor}>
            {valueToCurrency(Number(slide.item.comerciarioPrice))}
          </span>
        </div>
        <div className={styles.precoLinha}>
          <span className={styles.precoLabel}>Público Geral</span>
          <span className={styles.precoValor}>
            {valueToCurrency(Number(slide.item.publicoPrice))}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function TvSlideshow({ slides: initialSlides }: TvSlideshowProps) {
  const [slides, setSlides] = useState(initialSlides);
  const pages = useMemo(() => chunkSlides(slides, ITEMS_PER_PAGE), [slides]);
  const pageCount = pages.length;

  const [pageIndex, setPageIndex] = useState(0);
  const [progressMs, setProgressMs] = useState(0);
  const [durationMs, setDurationMs] = useState(getTvDurationMs);
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const [phase, setPhase] = useState<AnimPhase>('enter');

  const transitioning = useRef(false);
  const pageCountRef = useRef(pageCount);
  pageCountRef.current = pageCount;

  const currentPage = pages[pageIndex] ?? [];

  function goNext() {
    if (!pageCountRef.current) {
      return;
    }

    transitioning.current = false;
    setPageIndex((current) => (current + 1) % pageCountRef.current);
    setProgressMs(0);
    setPhase('enter');
  }

  function goPrev() {
    if (!pageCountRef.current) {
      return;
    }

    transitioning.current = false;
    setPageIndex(
      (current) =>
        (current - 1 + pageCountRef.current) % pageCountRef.current,
    );
    setProgressMs(0);
    setPhase('enter');
  }

  function sair() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.close();
    window.location.href = '/';
  }

  useEffect(() => {
    setDurationMs(getTvDurationMs());
  }, []);

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.requestFullscreen?.().catch(() => {});

    return () => {
      document.body.style.overflow = '';
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const nextSlides = await getTvPlaylistAction();
        if (cancelled) {
          return;
        }

        setSlides((current) => {
          if (slidesSignature(current) === slidesSignature(nextSlides)) {
            return current;
          }
          return nextSlides;
        });
      } catch {
        // Mantém a playlist atual se o poll falhar.
      }
    };

    const id = window.setInterval(poll, TV_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    setPageIndex((current) => {
      if (!pageCount) {
        return 0;
      }
      return current >= pageCount ? 0 : current;
    });
  }, [pageCount]);

  useEffect(() => {
    if (phase !== 'enter') {
      return;
    }

    const id = window.setTimeout(() => setPhase('idle'), ENTER_MS);
    return () => window.clearTimeout(id);
  }, [phase, pageIndex]);

  useEffect(() => {
    if (!pageCount || phase !== 'idle') {
      return;
    }

    let elapsed = 0;
    setProgressMs(0);
    transitioning.current = false;

    const id = window.setInterval(() => {
      if (transitioning.current) {
        return;
      }

      elapsed += 80;
      setProgressMs(elapsed);

      if (elapsed >= durationMs) {
        transitioning.current = true;
        setProgressMs(durationMs);
        setPhase('exit');
      }
    }, 80);

    return () => window.clearInterval(id);
  }, [durationMs, pageCount, phase, pageIndex]);

  useEffect(() => {
    if (phase !== 'exit' || !pageCount) {
      return;
    }

    const id = window.setTimeout(() => {
      setPageIndex((current) => (current + 1) % pageCount);
      setProgressMs(0);
      setPhase('enter');
      transitioning.current = false;
    }, EXIT_MS);

    return () => window.clearTimeout(id);
  }, [phase, pageCount]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        sair();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // goNext/goPrev usam refs + setState funcional; rebind a cada mount basta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = (
    <div className={styles.barra}>
      <div className={styles.logo}>
        <div>
          <div className={styles.nomeRest}>Sesc Acre</div>
          <div className={styles.subRest}>Cardápio Digital</div>
        </div>
      </div>
      <div className={styles.relogio} aria-live="polite">
        {clock}
      </div>
    </div>
  );

  if (!pageCount) {
    return (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Modo TV">
        {header}
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nenhum item disponível</p>
          <p className={styles.emptyText}>
            Cadastre categorias e itens visíveis no painel para exibir o cardápio no Modo TV.
          </p>
          <button type="button" className={styles.btnSair} onClick={sair} aria-label="Sair do Modo TV">
            ✕
          </button>
        </div>
      </div>
    );
  }

  const progressPct = Math.min((progressMs / durationMs) * 100, 100);
  const animClass =
    phase === 'exit' ? styles.pageExit : phase === 'enter' ? styles.pageEnter : styles.pageIdle;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Modo TV — Cardápio em exibição"
    >
      {header}

      <div className={`${styles.corpo} ${animClass}`}>
        {currentPage.map((slide) => (
          <ItemCard key={`${pageIndex}-${slide.item.id}`} slide={slide} />
        ))}
      </div>

      <div className={styles.rodape}>
        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
        </div>
        <span className={styles.slideNum}>
          {pageIndex + 1} / {pageCount}
        </span>
        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.btnNav}
            onClick={goPrev}
            aria-label="Página anterior (seta esquerda)"
            title="Anterior (←)"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.btnNav}
            onClick={goNext}
            aria-label="Próxima página (seta direita)"
            title="Próxima (→)"
          >
            ›
          </button>
          <button
            type="button"
            className={styles.btnSair}
            onClick={sair}
            aria-label="Sair do Modo TV (ESC)"
            title="Sair (ESC)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
