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

import { CreatePlantDto } from '../models/create-plant-dto';
import { PlantDto } from '../models/plant-dto';
import { UpdatePlantDto } from '../models/update-plant-dto';

@Injectable({
  providedIn: 'root',
})
export class PlantsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllPlants
   */
  static readonly FindAllPlantsPath = '/api/plants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPlants()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPlants$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PlantDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlantsService.FindAllPlantsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PlantDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPlants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPlants(params?: {
    context?: HttpContext
  }
): Observable<Array<PlantDto>> {

    return this.findAllPlants$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PlantDto>>) => r.body as Array<PlantDto>)
    );
  }

  /**
   * Path part for operation createPlant
   */
  static readonly CreatePlantPath = '/api/plants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPlant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlant$Response(params: {
    context?: HttpContext
    body: CreatePlantDto
  }
): Observable<StrictHttpResponse<PlantDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlantsService.CreatePlantPath, 'post');
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
        return r as StrictHttpResponse<PlantDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPlant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlant(params: {
    context?: HttpContext
    body: CreatePlantDto
  }
): Observable<PlantDto> {

    return this.createPlant$Response(params).pipe(
      map((r: StrictHttpResponse<PlantDto>) => r.body as PlantDto)
    );
  }

  /**
   * Path part for operation findPlantById
   */
  static readonly FindPlantByIdPath = '/api/plants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPlantById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlantById$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PlantDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlantsService.FindPlantByIdPath, 'get');
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
        return r as StrictHttpResponse<PlantDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findPlantById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlantById(params: {
    id: string;
    context?: HttpContext
  }
): Observable<PlantDto> {

    return this.findPlantById$Response(params).pipe(
      map((r: StrictHttpResponse<PlantDto>) => r.body as PlantDto)
    );
  }

  /**
   * Path part for operation deletePlant
   */
  static readonly DeletePlantPath = '/api/plants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePlant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlant$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlantsService.DeletePlantPath, 'delete');
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
   * To access the full response (for headers, for example), `deletePlant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlant(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deletePlant$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updatePlant
   */
  static readonly UpdatePlantPath = '/api/plants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePlant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlant$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdatePlantDto
  }
): Observable<StrictHttpResponse<PlantDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlantsService.UpdatePlantPath, 'patch');
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
        return r as StrictHttpResponse<PlantDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePlant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlant(params: {
    id: string;
    context?: HttpContext
    body: UpdatePlantDto
  }
): Observable<PlantDto> {

    return this.updatePlant$Response(params).pipe(
      map((r: StrictHttpResponse<PlantDto>) => r.body as PlantDto)
    );
  }

}
