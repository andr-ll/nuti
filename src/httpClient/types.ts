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
