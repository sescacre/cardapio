"use client";

import { useEffect } from "react";
import { Button } from "@/app/ui/Button";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ERROR BOUNDARY", error);
  }, [error]);

  return (
    <div className={styles.page}>
      <h1>Algo deu errado</h1>
      <p>{error.message || "Não foi possível carregar esta página. Tente novamente."}</p>
      <div className={styles.actions}>
        <Button onClick={reset} type="button">
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
