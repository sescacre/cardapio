"use server";

import { login, userHasAnyCardapioModule } from "@/app/data/auth";
import { SESSION_COOKIE } from "@/app/data/apiClient";
import { isApiClientError, toUserMessage } from "@/app/data/apiErrors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginActionState = {
  error?: string;
} | null;

export async function loginAction(
  previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  console.log("🔁 ACTION - LOGIN");

  const cpf = String(formData.get("cpf") ?? "").replace(/\D/g, "");
  const password = String(formData.get("password") ?? "");

  try {
    const result = await login(cpf, password);

    if (!userHasAnyCardapioModule(result.user)) {
      return {
        error:
          "Sem permissão para módulos do Cardápio. Solicite acesso a um administrador.",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, result.sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(result.expiresAt),
    });
  } catch (error) {
    if (isApiClientError(error) && error.code === "CREDENTIALS") {
      return { error: "CPF ou senha inválidos" };
    }
    return { error: toUserMessage(error) };
  }

  redirect("/painel");
}
