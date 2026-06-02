import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiUrl } from '../lib/apiUrl';

export interface AuthUser {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

interface AuthCtx {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login(username: string, password: string): Promise<void>;
  register(username: string, password: string): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthCtx | null>(null);

const TOKEN_KEY = 'bv_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [token,   setToken]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaura sessão ao montar
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) { setLoading(false); return; }

    fetch(apiUrl.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${stored}` },
      body: JSON.stringify({ action: 'verify' }),
    })
      .then(r => r.json())
      .then(json => {
        if (json.ok) {
          setUser(json.user as AuthUser);
          setToken(stored);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => { localStorage.removeItem(TOKEN_KEY); })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res  = await fetch(apiUrl.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', username, password }),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error ?? 'Erro ao fazer login');
    localStorage.setItem(TOKEN_KEY, json.token);
    setToken(json.token);
    setUser(json.user as AuthUser);
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const res  = await fetch(apiUrl.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', username, password }),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error ?? 'Erro ao criar conta');
    localStorage.setItem(TOKEN_KEY, json.token);
    setToken(json.token);
    setUser(json.user as AuthUser);
  }, []);

  const logout = useCallback(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      fetch(apiUrl.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
        body: JSON.stringify({ action: 'logout' }),
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
