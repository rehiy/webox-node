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
