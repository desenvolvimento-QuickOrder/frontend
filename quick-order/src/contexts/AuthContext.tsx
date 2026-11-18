import { createContext, useContext, useState, type ReactNode } from "react";
import { login as loginRequest } from "../services/authService";
import type { LoginRequest, TokenResponse } from "../types/auth";

const STORAGE_KEY = "quickorder.auth";

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  roles: string[];
  isAdmin: boolean;
  signIn: (data: LoginRequest) => Promise<TokenResponse>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function decodeRoles(token: string): string[] {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const roles = JSON.parse(json).roles;
    return Array.isArray(roles) ? roles : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession);

  async function signIn(data: LoginRequest) {
    const tokens = await loginRequest(data);
    const newSession = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return tokens;
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }

  const roles = session ? decodeRoles(session.accessToken) : [];

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        roles,
        isAdmin: roles.includes("ADMIN"),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}