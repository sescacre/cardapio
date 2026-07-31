import { CARDAPIO_CLIENT_ID, centralFetch } from "./apiClient";
import { AuthModule, LoginResponse } from "./auth.type";

type ApiAuthModule = {
  id: string;
  name: string;
  slug: string;
  path: string | null;
  iconKey: string | null;
  appId: string;
  appSlug: string;
  appName: string;
};

type ApiAuthUser = {
  id: string;
  name: string;
  cpf: string;
  isAdmin: boolean;
  active: boolean;
  modules: ApiAuthModule[];
  sessionId?: string;
  expiresAt?: string;
};

function toAuthModules(modules: ApiAuthModule[]): AuthModule[] {
  return modules.map((m) => ({
    id: m.id,
    name: m.name,
    slug: m.slug,
    appSlug: m.appSlug,
  }));
}

export async function login(cpf: string, password: string) {
  console.log("💿 DAL - LOGIN");

  return centralFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      cpf,
      password,
      clientId: CARDAPIO_CLIENT_ID,
    }),
  });
}

export async function logout() {
  console.log("💿 DAL - LOGOUT");

  return centralFetch<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}

export async function getMe() {
  console.log("💿 DAL - GET ME");

  const me = await centralFetch<ApiAuthUser>("/api/auth/me?appSlug=cardapio");

  return {
    ...me,
    modules: toAuthModules(me.modules ?? []),
  };
}

export function userHasAnyCardapioModule(user: {
  isAdmin: boolean;
  modules: AuthModule[] | "all";
}): boolean {
  if (user.isAdmin) return true;
  if (user.modules === "all") return true;
  return user.modules.some((module) => module.appSlug === "cardapio");
}

export function userHasModule(
  user: {
    isAdmin: boolean;
    modules: AuthModule[] | "all";
  },
  moduleSlug: string,
): boolean {
  if (user.isAdmin) return true;
  if (user.modules === "all") return true;
  return user.modules.some(
    (module) => module.slug === moduleSlug && module.appSlug === "cardapio",
  );
}

/** @deprecated Prefer userHasModule("controle") or userHasAnyCardapioModule */
export function userHasControleModule(user: {
  isAdmin: boolean;
  modules: AuthModule[] | "all";
}): boolean {
  return userHasModule(user, "controle");
}
