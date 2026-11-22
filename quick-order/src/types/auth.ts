export interface LoginRequest {
  // restaurante: string;
  login: string;
  senha: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  deveTrocarPin: boolean;
}