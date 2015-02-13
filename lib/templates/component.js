/*global flight:true */
var component = require('flightjs/lib/component');

function <%= _.camelize(name) %>() {
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

module.exports = component(<%= _.camelize(name) %>);