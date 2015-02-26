// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

module.exports = function (config) {
  'use strict';

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: [
      'jasmine',
      'browserify'
    ],

    preprocessors: {
      'test/**/*.html': [],
      'test/**/*.js': ['browserify'],
    },

    // list of files / patterns to load in the browser
    files: [
      // es5-shim
      'node_modules/es5-shim/es5-shim.js',
      // jquery
      'node_modules/jquery/dist/jquery.js',
      // jasmine-jquery
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      //fixtures
      'test/spec/fixtures/**/*.html',
      // tests
      'test/spec/**/*.js'
    ],

    // excluded files
    exclude: [
    ],

    browserify: {
      debug: true,
      watch: true,
      bundleDelay: 750,
      transform: ['browserify-shim']
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    // CLI --browsers Chrome, Firefox, Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // web server port
    port: 9876
  });
};