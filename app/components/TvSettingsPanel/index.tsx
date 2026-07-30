'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/ui/Button';
import Inline from '@/app/ui/Flexbox/Inline';
import Stack from '@/app/ui/Flexbox/Stack';
import { Input } from '@/app/ui/Input';
import Text from '@/app/ui/Text';
import {
  TV_DURATION_DEFAULT_MS,
  TV_DURATION_MAX_SECONDS,
  TV_DURATION_MIN_SECONDS,
  getTvDurationMs,
  setTvDurationSeconds,
} from '@/app/(auth)/tv/tvConfig';
import styles from './TvSettingsPanel.module.css';

export default function TvSettingsPanel() {
  const [seconds, setSeconds] = useState(TV_DURATION_DEFAULT_MS / 1000);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSeconds(getTvDurationMs() / 1000);
  }, []);

  function handleSave() {
    const value = Number(seconds);
    if (!Number.isFinite(value)) {
      return;
    }

    setTvDurationSeconds(value);
    setSeconds(
      Math.min(
        Math.max(Math.round(value), TV_DURATION_MIN_SECONDS),
        TV_DURATION_MAX_SECONDS,
      ),
    );
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Text as="h2" size="lg">
        Modo TV
      </Text>

        <Stack gap="sm">
          <label htmlFor="tv-duration">Tempo de exibição (s)</label>

          <Inline fillWidth>


          <Input
            fillWidth
            id="tv-duration"
            type="number"
            min={TV_DURATION_MIN_SECONDS}
            max={TV_DURATION_MAX_SECONDS}
            step={1}
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
          />
        <Button
          fillWidth
          icon="save" 
          onClick={handleSave} 
          // size="sm" 
          type="button" 
          // variant="text"
        >
          Salvar
        </Button>
            </Inline>
        </Stack>


        {saved ? (
          <Text as="p" size="sm">
            Salvo
          </Text>
        ) : null}
    </>
  );
}
