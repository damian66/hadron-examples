export default [
  {
    name: 'Test',
    event: 'handleRequestCallbackEvent',
    handler: (request, ...rest) => {
      console.log('handleRequestCallbackEvent', request);
      console.log('#####');
      console.log(rest);
    }
  },
];