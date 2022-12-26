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

import { AutomationConfigDto } from '../models/automation-config-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation automationsControllerGetAutomations
   */
  static readonly AutomationsControllerGetAutomationsPath = '/api/automations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `automationsControllerGetAutomations()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerGetAutomations$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AutomationsControllerGetAutomationsPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `automationsControllerGetAutomations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerGetAutomations(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.automationsControllerGetAutomations$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation automationsControllerCreateAutomation
   */
  static readonly AutomationsControllerCreateAutomationPath = '/api/automations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `automationsControllerCreateAutomation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  automationsControllerCreateAutomation$Response(params: {
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AutomationsControllerCreateAutomationPath, 'post');
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
   * To access the full response (for headers, for example), `automationsControllerCreateAutomation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  automationsControllerCreateAutomation(params: {
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<void> {

    return this.automationsControllerCreateAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation automationsControllerGetAutomation
   */
  static readonly AutomationsControllerGetAutomationPath = '/api/automations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `automationsControllerGetAutomation()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerGetAutomation$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AutomationsControllerGetAutomationPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `automationsControllerGetAutomation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerGetAutomation(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.automationsControllerGetAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation automationsControllerDeleteAutomation
   */
  static readonly AutomationsControllerDeleteAutomationPath = '/api/automations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `automationsControllerDeleteAutomation()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerDeleteAutomation$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AutomationsControllerDeleteAutomationPath, 'delete');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `automationsControllerDeleteAutomation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  automationsControllerDeleteAutomation(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.automationsControllerDeleteAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation automationsControllerUpdateAutomation
   */
  static readonly AutomationsControllerUpdateAutomationPath = '/api/automations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `automationsControllerUpdateAutomation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  automationsControllerUpdateAutomation$Response(params: {
    id: string;
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AutomationsControllerUpdateAutomationPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `automationsControllerUpdateAutomation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  automationsControllerUpdateAutomation(params: {
    id: string;
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<void> {

    return this.automationsControllerUpdateAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
