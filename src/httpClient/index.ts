import * as http from 'http';
import * as https from 'https';
import { RequestOptions, Response } from './types';

const protocols: Partial<Record<string, typeof http | typeof https>> = {
  ['http:']: http,
  ['https:']: https,
};

export class HttpClient {
  async get<T extends object>(
    url: string,
    headers?: http.IncomingHttpHeaders,
  ): Promise<Response<T>> {
    return this.request(url, {
      method: 'GET',
      headers,
    });
  }

  async post<T extends object>(
    url: string,
    body: unknown,
    headers?: http.IncomingHttpHeaders,
  ): Promise<Response<T>> {
    return this.request(url, {
      method: 'POST',
      headers,
      body,
    });
  }

  async put<T extends object>(
    url: string,
    body: unknown,
    headers?: http.IncomingHttpHeaders,
  ): Promise<Response<T>> {
    return this.request(url, {
      method: 'PUT',
      headers,
      body,
    });
  }

  async delete<T extends object>(
    url: string,
    body: unknown,
    headers?: http.IncomingHttpHeaders,
  ): Promise<Response<T>> {
    return this.request(url, {
      method: 'DELETE',
      headers,
      body,
    });
  }

  private async request<T extends object>(
    url: string,
    options: RequestOptions,
  ) {
    return new Promise<Response<T>>((resolve, reject) => {
      const { protocol, hostname, port, pathname, host } = new URL(url);
      const validProtocol = protocols[protocol];

      if (validProtocol == null) {
        throw new Error(`Unsupported protocol: ${validProtocol}`);
      }

      const { headers = {}, body = {}, method } = options;
      const stringReqBody = JSON.stringify(body);

      if (headers['content-type'] == null) {
        Object.assign(headers, {
          'content-type': 'application/json',
          'content-length': stringReqBody.length,
        });
      }

      const opts: http.RequestOptions = {
        protocol,
        hostname,
        host,
        port,
        path: pathname,
        headers,
        method,
      };

      const req = validProtocol.request(opts, (res) => {
        let rawData = '';
        const status = res.statusCode ?? 500;
        const isJSON =
          res.headers['content-type']?.includes('application/json') === true;

        const contentLengthRaw = Number(res.headers['content-length']);
        const contentLength = Number.isNaN(contentLengthRaw)
          ? 0
          : contentLengthRaw;

        res.on('data', (chunk) => {
          rawData += chunk.toString();
        });

        res.on('end', () => {
          resolve({
            status,
            ok: status < 400,
            contentLength,
            headers: res.headers,
            json: isJSON ? JSON.parse(rawData) : undefined,
            body: rawData,
          });
        });

        res.on('error', reject);
      });

      req.on('error', reject);
      req.write(stringReqBody);
      req.end();
    });
  }
}

export const req = new HttpClient();
