import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronExpress = require('@brainhubeu/hadron-express');

const app = new express();
const port = process.env.PORT || 3000;

hadron(
  app,
  [hadronExpress],
  {
    routes: {
      helloWorld: {
        path: '/',
        methods: ['GET'],
        callback: () => 'Hello world !',
      }
    }
  }
).then(container => {
  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
})