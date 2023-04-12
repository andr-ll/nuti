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
  get(url: string) {
    return new Request(url, 'GET', this.logger);
  }

  /**
   * POST request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  post(url: string) {
    return new Request(url, 'POST', this.logger);
  }

  /**
   * PUT request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  put(url: string) {
    return new Request(url, 'PUT', this.logger);
  }

  /**
   * DELETE request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  delete(url: string) {
    return new Request(url, 'DELETE', this.logger);
  }
}

export const http = new HttpClient();
