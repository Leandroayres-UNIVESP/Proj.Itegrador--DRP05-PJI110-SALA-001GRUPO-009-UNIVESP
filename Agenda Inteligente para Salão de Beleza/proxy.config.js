const proxy = [
  {
    context: '/api',
    target: 'http://localhost:57239',
    pathRewrite: {'^/api' : ''}
  }
];module.exports = proxy;
