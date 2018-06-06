import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronEvents = require('@brainhubeu/hadron-events');
const hadronExpress = require('@brainhubeu/hadron-express');

const app = new express();
const port = process.env.PORT || 3000;

hadron(
  app,
  [hadronEvents, hadronExpress],
  {
    routes: {
      helloWorld: {
        path: '/',
        methods: ['GET'],
        callback: () => 'Check server\'s console !',
      }
    },
    events: {
      listeners: [
        {
          name: 'Test',
          event: 'handleRequestCallbackEvent',
          handler: (data, ...rest) => {
            console.log('handleRequestCallbackEvent', data, ...rest);
            data();
          }
        },
        {
          name: 'adsa',
          event: 'handleInitializeApplicationEvent',
          handler: (data, ...rest) => {
            console.log('handleInitializeApplicationEvent', data, ...rest);
            data();
          }
        },
        {
          name: 'dadada',
          event: 'handleTerminateApplicationEvent',
          handler: (data, ...rest) => {
            console.log('handleTerminateApplicationEvent', data, ...rest);
            data();
          }
        },
        {
          name: 'custom',
          event: 'customEvent',
          handler: (cb) => {
            console.log('???');
            cb();
          }
        },
      ],
    }
  }
).then(container => {
  const eventManager = container.take('eventManager');
  // eventManager.registerEvents([]);

  eventManager.emitEvent('customEvent');

  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
})