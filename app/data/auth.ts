import { CARDAPIO_CLIENT_ID, centralFetch } from "./apiClient";
import { AuthModule, AuthUser, LoginResponse } from "./auth.type";

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

type ApiAuthUser = Omit<AuthUser, "modules"> & {
  modules: ApiAuthModule[];
};

function moduleIconSrc(iconKey?: string | null) {
  if (!iconKey || !/^[a-z0-9_-]+$/i.test(iconKey)) return undefined;
  return `/icons/${iconKey}.svg`;
}

function toAuthModules(modules: ApiAuthModule[]): AuthModule[] {
  return modules
    .filter((m) => Boolean(m.path))
    .map((m) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      href: m.path as string,
      icon: moduleIconSrc(m.iconKey),
      appId: m.appId,
      appSlug: m.appSlug,
      appName: m.appName,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
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
