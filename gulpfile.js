'use strict';

var fs = require('fs'),
  url = require('url'),
  path = require('path');

var gulp = require('gulp-help')(require('gulp')),
  gchanged = require('gulp-changed'),
  gutil = require('gulp-util'),
  gif = require('gulp-if'),
  gawspublish = require('gulp-awspublish'),
  gawspublishRouter = require('gulp-awspublish-router'),
  gfilter = require('gulp-filter'),
  concurrentTransform = require('concurrent-transform'),
  runSequence = require('run-sequence');

var webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server');

var config = require('./config')({
  hot: true
});

gulp.task('webpack', function(done) {
  webpack(config.webpack, function(err, stats) {
    if (err) { return done(err); }

    gutil.log(stats.toString({
      colors: true
    }));

    if (gutil.env['save-stats']) {
      fs.writeFile(path.join(config.paths.dist, 'webpack.stats.' + stats.hash + '.json'),
                   JSON.stringify(stats.toJson(), null, 2),
                   done);
    } else {
      done();
    }
  });
}, {
  options: {
    'save-stats': 'Save Webpack stats file to webpack.stats.<hash>.json with the distribution'
  }
});

gulp.task('webpack-dev-server', function(done) {
  new WebpackDevServer(webpack(config.webpack), config.webpackServer)
    .listen(config.webpackServer.port, config.webpackServer.hostname, function(err) {
      if (err) { return done(err); }
      gutil.log('Server running at ' + config.webpackServer.url);
    });
});

gulp.task('copy-static', function(done) {
  return gulp.src(path.join(config.paths.static, '**', '*'),
                  { base: config.paths.static })
    .pipe(gchanged(config.paths.dist))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('test', function(done) {
  /*
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done);
  */
});

gulp.task('publish', function(done) {
  var filter = gfilter(['**/*', '!*.hot-update.{js,json}']);

  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = gawspublish.create(config.aws.options);

  return gulp.src(path.join(config.paths.dist, '**', '*'))
    .pipe(filter)

    // apply config by filename/path
    .pipe(gawspublishRouter(config.aws.router))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(concurrentTransform(publisher.publish(config.aws.headers || {}), 10))

    // optionally sync the bucket (remove files not in current dist)
    .pipe(gif(config.aws.sync, publisher.sync()))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(gawspublish.reporter());
});


gulp.task('serve',
          'Run a development server for testing',
          ['webpack-dev-server']);
gulp.task('dist',
          'Compile a distribution build of the application',
          ['webpack', 'copy-static']);
gulp.task('deploy',
          'Compile a distribution build and publish it to S3',
          function(done) {
            runSequence('dist',
                        'publish',
                        done);
          });
