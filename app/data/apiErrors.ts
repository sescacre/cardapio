export type ApiErrorCode =
  | "CONFIG"
  | "API_KEY"
  | "UNAUTHENTICATED"
  | "CREDENTIALS"
  | "FORBIDDEN"
  | "SERVER_CONFIG"
  | "NETWORK"
  | "UNKNOWN";

export class ApiClientError extends Error {
  status: number | null;
  code: ApiErrorCode;

  constructor(
    message: string,
    options?: { status?: number | null; code?: ApiErrorCode },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = options?.status ?? null;
    this.code = options?.code ?? "UNKNOWN";
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError ||
    (error instanceof Error && error.name === "ApiClientError");
}

export function toUserMessage(error: unknown): string {
  if (isApiClientError(error)) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export function mapApiError(
  status: number,
  apiMessage?: string,
): ApiClientError {
  const message = apiMessage?.trim() || "";

  if (status === 401) {
    if (/api key/i.test(message) || /API key/i.test(message)) {
      return new ApiClientError(
        "Chave da API inválida ou ausente. Verifique API_CENTRAL_KEY desta aplicação.",
        { status, code: "API_KEY" },
      );
    }
    if (/cpf ou senha/i.test(message)) {
      return new ApiClientError("CPF ou senha inválidos", {
        status,
        code: "CREDENTIALS",
      });
    }
    if (
      /não autenticado/i.test(message) ||
      /sessão/i.test(message) ||
      /nao autenticado/i.test(message)
    ) {
      return new ApiClientError(
        "Sessão inválida ou expirada. Faça login novamente.",
        { status, code: "UNAUTHENTICATED" },
      );
    }
    return new ApiClientError(
      message || "Não autorizado. Verifique autenticação e API_CENTRAL_KEY desta aplicação.",
      { status, code: "UNAUTHENTICATED" },
    );
  }

  if (status === 403) {
    return new ApiClientError(
      message || "Sem permissão para este recurso.",
      { status, code: "FORBIDDEN" },
    );
  }

  if (status >= 500) {
    if (/API_CENTRAL_KEY/i.test(message)) {
      return new ApiClientError(
        "API Central sem chave configurada no servidor.",
        { status, code: "SERVER_CONFIG" },
      );
    }
    return new ApiClientError(
      message || "Erro interno na API Central. Tente novamente.",
      { status, code: "UNKNOWN" },
    );
  }

  return new ApiClientError(
    message || "Erro na comunicação com a API Central.",
    { status, code: "UNKNOWN" },
  );
}
