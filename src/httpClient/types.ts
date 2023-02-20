/*!
 * @description The types for `httpClient` utility.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as http from 'http';

export type Method = 'POST' | 'PUT' | 'GET' | 'DELETE';

export interface Response<T extends object> {
  status: number;
  contentLength: number;
  ok: boolean;
  headers: http.IncomingHttpHeaders;
  json?: T;
  body: string;
}

export interface RequestOptions {
  method: Method;
  headers?: http.IncomingHttpHeaders;
  body?: unknown;
}
