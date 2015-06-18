# Apigee UI Framework Seed

This is a seed project for a static web app that uses [Angular.js](http://angular.io) and [Apigee UI Framework](https://github.com/apigee/ui-framework).

## Building

### Dependencies

* [Node.js + npm](https://nodejs.org)
* [Bower](http://gulpjs.com)
* [Gulp](http://gulpjs.com)

### Setup

1. Run `bower install`
2. Run `npm install`

### Build configuration

Gulp expects two environment variables to be set:

* `BUILD_ENV`: Environment that controls options which affect code generation (e.g. sourcemaps, live reloading, debug logging), but not overall app logic. One of `production` (for deployed builds), `development` (for local debugging and development), or `test` (for testing/CI)
* `APP_ENV`: Environment that controls application logic, variable values, and resources that it uses while running. This is app-specific, and is generally used to pass a different JSON config file into the app depending on value, which corresponds to a file (name without extension) in the `/config/app/environment` directory. Default is `default`.

### Development builds

#### Run local server

    $ BUILD_ENV=development APP_ENV=prod gulp serve
    ...
    [16:32:50] Server running at http://localhost:3000
    ...

Webpack will recompile and refresh the page on code changes.

### Production builds

Substitute environment variables as necessary.

#### Build only

    $ BUILD_ENV=production APP_ENV=prod gulp dist
    ...
    $ open dist/

#### Deploy only (publish to S3)

    $ APP_ENV=prod AWS_PROFILE=default gulp publish

#### Build and deploy

    $ BUILD_ENV=production APP_ENV=prod AWS_PROFILE=default gulp deploy
