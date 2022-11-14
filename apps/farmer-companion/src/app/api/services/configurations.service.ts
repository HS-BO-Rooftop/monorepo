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
import { UpdateConfigurationDto } from '../models/update-configuration-dto';

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
    connectedOnly?: boolean;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.ConfigurationsControllerFindAllPath, 'get');
    if (params) {
      rb.query('connectedOnly', params.connectedOnly, {});
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
    connectedOnly?: boolean;
    context?: HttpContext
  }
): Observable<Array<BoardConfigurationDto>> {

    return this.configurationsControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardConfigurationDto>>) => r.body as Array<BoardConfigurationDto>)
    );
  }

  /**
   * Path part for operation createSensorConfiguration
   */
  static readonly CreateSensorConfigurationPath = '/api/configurations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSensorConfiguration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSensorConfiguration$Response(params: {
    context?: HttpContext
    body: CreateBoardSensorDto
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.CreateSensorConfigurationPath, 'post');
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
   * To access the full response (for headers, for example), `createSensorConfiguration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSensorConfiguration(params: {
    context?: HttpContext
    body: CreateBoardSensorDto
  }
): Observable<BoardConfigurationDto> {

    return this.createSensorConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

  /**
   * Path part for operation findOneSensorConfiguration
   */
  static readonly FindOneSensorConfigurationPath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneSensorConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSensorConfiguration$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.FindOneSensorConfigurationPath, 'get');
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
   * To access the full response (for headers, for example), `findOneSensorConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSensorConfiguration(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<BoardConfigurationDto> {

    return this.findOneSensorConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

  /**
   * Path part for operation deleteSensorConfiguration
   */
  static readonly DeleteSensorConfigurationPath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSensorConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSensorConfiguration$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.DeleteSensorConfigurationPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSensorConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSensorConfiguration(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSensorConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateSensorConfiguration
   */
  static readonly UpdateSensorConfigurationPath = '/api/configurations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSensorConfiguration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSensorConfiguration$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateConfigurationDto
  }
): Observable<StrictHttpResponse<BoardConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationsService.UpdateSensorConfigurationPath, 'patch');
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
   * To access the full response (for headers, for example), `updateSensorConfiguration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSensorConfiguration(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateConfigurationDto
  }
): Observable<BoardConfigurationDto> {

    return this.updateSensorConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<BoardConfigurationDto>) => r.body as BoardConfigurationDto)
    );
  }

}
