"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GLOBAL ERROR BOUNDARY", error);
  }, [error]);

  return (
    <html lang="pt-br">
      <body>
        <div className={styles.page}>
          <h1>Algo deu errado</h1>
          <p>
            {error.message ||
              "Não foi possível carregar esta página. Tente novamente."}
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={reset}>
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
