import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable, combineLatest, map, mergeMap, shareReplay, tap, throwError } from 'rxjs';
import { TokenPairDto } from './app/api/models';
import { AuthService } from './app/api/services';

export type AccessTokenContent = {
  sub: string;
  clientId: string;
  exp: number;
  isAdmin: boolean;
  name: string;
};

export type RefreshTokenContent = {
  sub: string;
  clientId: string;
  exp: number;
};

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  private _accessToken$ = new BehaviorSubject<string | null>(null);
  private _refreshToken$ = new BehaviorSubject<string | null>(null);
  private _accessTokenExpiration$ = new BehaviorSubject<Date | null>(null);
  private _refreshTokenExpiration$ = new BehaviorSubject<Date | null>(null);

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
    this._accessToken$.next(token);
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem('refresh_token', token);
    } else {
      localStorage.removeItem('refresh_token');
    }
    this._refreshToken$.next(token);
    this._refreshTokenExpiration$.next(token ? this.refreshTokenExpiration : null);
  }

  get accessTokenExpiration(): Date | null {
    const expiration = localStorage.getItem('access_token_expiration');
    return expiration ? new Date(expiration) : null;
  }

  set accessTokenExpiration(expiration: Date | null) {
    if (expiration) {
      localStorage.setItem('access_token_expiration', expiration.toISOString());
    } else {
      localStorage.removeItem('access_token_expiration');
    }
    this._accessTokenExpiration$.next(expiration);
  }

  get refreshTokenExpiration(): Date | null {
    const expiration = localStorage.getItem('refresh_token_expiration');
    return expiration ? new Date(expiration) : null;
  }

  set refreshTokenExpiration(expiration: Date | null) {
    if (expiration) {
      localStorage.setItem(
        'refresh_token_expiration',
        expiration.toISOString()
      );
    } else {
      localStorage.removeItem('refresh_token_expiration');
    }
    this._refreshTokenExpiration$.next(expiration);
  }

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  private _accessTokenContent: AccessTokenContent | null = null;

  get userId(): string | null {
    if (!this.accessToken) {
      return null;
    }

    if (!this._accessTokenContent) {
      this._accessTokenContent = jwt_decode<AccessTokenContent>(this.accessToken);
    }

    return this._accessTokenContent.sub;
  }

  get userName(): string | null {
    if (!this.accessToken) {
      return null;
    }

    if (!this._accessTokenContent) {
      this._accessTokenContent = jwt_decode<AccessTokenContent>(this.accessToken);
    }

    return this._accessTokenContent.name;
  }

  get isAdmin(): boolean {
    if (!this.accessToken) {
      return false;
    }

    if (!this._accessTokenContent) {
      this._accessTokenContent = jwt_decode<AccessTokenContent>(this.accessToken);
    }

    return this._accessTokenContent.isAdmin;
  }

  constructor(private readonly _loginApi: AuthService) {
    this.checkIfAuthenticated();
    this._loadTokensFromLocalStorage();
  }

  public checkIfAuthenticated(): void {
    combineLatest([
      this._accessToken$,
      this._refreshToken$,
      this._accessTokenExpiration$,
      this._refreshTokenExpiration$,
    ]).pipe(
      map(([accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration]) => {
        const now = new Date();
        const isCurrentlyAuthenticated = 
          !!accessToken &&
          !!refreshToken &&
          !!accessTokenExpiration &&
          !!refreshTokenExpiration &&
          accessTokenExpiration > now &&
          refreshTokenExpiration > now
        ;

        if (isCurrentlyAuthenticated) {
          return true;
        }

        // If the user is not currently authenticated, we need to check if the refresh token is still valid
        // If it is, we can use it to get a new access token
        if (refreshTokenExpiration && refreshTokenExpiration > now) {
          return this.doTokenRefresh().pipe(
            map(() => true),
          );
        }

        return false;
      }),
      // If the map function returns a boolean, we need to wrap it in an observable
      mergeMap((value) => {
        if (value instanceof Observable) {
          return value;
        }

        return [value];
      }),
      shareReplay(1)
    ).subscribe((isAuthenticated) => {
      this._isAuthenticated$.next(isAuthenticated);
    });
  }

  private _loadTokensFromLocalStorage(): void {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const accessTokenExpiration = localStorage.getItem(
      'access_token_expiration'
    );
    const refreshTokenExpiration = localStorage.getItem(
      'refresh_token_expiration'
    );

    if (
      accessToken &&
      refreshToken &&
      accessTokenExpiration &&
      refreshTokenExpiration
    ) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.accessTokenExpiration = new Date(accessTokenExpiration);
      this.refreshTokenExpiration = new Date(refreshTokenExpiration);
    }
  }


  public login(email: string, password: string, clientId: string = '66bfb8e6-d32d-45aa-8e08-da30a9830936'): Observable<TokenPairDto> {
    return this._loginApi
      .authControllerLogin({
        body: {
          email,
          password,
          clientId,
        },
      })
      .pipe(tap((tokenPair) => {
        this.handleTokenResposne(tokenPair);
      }));
  }

  private handleTokenResposne(tokenPair: TokenPairDto) {
    this.accessToken = tokenPair.access_token;
    this.refreshToken = tokenPair.refresh_token;
    this.accessTokenExpiration = new Date(
      new Date().getTime() + tokenPair.expires_in * 1000
    );

    const refreshTokenContents = jwt_decode<RefreshTokenContent>(
      tokenPair.refresh_token
    ) as RefreshTokenContent;

    this.refreshTokenExpiration = new Date(
      new Date().getTime() + refreshTokenContents.exp * 1000
    );

    this._accessTokenContent = jwt_decode<AccessTokenContent>(
      tokenPair.access_token
    ) as AccessTokenContent;
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.accessTokenExpiration = null;
    this.refreshTokenExpiration = null;
    this._accessTokenContent = null;

    // Clear the local storage
    localStorage.clear();
  }

  public doTokenRefresh(): Observable<TokenPairDto> {
    if (!this.refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this._loginApi
      .authControllerRefresh({
        body: {
          refreshToken: this.refreshToken,
        },
      })
      .pipe(
        tap((tokenPair) => {
          this.handleTokenResposne(tokenPair);
        })
      );
  }
}
