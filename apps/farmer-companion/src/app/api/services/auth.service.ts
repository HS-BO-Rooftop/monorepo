/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginRequestDto } from '../models/login-request-dto';
import { RefreshTokenRequestDto } from '../models/refresh-token-request-dto';
import { TokenPairDto } from '../models/token-pair-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/api/auth/login';

  /**
   * Logs in a user.
   *
   * Logs in a user using the provided email and password. 
   * Returns a Token Pair containing the JWT and the refresh token.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: {
    context?: HttpContext
    body: LoginRequestDto
  }
): Observable<StrictHttpResponse<TokenPairDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenPairDto>;
      })
    );
  }

  /**
   * Logs in a user.
   *
   * Logs in a user using the provided email and password. 
   * Returns a Token Pair containing the JWT and the refresh token.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: {
    context?: HttpContext
    body: LoginRequestDto
  }
): Observable<TokenPairDto> {

    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<TokenPairDto>) => r.body as TokenPairDto)
    );
  }

  /**
   * Path part for operation authControllerRefresh
   */
  static readonly AuthControllerRefreshPath = '/api/auth/refresh';

  /**
   * Refreshes a token pair.
   *
   * Refreshes a token pair using the provided refresh token. 
   * Returns a Token Pair containing the JWT and the refresh token.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRefresh()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefresh$Response(params: {
    context?: HttpContext
    body: RefreshTokenRequestDto
  }
): Observable<StrictHttpResponse<TokenPairDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerRefreshPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenPairDto>;
      })
    );
  }

  /**
   * Refreshes a token pair.
   *
   * Refreshes a token pair using the provided refresh token. 
   * Returns a Token Pair containing the JWT and the refresh token.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerRefresh$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefresh(params: {
    context?: HttpContext
    body: RefreshTokenRequestDto
  }
): Observable<TokenPairDto> {

    return this.authControllerRefresh$Response(params).pipe(
      map((r: StrictHttpResponse<TokenPairDto>) => r.body as TokenPairDto)
    );
  }

}
