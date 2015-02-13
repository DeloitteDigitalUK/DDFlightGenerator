/**
 * Module dependencies.
 */

//var fs = require('fs');
var path = require('path');
var pkg = require('./../../../package.json');
var util = require('util');
var yeoman = require('yeoman-generator');

/**
 * Generator constructor.
 *
 * @api public
 */

function Generator() {
  'use strict';
  yeoman.generators.Base.apply(this, arguments);

  this.argument('name', { type: String, required: false });
  this.name = this.name || path.basename(process.cwd());
  this.genVersion = pkg.version;

  this.sourceRoot(path.join(__dirname, '../../templates/'));

  this.on('end', function () {
     
  });
}

util.inherits(Generator, yeoman.generators.Base);

/**
 * Prompts for information to seed the generated app
 *
 * @api public
 */

Generator.prototype.askFor = function askFor() {
  'use strict';
  var cb = this.async();

  var prompts = [
    {
      type: 'confirm',
      name: 'bootstrapREM',
      message: 'Include Bootstrap Sass REM?'
    },
    {
      type: 'confirm',
      name: 'bootstrap',
      message: 'Include Bootstrap Sass?',
      when: function (answers) {
        if (!answers.bootstrapREM) {
          return true;
        } else {
          return false;
        }
      }
    }
  ];

  this.prompt(prompts, function (props) {
    this.bootstrapREM = props.bootstrapREM;
    this.bootstrap = props.bootstrap;

    cb();
  }.bind(this));
};

/**
 * Setup the default directory structure
 *
 * @api public
 */

Generator.prototype.setupEnv = function setupEnv() {
  'use strict';
  this.mkdir('app');
  this.mkdir('app/styles');
  this.mkdir('app/styles/globals');
  this.mkdir('app/styles/components');
  this.mkdir('app/img');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/components');
  this.mkdir('app/scripts/mixins');
  this.mkdir('app/scripts/plugins');
  this.mkdir('test');
  this.mkdir('test/spec');
  this.mkdir('test/spec/fixtures');
  this.mkdir('dist');
};

/**
 * Generate the standard project files
 *
 * Copy over basic files that don't require any app-specific data.
 * Other files are templates that require app-specific data.
 *
 * @api public
 */

Generator.prototype.projectFiles = function projectFiles() {
  'use strict';
  // Create in generated root
  this.copy('app/karma.conf.js', 'karma.conf.js');
  this.copy('app/gitignore', '.gitignore');
  this.copy('app/Gruntfile.js', 'Gruntfile.js');
  this.copy('app/jshintrc', '.jshintrc');
  this.template('app/bower.json', 'bower.json');
  this.template('app/package.json', 'package.json');
  this.copy('app/LICENSE.md', 'LICENSE.md');
  this.copy('app/README.md', 'README.md');

  // Create in generated 'app' dir
  this.copy('app/app/scripts/app.js', 'app/scripts/app.js');
  this.copy('app/app/scripts/main.js', 'app/scripts/main.js');
  this.template('app/app/styles/main.scss', 'app/styles/main.scss');
  this.template('app/app/index.html', 'dist/index.html');

  // Create in generated 'test' dir
  
};

/**
 * Install dependencies and run grunt
 *
 * @api public
 */

Generator.prototype.install = function install() {
  'use strict';
  if(!this.options['skip-install']) {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['serve']);
      }.bind(this)
    });
  }
};

Generator.name = 'Flight';

/**
 * Module exports.
 */

module.exports = Generator;