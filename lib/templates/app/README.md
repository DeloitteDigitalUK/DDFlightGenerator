# flight app

## Installation

```
npm install & bower install
```


## Static file server

A local installation of [Grunt](http://gruntjs.com) provides a Node-based
foundation for running development and build tasks.

The watch task serves the contents of the 'app' directory on
`http://localhost:3080/`, and watches files for changes. Browser Sync 
automatically refreshes the browser tab when files are changed.

```
grunt serve
```

Additional tasks can be included in the `Gruntfile.js`. For further information
about using Grunt, please refer to the [Grunt website](http://gruntjs.com/).


## Unit tests

A local installation of Karma is used to run the JavaScript unit tests.
Karma makes it easy to watch files and run unit tests in real browsers:

```
grunt
```

This is the recommended approach because the moment your unit tests start
failing, you'll be notified in the terminal.

For further information about configuring Karma, please refer to the [Karma
website](http://karma-runner.github.io/).


## Contributing to this project

Anyone and everyone is welcome to contribute.