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

import { RegisterRequestDto } from '../models/register-request-dto';
import { RegisterResponseDto } from '../models/register-response-dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation registerControllerRegister
   */
  static readonly RegisterControllerRegisterPath = '/api/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerControllerRegister$Response(params: {
    context?: HttpContext
    body: RegisterRequestDto
  }
): Observable<StrictHttpResponse<RegisterResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, RegisterService.RegisterControllerRegisterPath, 'post');
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
        return r as StrictHttpResponse<RegisterResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registerControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerControllerRegister(params: {
    context?: HttpContext
    body: RegisterRequestDto
  }
): Observable<RegisterResponseDto> {

    return this.registerControllerRegister$Response(params).pipe(
      map((r: StrictHttpResponse<RegisterResponseDto>) => r.body as RegisterResponseDto)
    );
  }

}
