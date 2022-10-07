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

import { DwdWeatherDto } from '../models/dwd-weather-dto';
import { LocalWeatherStationRow } from '../models/local-weather-station-row';
import { WeatherForcastDto } from '../models/weather-forcast-dto';
import { WeatherTodayResponseDto } from '../models/weather-today-response-dto';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation weatherControllerGetLocalWeather
   */
  static readonly WeatherControllerGetLocalWeatherPath = '/api/weather/current/local';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerGetLocalWeather()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetLocalWeather$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<LocalWeatherStationRow>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerGetLocalWeatherPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LocalWeatherStationRow>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `weatherControllerGetLocalWeather$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetLocalWeather(params?: {
    context?: HttpContext
  }
): Observable<LocalWeatherStationRow> {

    return this.weatherControllerGetLocalWeather$Response(params).pipe(
      map((r: StrictHttpResponse<LocalWeatherStationRow>) => r.body as LocalWeatherStationRow)
    );
  }

  /**
   * Path part for operation weatherControllerCurrentLocalWeatherSse
   */
  static readonly WeatherControllerCurrentLocalWeatherSsePath = '/api/weather/current/local/sse';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerCurrentLocalWeatherSse()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentLocalWeatherSse$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerCurrentLocalWeatherSsePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `weatherControllerCurrentLocalWeatherSse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentLocalWeatherSse(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.weatherControllerCurrentLocalWeatherSse$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation weatherControllerGetDwdWeather
   */
  static readonly WeatherControllerGetDwdWeatherPath = '/api/weather/current/dwd';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerGetDwdWeather()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetDwdWeather$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DwdWeatherDto>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerGetDwdWeatherPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DwdWeatherDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `weatherControllerGetDwdWeather$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetDwdWeather(params?: {
    context?: HttpContext
  }
): Observable<DwdWeatherDto> {

    return this.weatherControllerGetDwdWeather$Response(params).pipe(
      map((r: StrictHttpResponse<DwdWeatherDto>) => r.body as DwdWeatherDto)
    );
  }

  /**
   * Path part for operation weatherControllerCurrentDwdWeatherSse
   */
  static readonly WeatherControllerCurrentDwdWeatherSsePath = '/api/weather/current/dwd/sse';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerCurrentDwdWeatherSse()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentDwdWeatherSse$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerCurrentDwdWeatherSsePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `weatherControllerCurrentDwdWeatherSse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentDwdWeatherSse(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.weatherControllerCurrentDwdWeatherSse$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation weatherControllerGetDwdWeatherForecast
   */
  static readonly WeatherControllerGetDwdWeatherForecastPath = '/api/weather/forecast/dwd';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerGetDwdWeatherForecast()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetDwdWeatherForecast$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<WeatherForcastDto>>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerGetDwdWeatherForecastPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WeatherForcastDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `weatherControllerGetDwdWeatherForecast$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetDwdWeatherForecast(params?: {
    context?: HttpContext
  }
): Observable<Array<WeatherForcastDto>> {

    return this.weatherControllerGetDwdWeatherForecast$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WeatherForcastDto>>) => r.body as Array<WeatherForcastDto>)
    );
  }

  /**
   * Path part for operation weatherControllerCurrentDwdForecastSse
   */
  static readonly WeatherControllerCurrentDwdForecastSsePath = '/api/weather/forecast/dwd/sse';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerCurrentDwdForecastSse()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentDwdForecastSse$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerCurrentDwdForecastSsePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `weatherControllerCurrentDwdForecastSse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerCurrentDwdForecastSse(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.weatherControllerCurrentDwdForecastSse$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation weatherControllerGetToday
   */
  static readonly WeatherControllerGetTodayPath = '/api/weather/today';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherControllerGetToday()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetToday$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<WeatherTodayResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, WeatherService.WeatherControllerGetTodayPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<WeatherTodayResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `weatherControllerGetToday$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherControllerGetToday(params?: {
    context?: HttpContext
  }
): Observable<WeatherTodayResponseDto> {

    return this.weatherControllerGetToday$Response(params).pipe(
      map((r: StrictHttpResponse<WeatherTodayResponseDto>) => r.body as WeatherTodayResponseDto)
    );
  }

}
