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
export class AutomationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAutomations
   */
  static readonly GetAutomationsPath = '/api/automations';

  /**
   * Get all automations.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAutomations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAutomations$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<AutomationConfigDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AutomationsService.GetAutomationsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AutomationConfigDto>>;
      })
    );
  }

  /**
   * Get all automations.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAutomations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAutomations(params?: {
    context?: HttpContext
  }
): Observable<Array<AutomationConfigDto>> {

    return this.getAutomations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AutomationConfigDto>>) => r.body as Array<AutomationConfigDto>)
    );
  }

  /**
   * Path part for operation createAutomation
   */
  static readonly CreateAutomationPath = '/api/automations';

  /**
   * Creates a new automation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAutomation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAutomation$Response(params: {
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<StrictHttpResponse<AutomationConfigDto>> {

    const rb = new RequestBuilder(this.rootUrl, AutomationsService.CreateAutomationPath, 'post');
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
        return r as StrictHttpResponse<AutomationConfigDto>;
      })
    );
  }

  /**
   * Creates a new automation.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAutomation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAutomation(params: {
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<AutomationConfigDto> {

    return this.createAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<AutomationConfigDto>) => r.body as AutomationConfigDto)
    );
  }

  /**
   * Path part for operation getAutomation
   */
  static readonly GetAutomationPath = '/api/automations/{id}';

  /**
   * Get a specific automation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAutomation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAutomation$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<AutomationConfigDto>> {

    const rb = new RequestBuilder(this.rootUrl, AutomationsService.GetAutomationPath, 'get');
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
        return r as StrictHttpResponse<AutomationConfigDto>;
      })
    );
  }

  /**
   * Get a specific automation.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAutomation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAutomation(params: {
    id: string;
    context?: HttpContext
  }
): Observable<AutomationConfigDto> {

    return this.getAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<AutomationConfigDto>) => r.body as AutomationConfigDto)
    );
  }

  /**
   * Path part for operation deleteAutomation
   */
  static readonly DeleteAutomationPath = '/api/automations/{id}';

  /**
   * Deletes an automation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAutomation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAutomation$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AutomationsService.DeleteAutomationPath, 'delete');
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
   * Deletes an automation.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAutomation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAutomation(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateAutomation
   */
  static readonly UpdateAutomationPath = '/api/automations/{id}';

  /**
   * Updates an automation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAutomation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAutomation$Response(params: {
    id: string;
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<StrictHttpResponse<AutomationConfigDto>> {

    const rb = new RequestBuilder(this.rootUrl, AutomationsService.UpdateAutomationPath, 'patch');
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
        return r as StrictHttpResponse<AutomationConfigDto>;
      })
    );
  }

  /**
   * Updates an automation.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAutomation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAutomation(params: {
    id: string;
    context?: HttpContext
    body: AutomationConfigDto
  }
): Observable<AutomationConfigDto> {

    return this.updateAutomation$Response(params).pipe(
      map((r: StrictHttpResponse<AutomationConfigDto>) => r.body as AutomationConfigDto)
    );
  }

}
