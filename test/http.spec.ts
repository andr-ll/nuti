import * as http from 'http';
import nuti from '../src';
import { Logger } from '../src/logger';
import * as fs from 'fs';

interface CreateServerOptions {
  status?: number;
  contentType?: string;
  body?: unknown;
  fails?: number;
  port?: number;
}

const createServer = (options: CreateServerOptions = {}) => {
  const {
    status = 200,
    contentType = 'application/json',
    body = { data: 'some data' },
    fails = 0,
    port = 3000,
  } = options;
  let failRequest = fails;
  const server = http.createServer((_, res) => {
    if (failRequest > 0) {
      res.destroy();
      failRequest -= 1;
    }

    const jsonBody = JSON.stringify(body == null ? '' : body);
    const headers = {
      'Content-Type': contentType,
      ...(body == null ? {} : { 'Content-Length': jsonBody.length }),
    };

    res.writeHead(status, headers);

    body == null ? res.end() : res.end(jsonBody);
  });

  server.listen(port);

  return server;
};

describe('error handling', () => {
  it('throws and error if request is not going to be http(s)', async () => {
    expect.assertions(1);

    try {
      await nuti.http.get('ftp://localhost:3000');
    } catch (error) {
      expect(error.message).toStrictEqual('Unsupported protocol: ftp');
    }
  });

  it('throws and error and calls catch', async () => {
    expect.assertions(1);

    await nuti.http.get('ftp://localhost:3000').catch((error) => {
      expect(error.message).toStrictEqual('Unsupported protocol: ftp');
    });
  });

  it('throws and error if retry option interval is not valid', async () => {
    expect.assertions(1);

    try {
      await nuti.http
        .get('ftp://localhost:3000')
        .retry({ attempts: 2, interval: -1 });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Retry interval must not be less than 0',
      );
    }
  });

  it('throws and error if retry option attempts is not valid', async () => {
    expect.assertions(1);

    try {
      await nuti.http.get('ftp://localhost:3000').retry({ attempts: -2 });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Retry attempts must not be less than 0',
      );
    }
  });

  it('throws and error if request validation fails', async () => {
    expect.assertions(1);
    const server = createServer({ port: 3001 });

    try {
      await nuti.http.get('http://localhost:3001').validate({ name: 'string' });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Validation failed: key \'name\' is missing, but \'string\' type is required.',
      );
    }

    server.close();
  });
});

describe('http module test', () => {
  it('makes get request', async () => {
    expect.assertions(2);

    const server = createServer();

    const response = await nuti.http
      .get('http://localhost:3000')
      .validate({ data: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.data).toStrictEqual('some data');

    server.close();
  });

  it('makes get request with valid headers', async () => {
    expect.assertions(2);

    const server = createServer();

    const response = await nuti.http
      .get('http://localhost:3000')
      .headers({ 'accept-language': 'ENG' })
      .validate({ data: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.data).toStrictEqual('some data');

    server.close();
  });

  it('makes post request', async () => {
    expect.assertions(2);

    const server = createServer({
      status: 201,
      body: { created: 'success' },
    });

    const response = await nuti.http
      .post('http://localhost:3000')
      .body({ data: 'some-data' })
      .validate({ created: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.created).toStrictEqual('success');

    server.close();
  });

  it('makes put request', async () => {
    expect.assertions(2);

    const server = createServer({
      status: 200,
      body: { updated: 'success' },
    });

    const response = await nuti.http
      .put('http://localhost:3000')
      .body({ data: 'some-data' })
      .validate({ updated: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.updated).toStrictEqual('success');

    server.close();
  });

  it('makes delete request', async () => {
    expect.assertions(3);

    const server = createServer({
      status: 204,
      body: null,
    });

    const response = await nuti.http
      .delete('http://localhost:3000')
      .body({ data: 'some-data' });

    expect(response.json).toBeUndefined();
    expect(response.status).toStrictEqual(204);
    expect(response.contentLength).toStrictEqual(0);

    server.close();
  });

  it('makes get request and changes value with finally', async () => {
    expect.assertions(3);

    const server = createServer();

    const response = await nuti.http
      .get('http://localhost:3000')
      .validate({ data: 'string' })
      .finally(() => expect(1).toStrictEqual(1));

    expect(response.json).not.toBeUndefined();
    expect(response.json.data).toStrictEqual('some data');

    server.close();
  });

  it('makes get request with retries', async () => {
    expect.assertions(2);

    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});

    const server = createServer({ fails: 2 });

    const response = await nuti.http
      .get('http://localhost:3000')
      .retry({ attempts: 3, interval: 1, logOnRetry: true })
      .validate({ data: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.data).toStrictEqual('some data');

    server.close();
  });

  it('pipes response to the stream and overrides retry logic', async () => {
    expect.assertions(2);

    const stream = fs.createWriteStream('./test.log');

    jest
      .spyOn(fs.WriteStream.prototype, 'write')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation((() => {}) as any);

    const server = createServer();

    const response = await nuti.http
      .get('http://localhost:3000')
      .pipe(stream)
      .retry({ attempts: 3, interval: 1, logOnRetry: true })
      .validate({ data: 'string' });

    expect(response.json).not.toBeUndefined();
    expect(response.json.data).toStrictEqual('some data');

    server.close();
  });
});
