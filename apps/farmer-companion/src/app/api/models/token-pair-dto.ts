/* tslint:disable */
/* eslint-disable */
export interface TokenPairDto {

  /**
   * The access token issued by the authorization server.
   */
  access_token: string;

  /**
   * The number of seconds until the access token expires.
   */
  expires_in: number;

  /**
   * The refresh token for the user
   */
  refresh_token: string;

  /**
   * The type of token issued as described in the JWT spec.
   */
  token_type: string;
}
