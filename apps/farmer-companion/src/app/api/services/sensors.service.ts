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

import { CreateSensorConfigurationDto } from '../models/create-sensor-configuration-dto';
import { CreateSensorInterfaceDto } from '../models/create-sensor-interface-dto';
import { CreateSensorTypeDto } from '../models/create-sensor-type-dto';
import { SensorConfigurationDto } from '../models/sensor-configuration-dto';
import { SensorInterfaceDto } from '../models/sensor-interface-dto';
import { SensorTypeDto } from '../models/sensor-type-dto';
import { UpdateSensorDto } from '../models/update-sensor-dto';
import { UpdateSensorInterfaceDto } from '../models/update-sensor-interface-dto';
import { UpdateSensorTypeDto } from '../models/update-sensor-type-dto';

@Injectable({
  providedIn: 'root',
})
export class SensorsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllSensors
   */
  static readonly FindAllSensorsPath = '/api/sensors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSensors()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSensors$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SensorConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.FindAllSensorsPath, 'get');
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
   * To access the full response (for headers, for example), `findAllSensors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSensors(params?: {
    context?: HttpContext
  }
): Observable<Array<SensorConfigurationDto>> {

    return this.findAllSensors$Response(params).pipe(
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorsControllerCreatePath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorsControllerFindOnePath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorsControllerRemovePath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorsControllerUpdatePath, 'patch');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.FindAllSensorTypesPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorTypesControllerCreatePath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorTypesControllerFindOnePath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorTypesControllerRemovePath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorTypesControllerUpdatePath, 'patch');
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

  /**
   * Path part for operation sensorInterfacesControllerFindAll
   */
  static readonly SensorInterfacesControllerFindAllPath = '/api/sensor-interfaces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorInterfacesControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SensorInterfaceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorInterfacesControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SensorInterfaceDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorInterfacesControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<SensorInterfaceDto>> {

    return this.sensorInterfacesControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SensorInterfaceDto>>) => r.body as Array<SensorInterfaceDto>)
    );
  }

  /**
   * Path part for operation sensorInterfacesControllerCreate
   */
  static readonly SensorInterfacesControllerCreatePath = '/api/sensor-interfaces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorInterfacesControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorInterfacesControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateSensorInterfaceDto
  }
): Observable<StrictHttpResponse<SensorInterfaceDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorInterfacesControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<SensorInterfaceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorInterfacesControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorInterfacesControllerCreate(params: {
    context?: HttpContext
    body: CreateSensorInterfaceDto
  }
): Observable<SensorInterfaceDto> {

    return this.sensorInterfacesControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorInterfaceDto>) => r.body as SensorInterfaceDto)
    );
  }

  /**
   * Path part for operation sensorInterfacesControllerFindOne
   */
  static readonly SensorInterfacesControllerFindOnePath = '/api/sensor-interfaces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorInterfacesControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SensorInterfaceDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorInterfacesControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<SensorInterfaceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorInterfacesControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<SensorInterfaceDto> {

    return this.sensorInterfacesControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<SensorInterfaceDto>) => r.body as SensorInterfaceDto)
    );
  }

  /**
   * Path part for operation sensorInterfacesControllerRemove
   */
  static readonly SensorInterfacesControllerRemovePath = '/api/sensor-interfaces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorInterfacesControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerRemove$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorInterfacesControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `sensorInterfacesControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorInterfacesControllerRemove(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.sensorInterfacesControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sensorInterfacesControllerUpdate
   */
  static readonly SensorInterfacesControllerUpdatePath = '/api/sensor-interfaces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorInterfacesControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorInterfacesControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorInterfaceDto
  }
): Observable<StrictHttpResponse<SensorInterfaceDto>> {

    const rb = new RequestBuilder(this.rootUrl, SensorsService.SensorInterfacesControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<SensorInterfaceDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sensorInterfacesControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorInterfacesControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateSensorInterfaceDto
  }
): Observable<SensorInterfaceDto> {

    return this.sensorInterfacesControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<SensorInterfaceDto>) => r.body as SensorInterfaceDto)
    );
  }

}
