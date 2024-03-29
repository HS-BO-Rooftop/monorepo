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

import { BoardPinDto } from '../models/board-pin-dto';
import { CreateBoardPinDto } from '../models/create-board-pin-dto';
import { CreateSensorInterfaceDto } from '../models/create-sensor-interface-dto';
import { SensorInterfaceDto } from '../models/sensor-interface-dto';
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
   * Path part for operation findAllBoardPins
   */
  static readonly FindAllBoardPinsPath = '/api/board-pins';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBoardPins()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoardPins$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardPinDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConfigurationService.FindAllBoardPinsPath, 'get');
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
   * To access the full response (for headers, for example), `findAllBoardPins$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoardPins(params?: {
    context?: HttpContext
  }
): Observable<Array<BoardPinDto>> {

    return this.findAllBoardPins$Response(params).pipe(
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
