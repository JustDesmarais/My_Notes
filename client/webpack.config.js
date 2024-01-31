const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot:"only"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE App'
      }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    }), 
    new WebpackPwaManifest({
      // Create a manifest.json:
      name: 'My Text Editor PWA',
      short_name: 'JATE',
      description: 'A text editor to keep tabs on my tasks',
      background_color: '#ffffff',
      fingerprints: false,
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('assets', 'icons'),
        },
      ],
      orientation: "portrait",
      display: "standalone",
      start_url: "./",
      publicPath: './',
    }),
    ],

    module: {
      // CSS Loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        },
      ],
    },
  };
};
