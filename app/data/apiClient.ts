import { cookies } from "next/headers";
import { ApiClientError, mapApiError } from "./apiErrors";

const API_URL = process.env.API_CENTRAL_URL;
const API_KEY = process.env.API_CENTRAL_KEY;
export const CARDAPIO_CLIENT_ID = process.env.CARDAPIO_CLIENT_ID ?? "cardapio";
export const SESSION_COOKIE = "cardapio_sessionId";

export async function centralFetch<T>(endpoint: string, init?: RequestInit) {
  console.log("CENTRAL FETCH", `${API_URL}${endpoint}`);

  if (!API_URL) {
    throw new ApiClientError("URL da API Central não configurada", {
      code: "CONFIG",
    });
  }

  if (!API_KEY) {
    throw new ApiClientError(
      "API_CENTRAL_KEY não configurada neste app (use a key gerada no painel Aplicações)",
      { code: "CONFIG" },
    );
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(sessionId ? { Authorization: `Bearer ${sessionId}` } : {}),
        ...init?.headers,
        "X-Api-Key": API_KEY,
      },
    });
  } catch {
    throw new ApiClientError(
      "Não foi possível conectar à API Central. Verifique se ela está no ar e a URL.",
      { code: "NETWORK" },
    );
  }

  if (!response.ok) {
    let apiMessage: string | undefined;
    try {
      const body = await response.json();
      if (body?.error) apiMessage = String(body.error);
    } catch {
      // ignore
    }
    throw mapApiError(response.status, apiMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
