import express from 'express';
import hadron from '@brainhubeu/hadron-core';

const hadronExpress = require('@brainhubeu/hadron-express');
const hadronSerialization = require('@brainhubeu/hadron-serialization');

import data from './data.json';
import UserSchema from './schemas/User.json';

const app = new express();
const port = process.env.PORT || 3000;

const routeCallback = (serializer, group) =>
  Promise.all(
    data.map(user => serializer.serialize(user, [group], 'User'))
  ).then(users => ({
    count: data.length,
    data: users
  }));

hadron(
  app,
  [hadronExpress, hadronSerialization],
  {
    routes: {
      routeWithGroup: {
        path: '/:group?',
        methods: ['GET'],
        callback: routeCallback,
      }
    },
    serializer: {
      schemas: [UserSchema],
    }
  }
).then(container => {
  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
})