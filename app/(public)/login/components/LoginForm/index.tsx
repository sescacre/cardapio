"use client";

import { Button } from "@/app/ui/Button";
import { Input } from "@/app/ui/Input";
import Form from "next/form";
import { useActionState } from "react";
import { loginAction } from "../../actions";
import Stack from "@/app/ui/Flexbox/Stack";
import styles from "./LoginForm.module.css";

export function LoginForm({ initialError }: { initialError?: string }) {
  const [state, action, isPending] = useActionState(loginAction, null);
  const error = state?.error ?? initialError;

  return (
    <Form action={action} className={styles.loginForm}>
      <Stack gap="md">
        <Stack fillWidth>
          <label htmlFor="cpf">CPF</label>

          <Input
            fillWidth
            id="cpf"
            mask="cpf"
            name="cpf"
            required
            type="text"
            inputMode="numeric"
            autoComplete="username"
            placeholder="000.000.000-00"
          />

          {error ? (
            <p className="sm clr-text-light">
              <b>{error}</b>
            </p>
          ) : null}
        </Stack>

        <Stack fillWidth>
          <label htmlFor="password">Senha</label>

          <Input
            fillWidth
            id="password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
          />
        </Stack>

        <Button fillWidth type="submit" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </Stack>
    </Form>
  );
}
