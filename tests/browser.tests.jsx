process.env.NODE_ENV = 'TEST';

// This is essentially bulk require
var req = require.context('../src', true, /test\.jsx$/);
req.keys().forEach(function (file) {
  req(file);
});
