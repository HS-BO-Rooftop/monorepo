import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

export const ACCESS_TOKEN_KEY = 'rooftop_access_token';
export const REFRESH_TOKEN_KEY = 'rooftop_refresh_token';
export const REFRESH_TOKEN_EXPIRATION_KEY = 'rooftop_refresh_token_expiration';
export const ACCESS_TOKEN_EXPIRATION_KEY = 'rooftop_access_token_expiration';

export type SetTokenPair = {
  accessToken: string;
  accessTokenExpiration: Date;
  refreshToken: string;
  refreshTokenExpiration: Date;
};

export type TokenPair = Partial<SetTokenPair>;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  get tokenPair(): TokenPair {
    const refreshTokenValue = this.refreshToken;
    const refreshTokenExpiration = localStorage.getItem(
      REFRESH_TOKEN_EXPIRATION_KEY
    );
    const accessTokenValue = this.accessToken;
    const accessTokenExpiration = sessionStorage.getItem(
      ACCESS_TOKEN_EXPIRATION_KEY
    );

    // Since the expiration is stored as a unix timestamp, we need to convert it to a Date object.
    const refreshTokenExpirationDate = refreshTokenExpiration
      ? dayjs.unix(parseInt(refreshTokenExpiration, 10)).toDate()
      : undefined;
    const accessTokenExpirationDate = accessTokenExpiration
      ? dayjs.unix(parseInt(accessTokenExpiration, 10)).toDate()
      : undefined;

    return {
      accessToken: accessTokenValue ?? undefined,
      refreshToken: refreshTokenValue ?? undefined,
      accessTokenExpiration: accessTokenExpirationDate,
      refreshTokenExpiration: refreshTokenExpirationDate,
    };
  }

  public saveTokenPair(tokenPair: SetTokenPair): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokenPair.refreshToken);
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRATION_KEY,
      dayjs(tokenPair.refreshTokenExpiration).unix().toString()
    );

    sessionStorage.setItem(ACCESS_TOKEN_KEY, tokenPair.accessToken);
    sessionStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      dayjs(tokenPair.accessTokenExpiration).unix().toString()
    );
  }

  get accessToken(): string | undefined {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined;
  }

  get refreshToken(): string | undefined {
    return localStorage.getItem(REFRESH_TOKEN_KEY) ?? undefined;
  }

  get accessTokenExpired(): boolean {
    const accessTokenExpiration = sessionStorage.getItem(
      ACCESS_TOKEN_EXPIRATION_KEY
    );
    if (accessTokenExpiration === null) {
      return true;
    }

    const accessTokenExpirationDate = dayjs.unix(
      parseInt(accessTokenExpiration, 10)
    );
    return accessTokenExpirationDate.isBefore(dayjs());
  }

  get refreshTokenExpired(): boolean {
    const refreshTokenExpiration = localStorage.getItem(
      REFRESH_TOKEN_EXPIRATION_KEY
    );
    if (refreshTokenExpiration === null) {
      return true;
    }

    const refreshTokenExpirationDate = dayjs.unix(
      parseInt(refreshTokenExpiration, 10)
    );
    return refreshTokenExpirationDate.isBefore(dayjs());
  }
}
