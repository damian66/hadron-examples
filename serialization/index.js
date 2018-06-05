import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronExpress = require('@brainhubeu/hadron-express');
const hadronSerialization = require('@brainhubeu/hadron-serialization');

import data from './data.json';
import schema from './schema.json';

const app = new express();
const port = process.env.PORT || 3000;

hadron(
  app,
  [hadronExpress, hadronSerialization],
  {
    routes: {
      helloWorld: {
        path: '/:group',
        methods: ['GET'],
        callback: (serializer, group) =>
          Promise.all(
            data.map(user => serializer.serialize(user, ['mod'], 'User'))
          ).then(users => ({
            count: data.length,
            data: users
          })),
      }
    },
    serializer: {
      schemas: [ schema ],
    }
  }
).then(container => {
  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
})