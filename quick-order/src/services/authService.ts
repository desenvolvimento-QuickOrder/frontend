import type { LoginRequest, TokenResponse } from "../types/auth";

const API_URL = import.meta.env.VITE_API_JAVA_URL ?? "http://localhost:8080";
const USE_MOCK = import.meta.env.VITE_AUTH_MOCK === "true";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      accessToken: "token-de-teste",
      refreshToken: "refresh-de-teste",
      tokenType: "Bearer",
      expiresIn: 900,
      deveTrocarPin: false,
    };
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),

    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar à API.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError(401, "Restaurante, login ou senha inválidos.");
    }
    if (response.status === 429) {
      throw new ApiError(429, "Muitas tentativas. Aguarde um pouco.");
    }
    if (response.status === 400) {
      throw new ApiError(400, "Dados inválidos. Confira os campos.");
    }
    throw new ApiError(response.status, "Erro ao fazer login.");
  }

  return response.json();
}