/**
 * Module dependencies.
 */

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

/**
 * Generator constructor.
 *
 * @api public
 */

function Generator() {
	'use strict';
  yeoman.generators.NamedBase.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, '../../templates/'));
}

util.inherits(Generator, yeoman.generators.Base);

/**
 * Generate files for a Flight component
 *
 * @api public
 */

Generator.prototype.createComponentFiles = function createComponentFiles() {
	'use strict';
  this.name = this.name || 'myComponent';
  this.template('component.js', 'app/scripts/components/' + this.name + '.js');
  this.template('sass.js', 'app/styles/components/_' + this.name + '.scss');
  this.template('fixture.js', 'test/spec/fixtures/' + this.name.toUpperCase() + '.html');
  this.template('spec.js', 'test/spec/' + this.name + '.spec.js', {
    'requirePath': 'components/' + this.name,
    'type': 'component',
    'fixture': this.name.toUpperCase()
  });
};

/**
 * Inject component path in app.js
 *
 * @api public
 */

Generator.prototype.injectComponentPath = function injectComponentPath() {
	'use strict';
  this.name = this.name || 'myComponent';
  var hook   = '/*===== component hook =====*/',
      path   = 'app/scripts/app.js',
      file   = this.readFileAsString(path),
      insert = "app.components."+ this.name + " = require('./components/"+this.name+"');";

  if (file.indexOf(insert) === -1) {
    this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
  }
};

/**
 * Inject component stylesheet in main.scss
 *
 * @api public
 */

Generator.prototype.injectComponentStyle = function injectComponentStyle() {
  'use strict';
  this.name = this.name || 'myComponent';
  var hook   = '/*===== component hook =====*/',
      path   = 'app/styles/main.scss',
      file   = this.readFileAsString(path),
      insert = "@import \"./components/"+ this.name + "\";";

  if (file.indexOf(insert) === -1) {
    this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
  }
};

/**
 * Module exports.
 */

module.exports = Generator;