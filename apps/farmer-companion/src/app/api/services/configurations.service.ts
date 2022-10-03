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

import { BoardConfigurationDto } from '../models/board-configuration-dto';
import { CreateBoardSensorDto } from '../models/create-board-sensor-dto';
import { CreateSensorConfigurationDto } from '../models/create-sensor-configuration-dto';
import { SensorConfigurationDto } from '../models/sensor-configuration-dto';
import { UpdateConfigurationDto } from '../models/update-configuration-dto';
import { UpdateSensorDto } from '../models/update-sensor-dto';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation configurationsControllerFindAll
   */
  static readonly ConfigurationsControllerFindAllPath = '/api/configurations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configurationsControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BoardConfigurationDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configurationsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<BoardConfigurationDto>> {

    return this.configurationsControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardConfigurationDto>>) => r.body as Array<BoardConfigurationDto>)
    );
  }

  /**
   * Path part for operation configurationsControllerCreate
   */
  static readonly ConfigurationsControllerCreatePath = '/api/configurations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configurationsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configurationsControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateBoardSensorDto
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<BoardConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configurationsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configurationsControllerCreate(params: {
    context?: HttpContext
    body: CreateBoardSensorDto
  }
): Observable<BoardConfigurationDto> {

    return this.configurationsControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

  /**
   * Path part for operation configurationsControllerFindOne
   */
  static readonly ConfigurationsControllerFindOnePath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configurationsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<BoardConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configurationsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<BoardConfigurationDto> {

    return this.configurationsControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

  /**
   * Path part for operation configurationsControllerRemove
   */
  static readonly ConfigurationsControllerRemovePath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configurationsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerRemove$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `configurationsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  configurationsControllerRemove(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.configurationsControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation configurationsControllerUpdate
   */
  static readonly ConfigurationsControllerUpdatePath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configurationsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configurationsControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateConfigurationDto
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<BoardConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configurationsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configurationsControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateConfigurationDto
  }
): Observable<BoardConfigurationDto> {

    return this.configurationsControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

  /**
   * Path part for operation sensorsControllerFindAll
   */
  static readonly SensorsControllerFindAllPath = '/api/sensors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorsControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SensorConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.SensorsControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SensorConfigurationDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<SensorConfigurationDto>> {

    return this.sensorsControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SensorConfigurationDto>>) => r.body as Array<SensorConfigurationDto>)
    );
  }

  /**
   * Path part for operation sensorsControllerCreate
   */
  static readonly SensorsControllerCreatePath = '/api/sensors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorsControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateSensorConfigurationDto
  }
): Observable<StrictHttpResponse<SensorConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.SensorsControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<SensorConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorsControllerCreate(params: {
    context?: HttpContext
    body: CreateSensorConfigurationDto
  }
): Observable<SensorConfigurationDto> {

    return this.sensorsControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorConfigurationDto>) => r.body as SensorConfigurationDto)
    );
  }

  /**
   * Path part for operation sensorsControllerFindOne
   */
  static readonly SensorsControllerFindOnePath = '/api/sensors/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SensorConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.SensorsControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<SensorConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<SensorConfigurationDto> {

    return this.sensorsControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<SensorConfigurationDto>) => r.body as SensorConfigurationDto)
    );
  }

  /**
   * Path part for operation sensorsControllerRemove
   */
  static readonly SensorsControllerRemovePath = '/api/sensors/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerRemove$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.SensorsControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `sensorsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorsControllerRemove(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.sensorsControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sensorsControllerUpdate
   */
  static readonly SensorsControllerUpdatePath = '/api/sensors/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorsControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorDto
  }
): Observable<StrictHttpResponse<SensorConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.SensorsControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<SensorConfigurationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorsControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorDto
  }
): Observable<SensorConfigurationDto> {

    return this.sensorsControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorConfigurationDto>) => r.body as SensorConfigurationDto)
    );
  }

}
