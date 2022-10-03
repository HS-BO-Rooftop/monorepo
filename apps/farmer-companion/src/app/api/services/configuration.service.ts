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
import { BoardDto } from '../models/board-dto';
import { BoardPinDto } from '../models/board-pin-dto';
import { CreateBoardDto } from '../models/create-board-dto';
import { CreateBoardPinDto } from '../models/create-board-pin-dto';
import { CreateSensorInterfaceDto } from '../models/create-sensor-interface-dto';
import { SensorInterfaceDto } from '../models/sensor-interface-dto';
import { UpdateBoardDto } from '../models/update-board-dto';
import { UpdateBoardPinDto } from '../models/update-board-pin-dto';
import { UpdateSensorInterfaceDto } from '../models/update-sensor-interface-dto';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation boardsControllerFindAll
   */
  static readonly BoardsControllerFindAllPath = '/api/boards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BoardDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<BoardDto>> {

    return this.boardsControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardDto>>) => r.body as Array<BoardDto>)
    );
  }

  /**
   * Path part for operation boardsControllerCreate
   */
  static readonly BoardsControllerCreatePath = '/api/boards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardsControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateBoardDto
  }
): Observable<StrictHttpResponse<BoardDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<BoardDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardsControllerCreate(params: {
    context?: HttpContext
    body: CreateBoardDto
  }
): Observable<BoardDto> {

    return this.boardsControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardDto>) => r.body as BoardDto)
    );
  }

  /**
   * Path part for operation boardsControllerFindOne
   */
  static readonly BoardsControllerFindOnePath = '/api/boards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BoardDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<BoardDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<BoardDto> {

    return this.boardsControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<BoardDto>) => r.body as BoardDto)
    );
  }

  /**
   * Path part for operation boardsControllerRemove
   */
  static readonly BoardsControllerRemovePath = '/api/boards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerRemove$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `boardsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerRemove(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.boardsControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation boardsControllerUpdate
   */
  static readonly BoardsControllerUpdatePath = '/api/boards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardsControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardDto
  }
): Observable<StrictHttpResponse<BoardDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<BoardDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardsControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardDto
  }
): Observable<BoardDto> {

    return this.boardsControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardDto>) => r.body as BoardDto)
    );
  }

  /**
   * Path part for operation boardsControllerFindAllConfigurations
   */
  static readonly BoardsControllerFindAllConfigurationsPath = '/api/boards/{id}/configurations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerFindAllConfigurations()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindAllConfigurations$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerFindAllConfigurationsPath, 'get');
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
        return r as StrictHttpResponse<Array<BoardConfigurationDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerFindAllConfigurations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerFindAllConfigurations(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<Array<BoardConfigurationDto>> {

    return this.boardsControllerFindAllConfigurations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardConfigurationDto>>) => r.body as Array<BoardConfigurationDto>)
    );
  }

  /**
   * Path part for operation boardsControllerGetConfigurationChangedEvent
   */
  static readonly BoardsControllerGetConfigurationChangedEventPath = '/api/boards/{id}/configurations/updated';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardsControllerGetConfigurationChangedEvent()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerGetConfigurationChangedEvent$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardsControllerGetConfigurationChangedEventPath, 'get');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardsControllerGetConfigurationChangedEvent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardsControllerGetConfigurationChangedEvent(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.boardsControllerGetConfigurationChangedEvent$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation boardPinsControllerFindAll
   */
  static readonly BoardPinsControllerFindAllPath = '/api/board-pins';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardPinsControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardPinDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardPinsControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BoardPinDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardPinsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<BoardPinDto>> {

    return this.boardPinsControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardPinDto>>) => r.body as Array<BoardPinDto>)
    );
  }

  /**
   * Path part for operation boardPinsControllerCreate
   */
  static readonly BoardPinsControllerCreatePath = '/api/board-pins';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardPinsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardPinsControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateBoardPinDto
  }
): Observable<StrictHttpResponse<BoardPinDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardPinsControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<BoardPinDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardPinsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardPinsControllerCreate(params: {
    context?: HttpContext
    body: CreateBoardPinDto
  }
): Observable<BoardPinDto> {

    return this.boardPinsControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardPinDto>) => r.body as BoardPinDto)
    );
  }

  /**
   * Path part for operation boardPinsControllerFindOne
   */
  static readonly BoardPinsControllerFindOnePath = '/api/board-pins/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardPinsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerFindOne$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardPinsControllerFindOnePath, 'get');
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
   * To access the full response (for headers, for example), `boardPinsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerFindOne(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.boardPinsControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation boardPinsControllerRemove
   */
  static readonly BoardPinsControllerRemovePath = '/api/board-pins/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardPinsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerRemove$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardPinsControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `boardPinsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boardPinsControllerRemove(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.boardPinsControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation boardPinsControllerUpdate
   */
  static readonly BoardPinsControllerUpdatePath = '/api/board-pins/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boardPinsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardPinsControllerUpdate$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardPinDto
  }
): Observable<StrictHttpResponse<BoardPinDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.BoardPinsControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<BoardPinDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `boardPinsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  boardPinsControllerUpdate(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardPinDto
  }
): Observable<BoardPinDto> {

    return this.boardPinsControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<BoardPinDto>) => r.body as BoardPinDto)
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

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.SensorInterfacesControllerFindAllPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.SensorInterfacesControllerCreatePath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.SensorInterfacesControllerFindOnePath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.SensorInterfacesControllerRemovePath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.SensorInterfacesControllerUpdatePath, 'patch');
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
