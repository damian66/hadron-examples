import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronEvents = require('@brainhubeu/hadron-events');
const hadronExpress = require('@brainhubeu/hadron-express');
import listeners from './events/listeners';

const app = new express();
const port = process.env.PORT || 3000;

hadron(
  app,
  [hadronExpress, hadronEvents],
  {
    routes: {
      helloWorld: {
        path: '/',
        methods: ['GET'],
        callback: () => 'Check server\'s console !',
      }
    },
    events: {
      listeners,
    }
  }
).then(container => {
  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
})