/*!
 * @description The `Request` class (custom Promise).
 * @see [docs](../../docs/httpClient.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as http from 'http';
import * as https from 'https';
import { Method, RequestOptions, Response } from './types';

const protocols: Partial<Record<string, typeof http | typeof https>> = {
  ['http:']: http,
  ['https:']: https,
};

export class Request<T, M extends Method = Method> extends Promise<
  Response<T>
> {
  private request: Promise<Response<T>>;
  private _headers: http.IncomingHttpHeaders;
  private _body: unknown;

  public body: M extends 'GET' ? never : (body: unknown) => Request<T, M>;

  constructor(private readonly url: string, private readonly method: Method) {
    super(() => {
      return;
    });

    if (this.method !== 'GET') {
      this.body = this.bodySetter.bind(this);
    }
  }

  private doRequest = () => {
    if (!this.request) {
      const options = {
        method: this.method,
        url: this.url,
        headers: this._headers,
        body: this._body,
      };

      const promise = new Promise<Response<T>>((resolve, reject) => {
        const { opts, validProtocol, rawReqBody } =
          this.validateReqInput(options);

        const req = validProtocol.request(opts, (res) => {
          let rawData = '';
          const status = res.statusCode as number;
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
              json: isJSON && status !== 204 ? JSON.parse(rawData) : undefined,
              body: rawData,
            });
          });

          res.on('error', reject);
        });

        req.on('error', reject);
        req.write(rawReqBody);
        req.end();
      });

      this.request = promise;
    }

    return this.request;
  };

  /**
   * Function for validation request input.
   * @param payload options for request and url
   * @returns valid request options, raw request body and valid protocol (http(s))
   */
  private validateReqInput(payload: RequestOptions & { url: string }) {
    const { headers = {}, body = {}, method, url } = payload;
    const { protocol, hostname, port, pathname, host } = new URL(url);
    const validProtocol = protocols[protocol];

    if (validProtocol == null) {
      throw new Error(`Unsupported protocol: ${protocol.replace(':', '')}`);
    }

    const rawReqBody = JSON.stringify(body);

    if (headers['content-type'] == null) {
      Object.assign(headers, {
        'content-type': 'application/json',
        'content-length': rawReqBody.length,
      });
    }

    return {
      opts: {
        protocol,
        hostname,
        host,
        port,
        path: pathname,
        headers,
        method,
      },
      validProtocol,
      rawReqBody,
    };
  }

  private bodySetter(body: unknown) {
    if (this.method !== 'GET') {
      this._body = body;
    }

    return this;
  }

  headers(headers: http.IncomingHttpHeaders) {
    this._headers = headers;
    return this;
  }

  then<TResult1 = Response<T>, TResult2 = never>(
    onfulfilled?:
      | ((value: Response<T>) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    return this.doRequest().then(onfulfilled).catch(onrejected);
  }

  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): Promise<Response<T> | TResult> {
    return this.doRequest().catch(onrejected);
  }

  finally(onfinally?: (() => void) | null | undefined): Promise<Response<T>> {
    return this.doRequest().finally(onfinally);
  }
}
