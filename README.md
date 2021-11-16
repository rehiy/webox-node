# Webox-node is a Dynamic JS HTTP server

Webox-node can execute js file through node-cli, just like CGI. It can also load js file as commonjs module, just like PHP and ASP.

## install

```js
npm i webox-node
```

## simple start

```js
npx webox
```

The web server will listen on `127.0.0.1:80` and use `./webroot` as the root directory.

## publish your website

```js
npx webox 0.0.0.0:80 public
```

The web server will listen on `0.0.0.0:80` and use `./public` as the root directory.

Other users can use your internal ip to access your published site.

## execute js as cgi script

Dynamically parse `*.cgi` or '`*.cgi.js`, and then output the result to browser.

## load js as commonjs module

Dynamically parse `*.cjs` or '`*.cjs.js`, and then output the result to browser.

## normal exit with 0 or 1

Set `process.env.WEBOX_EXIT_CODE` to `1`, Even if the program exits normally, an error will be reported.

## start from cli

```
webox 127.0.0.1:80 webroot
```

## start from js

```
let app = require('webox-node');

app.init({

    mode: 'development',

    host: '127.0.0.1',

    port: 80,

    root: 'webroot',

    index: [
        'index.html',
        'index.htm'
    ],

    error: {
        200: '%s',
        400: 'Bad Request: %s',
        403: 'Forbidden : %s',
        404: 'NO Found: %s',
        500: 'Internal Server Error: %s',
        503: 'Service Unavilable: %s'
    }

});

```
