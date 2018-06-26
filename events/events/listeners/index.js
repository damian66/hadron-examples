export default [
  {
    name: 'Test',
    event: 'handleRequestCallbackEvent',
    handler: (request, ...rest) => {
      const { headers } = request;
      console.log('handleRequestCallbackEvent', headers);
      console.log('#####');
      console.log(rest);
    }
  },
  {
    name: 'Success',
    event: 'successEvent',
    handler: (key, ...rest) => {
      console.log(`You have successfully provided value of ${key}`);
    }
  },
  {
    name: 'Fail',
    event: 'failEvent',
    handler: (key, ...rest) => {
      console.log(`You have successfully provided value of ${key}`);
    }
  },
];