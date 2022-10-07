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

import { BedDto } from '../models/bed-dto';
import { CreateBedDto } from '../models/create-bed-dto';
import { UpdateBedDto } from '../models/update-bed-dto';

@Injectable({
  providedIn: 'root',
})
export class BedsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findBeds
   */
  static readonly FindBedsPath = '/api/beds';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBeds()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBeds$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BedDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BedsService.FindBedsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BedDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findBeds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBeds(params?: {
    context?: HttpContext
  }
): Observable<Array<BedDto>> {

    return this.findBeds$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BedDto>>) => r.body as Array<BedDto>)
    );
  }

  /**
   * Path part for operation createBed
   */
  static readonly CreateBedPath = '/api/beds';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBed()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBed$Response(params: {
    context?: HttpContext
    body: CreateBedDto
  }
): Observable<StrictHttpResponse<BedDto>> {

    const rb = new RequestBuilder(this.rootUrl, BedsService.CreateBedPath, 'post');
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
        return r as StrictHttpResponse<BedDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBed$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBed(params: {
    context?: HttpContext
    body: CreateBedDto
  }
): Observable<BedDto> {

    return this.createBed$Response(params).pipe(
      map((r: StrictHttpResponse<BedDto>) => r.body as BedDto)
    );
  }

  /**
   * Path part for operation findBed
   */
  static readonly FindBedPath = '/api/beds/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBed()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBed$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BedDto>> {

    const rb = new RequestBuilder(this.rootUrl, BedsService.FindBedPath, 'get');
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
        return r as StrictHttpResponse<BedDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findBed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBed(params: {
    id: string;
    context?: HttpContext
  }
): Observable<BedDto> {

    return this.findBed$Response(params).pipe(
      map((r: StrictHttpResponse<BedDto>) => r.body as BedDto)
    );
  }

  /**
   * Path part for operation deleteBed
   */
  static readonly DeleteBedPath = '/api/beds/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBed()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBed$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BedsService.DeleteBedPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteBed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBed(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteBed$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateBed
   */
  static readonly UpdateBedPath = '/api/beds/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBed()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBed$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateBedDto
  }
): Observable<StrictHttpResponse<BedDto>> {

    const rb = new RequestBuilder(this.rootUrl, BedsService.UpdateBedPath, 'patch');
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
        return r as StrictHttpResponse<BedDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateBed$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBed(params: {
    id: string;
    context?: HttpContext
    body: UpdateBedDto
  }
): Observable<BedDto> {

    return this.updateBed$Response(params).pipe(
      map((r: StrictHttpResponse<BedDto>) => r.body as BedDto)
    );
  }

}
