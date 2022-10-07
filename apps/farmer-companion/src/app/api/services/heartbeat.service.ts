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

import { HeartbeatRequestDto } from '../models/heartbeat-request-dto';
import { HeartbeatResponseDto } from '../models/heartbeat-response-dto';

@Injectable({
  providedIn: 'root',
})
export class HeartbeatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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

    const rb = new RequestBuilder(this.rootUrl, HeartbeatService.HeartbeatControllerHeartbeatPath, 'post');
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
