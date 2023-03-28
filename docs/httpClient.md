## Description

Here is a simple http(s) client which allows to perform
`GET`, `POST`, `PUT` and `DELETE` requests.

Also response will contain **parsed json** and could return it
with a type if it specified as generic (TS only).

Implemented for convenience with types, but **does not support response
stream features**.

## Usage

> **Note**
>
> All responses for any `Content-Type` will have `body` field of string type.
> The `json` field will have a parsed JSON object value for all responses which
> have `Content-Type: application/json` header, and `undefined` value for all other types.

### GET

```ts
const response = await nuti.http.get('http://localhost:3000/user');

console.log(response);
```

Expected output:

<!-- cspell:disable -->

```js
{
  status: 200,
  ok: true,
  contentLength: 23,
  headers: {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '23',
    etag: 'W/"17-notW5/nnoifrwkOLKeW655Vz8Xg"',
    date: 'Fri, 23 Dec 2022 10:38:05 GMT',
    connection: 'close'
  },
  json: { user: { name: 'some user', id: 'some id' } },
  body: '{"user":{"name":"some user","id":"some id"}}'
}
```

### POST

```ts
const response = await nuti.http
  .post('http://localhost:3000/user')
  .body({ name: 'some new user' });

console.log(response);
```

Expected output:

```js
{
  status: 201,
  ok: true,
  contentLength: 52,
  headers: {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '52',
    etag: 'W/"34-vZ5QItgbUr7K7/mmx0UbwgRbD+w"',
    date: 'Fri, 23 Dec 2022 10:45:34 GMT',
    connection: 'close'
  },
  json: { user: { name: 'some new user', id: 'some new id' } },
  body: '{"user":{"name":"some new user","id":"some new id"}}'
}
```

### PUT

```ts
const response = await nuti.http
  .put('http://localhost:3000/user')
  .body({ name: 'some updated user' });

console.log(response);
```

Expected output:

```js
{
  status: 200,
  ok: true,
  contentLength: 60,
  headers: {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '60',
    etag: 'W/"3c-EIJ+q9sLuMYRrdJsituIMyqNoJw"',
    date: 'Fri, 23 Dec 2022 10:47:09 GMT',
    connection: 'close'
  },
  json: { user: { name: 'some updated user', id: 'some updated id' } },
  body: '{"user":{"name":"some updated user","id":"some updated id"}}'
}
```

### DELETE

```ts
const response = await nuti.http
  .delete('http://localhost:3000/user')
  .body({ name: 'some user' });

console.log(response);
```

Expected output:

```js
{
  status: 204,
  ok: true,
  contentLength: 0,
  headers: {
    'x-powered-by': 'Express',
    date: 'Fri, 23 Dec 2022 10:48:00 GMT',
    connection: 'close'
  },
  json: undefined,
  body: ''
}
```

### Retry

> **Note**
>
> If `retry` method was called - `pipe` method will be disregarded.

**Does not mean to be used for 400+ status codes, but for connection errors and etc.**
If troubles with API for performing requests to are possible - `retry`
method can handle such requests and automatically perform new one.

By default retries to requiest in 10 seconds.

Following example will perform up to 3 additional requests, if main request has failed:

```ts
const response = await nuti.http
  .get('http://localhost:3000/possible-unavailable')
  .retry({ attempts: 3 });
```

Also, next request time can be specified (example - 25 seconds), and log can be added:

```ts
const response = await nuti.http
  .get('http://localhost:3000/possible-unavailable')
  .retry({ attempts: 3, interval: 25, logOnRetry: true });
```

### Pipe

> **Note**
>
> If `retry` method was called - `pipe` method will be disregarded.

Allows to pipe response to any `writable`/`duplex` stream. Also returns response as
`nuti.http.get()` request:

```ts
const stream = fs.createWriteStream('out.json');

const response = await nuti.http
  .get('http://localhost:3000/possible-unavailable')
  .pipe(stream);
```

### TS GENERIC TYPES

> **Note**
>
> Be mindful with Generic types, if you are not sure that your service is
> ging to return **exactly these values**. Any value is **posibly undefined**
> and may cause unexpected errors.

```ts
interface UserResponse {
  name: string;
  id: number;
}

const { json } = await nuti.http.get<UserResponse>(
  'http://localhost:3000/user',
);

if (json != null) {
  const { name, id } = json;

  console.log(`The "name" field has type "${typeof name}" and value "${name}"`);
  console.log(`The "id" field has type "${typeof id}" and value "${id}"`);
}
```

Expected output:

```log
The "name" field has type "string" and value "some user"
The "id" field has type "number" and value "123"
```

### NOT JSON CONTENT-TYPE

```ts
const response = await nuti.http
  .get('http://localhost:3000/')
  .headers({ 'content-type': 'text/html' });

console.log(response);
```

Expected output:

```js
{
  status: 200,
  ok: true,
  contentLength: 20,
  headers: {
    'x-powered-by': 'Express',
    'content-type': 'text/html; charset=utf-8',
    'content-length': '20',
    etag: 'W/"14-XVEfTf8cEMbur8HQBK5MH4vJQ7U"',
    date: 'Fri, 23 Dec 2022 10:52:59 GMT',
    connection: 'close'
  },
  json: undefined,
  body: '<h1>Hello Nuti!</h1>'
}
```

### 400+ status code responses

Lets pretend your server responds with `json` content-type for `404 Not Found` cases:

```ts
const response = await nuti.http.get('http://localhost:3000/not-found');

console.log(response);
```

Expected output:

```js
{
  status: 404,
  ok: false,
  contentLength: 23,
  headers: {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '23',
    etag: 'W/"17-SuRA/yvUWUo8rK6x7dKURLeBo+0"',
    date: 'Fri, 23 Dec 2022 11:04:07 GMT',
    connection: 'close'
  },
  json: { message: 'Not Found' },
  body: '{"message":"Not Found"}'
}
```
