'use client';

import Cookies from 'js-cookie';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
}

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';
  private readonly TOKEN_EXPIRES_IN = 7; //days

  private setTokens(tokens: AuthTokens): void {
    const options = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      expires: this.TOKEN_EXPIRES_IN,
    };

    Cookies.set(this.ACCESS_TOKEN_KEY, tokens.accessToken, options);
    Cookies.set(this.REFRESH_TOKEN_KEY, tokens.refreshToken, options);
  }

  private clearTokens(): void {
    Cookies.remove(this.ACCESS_TOKEN_KEY);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
  }

  async login(tokens: AuthTokens, user: User): Promise<void> {
    this.setTokens(tokens);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  async logout(): Promise<void> {
    this.clearTokens();
    localStorage.removeItem(this.USER_KEY);
  }

  getAccessToken(): string | null {
    return Cookies.get(this.ACCESS_TOKEN_KEY) || null;
  }

  getRefreshToken(): string | null {
    return Cookies.get(this.REFRESH_TOKEN_KEY) || null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();
