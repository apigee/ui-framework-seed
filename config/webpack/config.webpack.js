'use strict';

var path = require('path'),
  _ = require('lodash'),
  mergeDefaults = require('merge-defaults'),
  gitRev = require('git-rev-sync'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  BowerWebpackPlugin = require('bower-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = function(config, options) {
  options = mergeDefaults(_.clone(options), {
    webpack: {
      assets: {
        // asset output filename template
        // (see https://github.com/webpack/file-loader/blob/master/README.md)
        filename: '[name].[sha512:hash:base64:7].[ext]',
        path: '/'
      }
    }
  });

  // Loader config boilerplate generator for asset files (e.g. images, fonts)
  // see options.webpack.assets
  function assets(loaderConfig, assetOptions) {
    assetOptions = assetOptions || {};
    assetOptions = mergeDefaults(_.clone(assetOptions), options.webpack.assets);

    var pathname = path.join(assetOptions.path, assetOptions.filename);

    return mergeDefaults(_.clone(loaderConfig), {
      loaders: ['file?name=' + pathname]
    }, loaderConfig);
  }

  var webpackConfig = {
    context: config.paths.app,

    entry: ['./app.less', './app'],

    output: {
      path: config.paths.dist,
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[chunkhash].bundle.js'
    },

    cache: true,

    resolve: {
      root: [
        config.paths.components
      ],

      // look for modules installed by both npm and bower
      modulesDirectories: [
        'node_modules',
        'bower_components',
        'web_modules'
      ],

      alias: {}
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(/* preferEntry= */ true),

      // Generate index.html
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(config.paths.app, 'index.tmpl.html'),
        buildOptions: options
      }),

      // bundle CSS into a single file
      new ExtractTextPlugin('[name].[hash].bundle.css?[chunkhash]-[contenthash]', {
        disable: true
      }),

      // support require()ing bower components
      new BowerWebpackPlugin(),

      // constants, replaced in code at compile time
      new webpack.DefinePlugin({
        __BUILD_ENV__: JSON.stringify(options.buildEnv),
        __APP_ENV__: JSON.stringify(options.appEnv),
        __GIT_REV__: JSON.stringify(gitRev.short())
      })
    ],

    recordsPath: path.resolve(config.paths.root, 'webpack.records.json'),

    module: {
      noParse: [],

      preLoaders: [],
      loaders: [
        // format-specific

        // JS (ES6)
        {
          test: /\.js/,
          include: [
            config.paths.app
          ],
          loaders: [
            'ng-annotate?regex=^$', // disable short form injection
            'babel?optional=runtime'
          ]
        },

        // HTML
        {
          test: /\.html/,
          loaders: ['html']
        },

        // CSS
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
        },

        // LESS
        {
          test: /\.less/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
        },

        // JSON
        {
          test: /\.json/,
          loaders: ['json']
        },

        // assets

        // SWF
        assets(
          { test: /\.swf/ },
          { path: 'swf' }
        ),

        // webfonts
        assets(
          { test: /\.(?:woff2?|ttf|otf|eot)/ },
          { path: 'fonts' }
        ),
        assets(
          { test: /font.*\.svg/ },
          { path: 'fonts' }
        ),

        // images
        assets(
          { test: /\.(?:png|jpe?g|gif)/ },
          { path: 'images' }
        ),
        assets(
          {
            test: /\.svg/,
            exclude: /font.*\.svg/
          },
          { path: 'images' }
        )
      ],
      postLoaders: []
    }
  };

  if (options.buildEnv === 'production') {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true },
      mangle: { screw_ie8: true },
      output: { screw_ie8: true }
    }));

    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

    webpackConfig.profile = true;
  } else if (options.buildEnv === 'development' || options.buildEnv === 'test') {
    webpackConfig.debug = true;
    webpackConfig.output.pathinfo = true;

    webpackConfig.devtool = 'cheap-source-map';
    // webpackConfig.profile = true;
  }

  if (options.buildEnv === 'test') {
    webpackConfig.entry = []; // TODO
  }

  if (options.eslint || options.buildEnv === 'production') {
    webpackConfig.module.preLoaders.push({
      test: /\.js$/,
      exclude: /node_modules|bower_components/,
      loaders: ['eslint']
    });
  }

  if (typeof options.progress === 'function') {
    var callback = options.progress.bind(webpackConfig);

    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.unshift(new webpack.ProgressPlugin(callback));
  }

  if (options.hot) {
    webpackConfig.plugins.push(new HotModuleReplacementPlugin());
  }

  return webpackConfig;
};
