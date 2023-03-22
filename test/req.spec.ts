import * as http from 'http';
import nuti from '../src';

interface CreateServerOptions {
  status?: number;
  contentType?: string;
  body?: unknown;
}

const createServer = (options: CreateServerOptions = {}) => {
  const {
    status = 200,
    contentType = 'application/json',
    body = { data: 'some data' },
  } = options;
  const server = http.createServer((_, res) => {
    const jsonBody = JSON.stringify(body == null ? '' : body);
    const headers = {
      'Content-Type': contentType,
      ...(body == null ? {} : { 'Content-Length': jsonBody.length }),
    };

    res.writeHead(status, headers);

    body == null ? res.end() : res.end(jsonBody);
  });

  server.listen(3000);

  return server;
};

describe('error handling', () => {
  it('throws and error if request is not going to be http(s)', async () => {
    expect.assertions(1);

    try {
      await nuti.req.get('ftp://localhost:3000');
    } catch (error) {
      expect(error.message).toStrictEqual('Unsupported protocol: ftp');
    }
  });

  it('throws and error and calls catch', async () => {
    expect.assertions(1);

    await nuti.req.get('ftp://localhost:3000').catch((error) => {
      expect(error.message).toStrictEqual('Unsupported protocol: ftp');
    });
  });
});

describe('req module test', () => {
  it('makes get request', async () => {
    expect.assertions(2);

    const server = createServer();

    const response = await nuti.req.get<{ data: string }>(
      'http://localhost:3000',
    );
    expect(response.json).not.toBeUndefined();
    expect(response.json?.data).toStrictEqual('some data');

    server.close();
  });

  it('makes get request with valid headers', async () => {
    expect.assertions(2);

    const server = createServer();

    const response = await nuti.req
      .get<{ data: string }>('http://localhost:3000')
      .headers({ 'accept-language': 'ENG' });

    expect(response.json).not.toBeUndefined();
    expect(response.json?.data).toStrictEqual('some data');

    server.close();
  });

  it('makes post request', async () => {
    expect.assertions(2);

    const server = createServer({
      status: 201,
      body: { created: 'success' },
    });

    const response = await nuti.req
      .post<{ created: string }>('http://localhost:3000')
      .body({ data: 'some-data' });

    expect(response.json).not.toBeUndefined();
    expect(response.json?.created).toStrictEqual('success');

    server.close();
  });

  it('makes put request', async () => {
    expect.assertions(2);

    const server = createServer({
      status: 200,
      body: { updated: 'success' },
    });

    const response = await nuti.req
      .put<{ updated: string }>('http://localhost:3000')
      .body({ data: 'some-data' });

    expect(response.json).not.toBeUndefined();
    expect(response.json?.updated).toStrictEqual('success');

    server.close();
  });

  it('makes delete request', async () => {
    expect.assertions(3);

    const server = createServer({
      status: 204,
      body: null,
    });

    const response = await nuti.req
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

    const response = await nuti.req
      .get<{ data: string }>('http://localhost:3000')
      .finally(() => expect(1).toStrictEqual(1));

    expect(response.json).not.toBeUndefined();
    expect(response.json?.data).toStrictEqual('some data');

    server.close();
  });
});
