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

## exit with 0 or 1

Set `process.env.WEBOX_FAILED` to `1`, and exit with error code 1.

## config with file

Please set `process.env.WEBOX_CONF_FILE` to config file path.

```
module.exports = {

    WEBOX_HOST: '127.0.0.1',

    WEBOX_PORT: 80,

    WEBOX_ROOT: 'webroot',

    WEBOX_PLUG: [],

    WEBOX_INDEX: [
        'index.html',
        'index.htm',
        'index.cgi'
    ],

    WEBOX_ERROR: {
        200: '%s',
        404: 'File Not Found: %s',
        503: 'Server Internal Error: %s'
    },

    WEBOX_FAILED: null

};

```
