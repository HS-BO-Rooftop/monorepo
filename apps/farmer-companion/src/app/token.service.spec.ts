import { TestBed } from '@angular/core/testing';

import * as dayjs from 'dayjs';
import {
  ACCESS_TOKEN_EXPIRATION_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRATION_KEY,
  REFRESH_TOKEN_KEY,
  SetTokenPair,
  TokenService,
} from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);

    // Clear local storage and session storage.
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get a token pair', () => {
    const refreshTokenValue = 'refreshTokenValue';
    const refreshTokenExpiration = dayjs().add(90, 'day').unix();

    const accessTokenValue = 'accessTokenValue';
    const accessTokenExpiration = dayjs().add(5, 'minute').unix();

    localStorage.setItem(REFRESH_TOKEN_KEY, refreshTokenValue);
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRATION_KEY,
      refreshTokenExpiration.toString()
    );

    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessTokenValue);
    sessionStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      accessTokenExpiration.toString()
    );

    const tokenPair = service.tokenPair;

    expect(tokenPair.refreshToken).toBe(refreshTokenValue);
    expect(tokenPair.accessToken).toBe(accessTokenValue);

    expect(tokenPair.refreshTokenExpiration).toStrictEqual(
      dayjs.unix(refreshTokenExpiration).toDate()
    );
    expect(tokenPair.accessTokenExpiration).toStrictEqual(
      dayjs.unix(accessTokenExpiration).toDate()
    );
  });

  it('should be able to save a token pair', () => {
    const tokenPair: SetTokenPair = {
      accessToken: 'accessTokenValue',
      accessTokenExpiration: dayjs().add(5, 'minute').toDate(),
      refreshToken: 'refreshTokenValue',
      refreshTokenExpiration: dayjs().add(90, 'day').toDate(),
    };

    service.saveTokenPair(tokenPair);

    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe(
      tokenPair.refreshToken
    );

    expect(localStorage.getItem(REFRESH_TOKEN_EXPIRATION_KEY)).toBe(
      dayjs(tokenPair.refreshTokenExpiration).unix().toString()
    );

    expect(sessionStorage.getItem(ACCESS_TOKEN_KEY)).toBe(
      tokenPair.accessToken
    );

    expect(sessionStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY)).toBe(
      dayjs(tokenPair.accessTokenExpiration).unix().toString()
    );
  });

  it('should be able to determine if the stored access token is expired', () => {
    // Store a expired expiration date
    assertExpiration(
      service,
      'accessTokenExpired',
      sessionStorage,
      ACCESS_TOKEN_EXPIRATION_KEY
    );
  });

  it('should be able to determine if the stored refresh token is expired', () => {
    assertExpiration(
      service,
      'refreshTokenExpired',
      localStorage,
      REFRESH_TOKEN_EXPIRATION_KEY
    );
  });
});

function assertExpiration(
  service: TokenService,
  getterFunctionName: keyof TokenService,
  storage: Storage,
  key: string
) {
  // Assert that the getter returns true when the expiration date is in the past.
  storage.setItem(key, dayjs().subtract(1, 'day').unix().toString());

  expect(service[getterFunctionName]).toBe(true);

  // Assert that the getter returns false when the expiration date is in the future.
  storage.setItem(key, dayjs().add(1, 'day').unix().toString());

  expect(service[getterFunctionName]).toBe(false);

  // Assert that the getter returns true when the expiration date is not set.
  storage.clear();

  expect(service[getterFunctionName]).toBe(true);
}
