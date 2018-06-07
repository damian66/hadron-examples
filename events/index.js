import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronEvents = require('@brainhubeu/hadron-events');
const hadronExpress = require('@brainhubeu/hadron-express');
import listeners from './events/listeners';

const app = new express();
const port = process.env.PORT || 3000;

hadron

hadron(
  app,
  [hadronExpress, hadronEvents],
  {
    routes: {
      customEventRoute: {
        path: '/:key?',
        methods: ['GET'],
        callback: (request, container) => {
          const { params: { key } } = request;
          const eventToEmit = (key === 'foo' && 'successEvent') || 'failEvent';
          container.eventManager.emitEvent({ event: 'handleRequestCallbackEvent' });
          return { 
            body: {
              "key": key || null,
              "eventEmitted": eventToEmit,
            },
          };
        },
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