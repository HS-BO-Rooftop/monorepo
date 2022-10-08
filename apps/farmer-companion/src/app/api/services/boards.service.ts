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
import { HeartbeatRequestDto } from '../models/heartbeat-request-dto';
import { HeartbeatResponseDto } from '../models/heartbeat-response-dto';
import { RegisterRequestDto } from '../models/register-request-dto';
import { RegisterResponseDto } from '../models/register-response-dto';
import { UpdateBoardDto } from '../models/update-board-dto';
import { UpdateBoardPinDto } from '../models/update-board-pin-dto';

@Injectable({
  providedIn: 'root',
})
export class BoardsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllBoards
   */
  static readonly FindAllBoardsPath = '/api/boards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBoards()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoards$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BoardsService.FindAllBoardsPath, 'get');
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
   * To access the full response (for headers, for example), `findAllBoards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoards(params?: {
    context?: HttpContext
  }
): Observable<Array<BoardDto>> {

    return this.findAllBoards$Response(params).pipe(
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardsControllerCreatePath, 'post');
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
   * Path part for operation findOneBoard
   */
  static readonly FindOneBoardPath = '/api/boards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneBoard()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneBoard$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BoardDto>> {

    const rb = new RequestBuilder(this.rootUrl, BoardsService.FindOneBoardPath, 'get');
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
   * To access the full response (for headers, for example), `findOneBoard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneBoard(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<BoardDto> {

    return this.findOneBoard$Response(params).pipe(
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardsControllerRemovePath, 'delete');
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
   * Path part for operation updateBoard
   */
  static readonly UpdateBoardPath = '/api/boards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBoard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBoard$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardDto
  }
): Observable<StrictHttpResponse<BoardDto>> {

    const rb = new RequestBuilder(this.rootUrl, BoardsService.UpdateBoardPath, 'patch');
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
   * To access the full response (for headers, for example), `updateBoard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBoard(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
    body: UpdateBoardDto
  }
): Observable<BoardDto> {

    return this.updateBoard$Response(params).pipe(
      map((r: StrictHttpResponse<BoardDto>) => r.body as BoardDto)
    );
  }

  /**
   * Path part for operation getConfigurationsForBoard
   */
  static readonly GetConfigurationsForBoardPath = '/api/boards/{id}/configurations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConfigurationsForBoard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigurationsForBoard$Response(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BoardConfigurationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BoardsService.GetConfigurationsForBoardPath, 'get');
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
   * To access the full response (for headers, for example), `getConfigurationsForBoard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigurationsForBoard(params: {

    /**
     * The UUID of the requested resource
     */
    id: string;
    context?: HttpContext
  }
): Observable<Array<BoardConfigurationDto>> {

    return this.getConfigurationsForBoard$Response(params).pipe(
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardsControllerGetConfigurationChangedEventPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.RegisterControllerRegisterPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.FindAllBoardPinsPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardPinsControllerCreatePath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardPinsControllerFindOnePath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardPinsControllerRemovePath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, BoardsService.BoardPinsControllerUpdatePath, 'patch');
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
   * Path part for operation heartbeatControllerHeartbeat
   */
  static readonly HeartbeatControllerHeartbeatPath = '/api/heartbeat';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `heartbeatControllerHeartbeat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  heartbeatControllerHeartbeat$Response(params: {
    context?: HttpContext
    body: HeartbeatRequestDto
  }
): Observable<StrictHttpResponse<HeartbeatResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, BoardsService.HeartbeatControllerHeartbeatPath, 'post');
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
        return r as StrictHttpResponse<HeartbeatResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `heartbeatControllerHeartbeat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  heartbeatControllerHeartbeat(params: {
    context?: HttpContext
    body: HeartbeatRequestDto
  }
): Observable<HeartbeatResponseDto> {

    return this.heartbeatControllerHeartbeat$Response(params).pipe(
      map((r: StrictHttpResponse<HeartbeatResponseDto>) => r.body as HeartbeatResponseDto)
    );
  }

}
