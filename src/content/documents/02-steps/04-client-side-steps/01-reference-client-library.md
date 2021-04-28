---
title: "Reference the Client Library"
---

The Jinaga package contains two scripts.
One is for the server-side, and the other is for the client side.
The client-side library is an AMD package, and is intended to be used with a module loader such as [Require.JS](https://requirejs.org/).

If you prefer to use a packager like Webpack, then follow that step instead.

First install Require.js.

```bash
npm i requirejs
```

Then you can write a client-side application using Jinaga.
For example, this `main.js` can get you started:

```javascript
define(function (require) {
    const { JinagaBrowser } = require("jinaga");
    const j = JinagaBrowser.create({
        httpEndpoint: "/jinaga"
    });

    j.fact({
        type: "MyApplication.Visit",
        date: new Date()
    });
});
```

Pull it all together with an `app.js`:

```javascript
requirejs.config({
    baseUrl: 'scripts',
});

requirejs(['main']);
```

To get your application and Jinaga into the browser, serve the all of the JavaScript files from your app.
You can do this by adding routes to your `routes.js`:

```javascript
app.get("/scripts/app.js", (req, res, next) => {
    res.sendFile(path.join(__dirname, "app.js"));
});

app.get("/scripts/main.js", (req, res, next) => {
    res.sendFile(path.join(__dirname, "main.js"));
});

app.get("/scripts/require.js", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "node_modules", "requirejs", "require.js"));
});

app.get("/scripts/jinaga.js", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "node_modules", "jinaga", "dist", "jinaga.js"));
});
```

Then you can load your application from `index.html`:

```html
<script data-main="scripts/app.js" src="scripts/require.js"></script>
```