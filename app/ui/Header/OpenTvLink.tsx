'use client';

import type { MouseEvent } from 'react';

type OpenTvLinkProps = {
  className?: string;
};

export default function OpenTvLink({ className }: OpenTvLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.open('/tv', '_blank', 'noopener,noreferrer');
  }

  return (
    <a href="/tv" className={className} onClick={handleClick}>
      Modo TV
    </a>
  );
}
