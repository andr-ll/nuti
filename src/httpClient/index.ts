/*!
 * @description The `httpClient` utility.
 * @see [docs](../../docs/httpClient.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { Request } from './request';
export class HttpClient {
  /**
   * GET request.
   * @returns an object of specified interface (for TS only).
   */
  get<T extends object>(url: string) {
    return new Request<T, 'GET'>(url, 'GET');
  }

  /**
   * POST request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  post<T extends object>(url: string) {
    return new Request<T, 'POST'>(url, 'POST');
  }

  /**
   * PUT request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  put<T extends object>(url: string) {
    return new Request<T, 'PUT'>(url, 'PUT');
  }

  /**
   * DELETE request.
   * @param body Any object.
   * @returns an object of specified interface (for TS only).
   */
  delete<T extends object>(url: string) {
    return new Request<T, 'DELETE'>(url, 'DELETE');
  }
}

export const req = new HttpClient();
