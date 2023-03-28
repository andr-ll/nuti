/*!
 * @description The `httpClient` utility.
 * @see [docs](../../docs/httpClient.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { Logger } from '../logger';
import { Request } from './request';

export class HttpClient {
  private logger = new Logger();

  /**
   * GET request.
   * @returns an object of specified interface (for TS only).
   */
  get<T extends object>(url: string) {
    return new Request<T, 'GET'>(url, 'GET', this.logger);
  }

  /**
   * POST request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  post<T extends object>(url: string) {
    return new Request<T, 'POST'>(url, 'POST', this.logger);
  }

  /**
   * PUT request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  put<T extends object>(url: string) {
    return new Request<T, 'PUT'>(url, 'PUT', this.logger);
  }

  /**
   * DELETE request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  delete<T extends object>(url: string) {
    return new Request<T, 'DELETE'>(url, 'DELETE', this.logger);
  }
}

export const http = new HttpClient();
