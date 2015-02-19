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

Generator.prototype.createPluginFiles = function createPluginFiles() {
	'use strict';
  this.name = this.name || 'my_plugin';
  this.template('plugin.js', 'app/scripts/plugins/' + this.name + '.js');
  this.template('fixture.js', 'test/spec/fixtures/' + this.name.toUpperCase() + '.html');
  this.template('spec.js', 'test/spec/' + this.name + '.spec.js', {
    'requirePath': 'plugins/' + this.name,
    'type': 'component',
    'fixture': this.name.toUpperCase()
  });
};

/**
 * Inject plugin path in app.js
 *
 * @api public
 */

Generator.prototype.injectPluginPath = function injectPluginPath() {
	'use strict';
  this.name = this.name || 'my_component';
  var hook   = '/*===== plugin hook =====*/',
      path   = 'app/scripts/app.js',
      file   = this.readFileAsString(path),
      insert = "app.plugins."+ this.name + " = require('./plugins/"+this.name+"');";

  if (file.indexOf(insert) === -1) {
    this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
  }
};

/**
 * Module exports.
 */

module.exports = Generator;