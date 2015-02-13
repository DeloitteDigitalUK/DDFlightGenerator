'use strict';
/*global describe:true, beforeEach:true, it:true */

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('flight-cjs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
        return;
      }

      this.app = helpers.createGenerator('flight-cjs:app', [
        '../../lib/generators/app'
      ]);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  describe('app generator', function() {
    it('creates expected files', function (done) {
      var expected = [
        // dotfiles
        './.gitignore',
        './.jshintrc',
        // config files
        './bower.json',
        './Gruntfile.js',
        './karma.conf.js',
        './package.json',
        './README.md',
        './LICENSE.md',
        // app
        'app/scripts/main.js',
        'app/scripts/app.js',
        'app/styles/main.scss',
        'dist/index.html'
      ];

      helpers.mockPrompt(this.app, {
        'bootstrapREM': 'Y',
      });

      this.app.run(function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });
 
});

