# DD Flight CJS generator


A [Yeoman](http://yeoman.io/) generator for
[Flight CJS](http://flightjs.github.io/), a CJS fork of Twitter's client-side JavaScript
framework. It was inspired by the original Flight Generator [Flight](https://github.com/flightjs/generator-flight/)

It creates a standalone application running 
* `browserify (Module system)` 
* `flight-cjs (Component library)`
* `bootstrap-sass (UI library)`
* `jasmine, jasmine-jquery and jasmine-flight-cjs (Test libraries)`
* `karma with karma-browserify (Test runner)`
* `grunt (Task runner)`
* `browser-sync (Live reloader)`


## Recommended setup

Install [Node.js](http://nodejs.org/) (which comes with npm). It's best to have
npm version 1.2.x or above installed.

Next, globally install the Flight generator. This will automatically install
[Bower](http://bower.io/) and [Yo](http://yeoman.io/) as global dependencies.
These tools will help manage your dependencies and generate the boilerplate
Flight application.

```
npm install -g generator-flight-cjs
```

Make a new directory, and `cd` into it:

```
mkdir flight-app && cd $_
```

You're now ready to generate an app!


## Main generator

To generate a Flight-based application:

```
yo flight-cjs <app-name>
```

**N.B.** All your Node and client-side dependencies will be installed
automatically unless you include the `--skip-install` option.


## All generators and their output

Available generators (to be run in the root directory of a project).

* `flight-cjs <app-name>` (aka `flight:app`)
* `flight-cjs:component <component-name>`
* `flight-cjs:mixin <mixin-name>`
* `flightc-cjs:plugin <plugin-name>`

### flight:app

Scaffolds a Flight CJS application file structure, installs all the library code
you need, and correctly configures your test setup. The app generator will
prompt you to optionally install Bootstrap or Normalize.css.

Example:

```
yo flight-cjs myApp
```

Produces:

```
.
├── app
│   ├── styles
│   │   └── main.scss
│   ├── img
│   ├── scripts
│   │   ├── components
│   │   ├── mixins
│   │   ├── plugins
│   │   ├── app.js
│   │   └── main.js
├── dist
│   ├── scripts
│   │   ├── main.js
│   │   ├── vendor.js
│   │   ├── app.js
│   ├── styles
│   │   └── main.css
│   └── index.html
├── node_modules
├── bower_components
├── test
│   └── spec
│   	└── fixtures
├── .gitignore
├── .jshintrc
├── LICENSE.md
├── README.md
├── bower.json
├── Gruntfile.js
├── karma.conf.js
└── package.json
```

#### Locally installed software

Automatically installs all the Flight framework dependencies, and sets up a
Node-based toolchain for your development workflow.

**via Bower**

* [Modernizr](http://modernizr.com/)
* (optional) [DDBootstrap](https://github.com/DeloitteDigitalUK/DDBootstrap)
* (optional) [BootstrapSass](https://github.com/twbs/bootstrap-sass)

**via npm**

* [Flight CJS](https://github.com/DeloitteDigitalUK/DDFlight) (and its dependencies: ES5 Shim, jQuery)
* Flight CJS generator (installed as a local dependency)
* [Jasmine jQuery](https://github.com/velesin/jasmine-jquery) extensions
* [Jasmine Flight CJS](https://github.com/mo-lon/jasmine-flight) extensions
* [Grunt](http://gruntjs.com/) task runner
* [Karma](http://karma-runner.github.io/) unit test runner
* [Karma Browserify](https://github.com/Nikku/karma-browserify) karma extension
* [Node-Static](https://github.com/cloudhead/node-static/) file server

### flight:component

Generates a component in `app/scripts/components`.

Example:

```
yo flight:component skinChanger
```

Produces `app/scripts/components/skinChanger.js`:

```js
var component = require('flightjs/lib/component');

function skinChanger() {
	'use strict';
	/*jshint validthis:true */

    var self;

    this.attributes({
    });

    this.initEvents = function() {
    };

    this.after('initialize', function () {
    	self = this;

    	this.initEvents();
    });
}

module.exports = component(skinChanger);
```

And the test file `test/spec/skinChanger.spec.js`:

```js
describe('flight component', function() {
	'use strict';
	
	jasmine.getFixtures().fixturesPath = '/base/test/spec/fixtures/';
    jasmine.getJSONFixtures().fixturesPath = '/base/test/spec/fixtures/';
    var fixture = null; //readFixtures('NAME-OF-FIXTURE.html');    
    var jasmineFlight = require('../../node_modules/jasmine-flight/lib/jasmine-flight.js');
    
    beforeEach(function() {
    	var registry = require('flightjs/lib/registry');
    	this.Component = this.component = this.$node = null;
    	this.Component = require('../../app/scripts/components/skinChanger');
    	registry.reset();
        this.component = jasmineFlight.setupComponent(this, fixture);
    	jasmine.addMatchers(jasmineFlight.matchers);
    });

    afterEach(function () {
    	this.Component = require('../../app/scripts/components/skinChanger');
    	jasmineFlight.destroyComponent(this);
    	jasmineFlight.events.cleanUp();
    });

    it('needs to be defined', function() {
        expect(this.component).toBeDefined();
    });

});
```

### flight:mixin

Generates a mixin component in `app/scripts/mixins`.

Example:

```
yo flight:mixin border
```

Produces `app/scripts/mixins/withBorder.js`:

```js
function withBorder() {
	'use strict';
	/*jshint validthis:true */

    this.attributes({
    });

}
module.exports = withBorder;
```

And the test file `test/spec/withBorder.spec.js`:

```js
describe('flight component', function() {
	'use strict';
    var jasmineFlight = require('../../node_modules/jasmine-flight/lib/jasmine-flight.js');
    
    beforeEach(function() {
    	var registry = require('flightjs/lib/registry');
    	this.Component = this.component = this.$node = null;
    	this.Component = require('../../app/scripts/mixins/withBorder');
    	registry.reset();
        this.component = jasmineFlight.setupMixin(this, null);
    	jasmine.addMatchers(jasmineFlight.matchers);
    });

    afterEach(function () {
    	this.Component = require('../../app/scripts/mixins/withBorder');
    	jasmineFlight.destroyComponent(this);
    	jasmineFlight.events.cleanUp();
    });

    it('needs to be defined', function() {
        expect(this.component).toBeDefined();
    });

});
```

## Developing your application

The [generated application's README](lib/templates/app/README.md)
contains instructions on how to run the tests, server, and other tasks.


## Contributors

* [DeloitteDigitalUK](https://github.com/DeloitteDigitalUK/DDFlight)


## License

Licensed under the MIT License.
