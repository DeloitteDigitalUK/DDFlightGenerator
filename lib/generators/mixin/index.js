/**
 * Module dependencies.
 */

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

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
 * Generate files for a Flight mixin
 *
 * @api public
 */

Generator.prototype.createMixinFiles = function createMixinFiles() {
	'use strict';
  this.name = this.name || 'my_mixin';
  this.template('mixin.js', 'app/scripts/mixins/with' + _.classify(this.name) + '.js');
  this.template('spec.js', 'test/spec/with' + _.classify(this.name) + '.spec.js', {
    'requirePath': 'mixins/with' + _.classify(this.name),
    'type': 'mixin'
  });
};

/**
 * Module exports.
 */

module.exports = Generator;