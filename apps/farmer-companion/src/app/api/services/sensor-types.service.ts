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

import { CreateSensorTypeDto } from '../models/create-sensor-type-dto';
import { SensorTypeDto } from '../models/sensor-type-dto';
import { UpdateSensorTypeDto } from '../models/update-sensor-type-dto';

@Injectable({
  providedIn: 'root',
})
export class SensorTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllSensorTypes
   */
  static readonly FindAllSensorTypesPath = '/api/sensor-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSensorTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSensorTypes$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SensorTypeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SensorTypesService.FindAllSensorTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SensorTypeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllSensorTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSensorTypes(params?: {
    context?: HttpContext
  }
): Observable<Array<SensorTypeDto>> {

    return this.findAllSensorTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SensorTypeDto>>) => r.body as Array<SensorTypeDto>)
    );
  }

  /**
   * Path part for operation sensorTypesControllerCreate
   */
  static readonly SensorTypesControllerCreatePath = '/api/sensor-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorTypesControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorTypesControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateSensorTypeDto
  }
): Observable<StrictHttpResponse<SensorTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorTypesService.SensorTypesControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<SensorTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorTypesControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorTypesControllerCreate(params: {
    context?: HttpContext
    body: CreateSensorTypeDto
  }
): Observable<SensorTypeDto> {

    return this.sensorTypesControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorTypeDto>) => r.body as SensorTypeDto)
    );
  }

  /**
   * Path part for operation sensorTypesControllerFindOne
   */
  static readonly SensorTypesControllerFindOnePath = '/api/sensor-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorTypesControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorTypesControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SensorTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorTypesService.SensorTypesControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<SensorTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorTypesControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorTypesControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<SensorTypeDto> {

    return this.sensorTypesControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<SensorTypeDto>) => r.body as SensorTypeDto)
    );
  }

  /**
   * Path part for operation sensorTypesControllerRemove
   */
  static readonly SensorTypesControllerRemovePath = '/api/sensor-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorTypesControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorTypesControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SensorTypesService.SensorTypesControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `sensorTypesControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorTypesControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.sensorTypesControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sensorTypesControllerUpdate
   */
  static readonly SensorTypesControllerUpdatePath = '/api/sensor-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorTypesControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorTypesControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorTypeDto
  }
): Observable<StrictHttpResponse<SensorTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorTypesService.SensorTypesControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<SensorTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorTypesControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorTypesControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorTypeDto
  }
): Observable<SensorTypeDto> {

    return this.sensorTypesControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorTypeDto>) => r.body as SensorTypeDto)
    );
  }

}
