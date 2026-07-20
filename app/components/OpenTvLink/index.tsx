'use client';

import { Button } from '@/app/ui/Button';

export default function OpenTvLink() {
  function handleClick() {
    window.open('/tv', '_blank', 'noopener,noreferrer');
  }

  return (
    <Button icon="tv" onClick={handleClick} type="button">
      Modo TV
    </Button>
  );
}
