const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.BUILD_ES ? 'index.es.js' : 'index.js',
    libraryTarget: 'commonjs2',
  },

  optimization: {
    minimize: process.env.MINIMIZE === 'true',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          /\test.js$/,
        ],
      },
      {
        /** Workaround while waiting for https://github.com/madrobby/zepto/pull/1319 */
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /e.data = data/g,
              replacement: function() { 
                return `
                  var dataPropDescriptor = Object.getOwnPropertyDescriptor(e, 'data')
                  if (!dataPropDescriptor || dataPropDescriptor.writable) {
                    try {
                      e.data = data
                    } catch (error) { }
                  }
                `; 
              },
            }
          ]
        }),
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.RESET_APP_DATA_TIMER': JSON.stringify(''),
    }),
  ],
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
};
