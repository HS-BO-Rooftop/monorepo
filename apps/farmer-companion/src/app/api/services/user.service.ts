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

import { CreateUserDto } from '../models/create-user-dto';
import { PasswordResetRequestDto } from '../models/password-reset-request-dto';
import { SetNewPasswordRequestDto } from '../models/set-new-password-request-dto';
import { UpdateUserDto } from '../models/update-user-dto';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllUser
   */
  static readonly GetAllUserPath = '/api/users';

  /**
   * Get all users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UserDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetAllUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserDto>>;
      })
    );
  }

  /**
   * Get all users.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser(params?: {
    context?: HttpContext
  }
): Observable<Array<UserDto>> {

    return this.getAllUser$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>) => r.body as Array<UserDto>)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/api/users';

  /**
   * Create user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.CreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Create user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<void> {

    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getUserById
   */
  static readonly GetUserByIdPath = '/api/users/{id}';

  /**
   * Get user by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Get user by id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<UserDto> {

    return this.getUserById$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/api/users/{id}';

  /**
   * Update user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateUserDto
  }
): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UpdateUserPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Update user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateUserDto
  }
): Observable<UserDto> {

    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/api/users/{id}';

  /**
   * Deletes a user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.DeleteUserPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Deletes a user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerRequestPasswordReset
   */
  static readonly UserControllerRequestPasswordResetPath = '/api/users/passwords';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerRequestPasswordReset()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerRequestPasswordReset$Response(params: {
    context?: HttpContext
    body: PasswordResetRequestDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerRequestPasswordResetPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerRequestPasswordReset$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerRequestPasswordReset(params: {
    context?: HttpContext
    body: PasswordResetRequestDto
  }
): Observable<void> {

    return this.userControllerRequestPasswordReset$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerSetNewPassword
   */
  static readonly UserControllerSetNewPasswordPath = '/api/users/passwords';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerSetNewPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerSetNewPassword$Response(params: {
    context?: HttpContext
    body: SetNewPasswordRequestDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerSetNewPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerSetNewPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerSetNewPassword(params: {
    context?: HttpContext
    body: SetNewPasswordRequestDto
  }
): Observable<void> {

    return this.userControllerSetNewPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
