module.exports = {
  entry: {
    app: './src/app.jsx',
    tests: './tests/browser.tests.jsx'
  },
  devtool: 'source-map', //not good for ff
  output: {
    path: __dirname + '/public',
    filename: '[name].bundle.js'
  },
  // this is for joi
  node: {
    net: 'empty',
    dns: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx/,
        loaders:  ['babel-loader', 'jsx-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
