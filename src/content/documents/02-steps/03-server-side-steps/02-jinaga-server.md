---
title: Jinaga Server
---

Jinaga integrates with the Express server to provide data to your applications.
If you have not already done so, install the Express and Jinaga packages.

We will need to initialize Jinaga.
I like to initialize things in a separate file.
Create a new file called `jinaga.js`:

```javascript
const { JinagaServer } = require('jinaga');

function configureJinaga(app) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', handler);
}

module.exports = { configureJinaga };
```

Call it from `index.js`:

```javascript
// At the top
const { configureJinaga } = require('./jinaga');

// Before listen
configureJinaga(app);
```

Jinaga is now serving up data at `http://localhost:8080/jinaga`.
When you connect the client to that endpoint, it will sync up.