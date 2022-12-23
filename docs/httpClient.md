## Description

Here is a simple `json`-like http(s) client which
allows to perform `GET`, `POST`, `PUT` and `DELETE` requests.

Also response will contain **parsed json** and could return it
with a type if it specified as generic (TS only).

## Usage

> **Note**
>
> All responses for any `Content-Type` will have `body` field of string type.
> The `json` field will have a parsed JSON object value for all responses which
> have `Content-Type: application/json` header, and `undefined` value for all other types.

### GET

```ts
const response = await nuti.req.get('http://localhost:3000/user');

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
const response = await nuti.req.post('http://localhost:3000/user', {
  name: 'some new user',
});

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
const response = await nuti.req.put('http://localhost:3000/user', {
  name: 'some updated user',
});

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
const response = await nuti.req.delete('http://localhost:3000/user', {
  name: 'some user',
});

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

### NOT JSON CONTENT-TYPE

```ts
const response = await nuti.req.get('http://localhost:3000/', {
  'content-type': 'text/html',
});

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

### FAILED REQUEST

Lets pretend your server has responds with `json` content-type for `404 Not Fund` cases:

```ts
const response = await nuti.req.get('http://localhost:3000/foo', {
  'content-type': 'text/html',
});

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
