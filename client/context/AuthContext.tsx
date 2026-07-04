import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/lib/api";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: "JOB_SEEKER" | "EMPLOYER";
  phone?: string;
  companyName?: string;
  companyRegNumber?: string;
  companyDescription?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  // Restore token on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync(TOKEN_KEY);
        if (stored) {
          api.setToken(stored);
          const res = await api.auth.me();
          setState({ user: res.user, token: stored, isLoading: false });
        } else {
          setState((s) => ({ ...s, isLoading: false }));
        }
      } catch {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        api.setToken(null);
        setState({ user: null, token: null, isLoading: false });
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.auth.login({ email, password });
    await SecureStore.setItemAsync(TOKEN_KEY, res.token);
    api.setToken(res.token);
    setState({ user: res.user, token: res.token, isLoading: false });
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await api.auth.register(data);
    await SecureStore.setItemAsync(TOKEN_KEY, res.token);
    api.setToken(res.token);
    setState({ user: res.user, token: res.token, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    api.setToken(null);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.auth.me();
      setState((s) => ({ ...s, user: res.user }));
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
