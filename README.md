# a mini web server

## install

```js
npm i webox-node
```

## simple start

```js
npx webox
```

The web server will listen on `127.0.0.1:80` and use `./webroot` as the root directory.

## publish your site

```js
npx webox 0.0.0.0:80 public
```

The web server will listen on `0.0.0.0:80` and use `./public` as the root directory.

Other users can use your internal ip to access your published site.

## run js cgi module

Dynamically parse `*.cgi` or '`*.cgi.js`, and then output the result to browser.

## config env list

- `WEBOX_HOST`, default value is `127.0.0.1`

- `WEBOX_PORT`, default value is `80`

- `WEBOX_ROOT`, default value is `webroot`

- `WEBOX_PLUG`, default value is `[]`

- `WEBOX_INDEX`, default value is

```
['index.html', 'index.htm', 'index.cgi']
```

- `WEBOX_ERROR`, default value is

```
{
    200: '%s',
    404: 'File Not Found: %s',
    503: 'Server Internal Error: %s'
}
```

- `WEBOX_FAILED`, default value is `undefined`
