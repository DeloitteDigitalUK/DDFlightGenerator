describe('flight component', function() {
	'use strict';
	
	<% if (type === 'component') { %>jasmine.getFixtures().fixturesPath = '/base/test/spec/fixtures/';
    jasmine.getJSONFixtures().fixturesPath = '/base/test/spec/fixtures/';
    var fixture = readFixtures('<%= fixture %>.html');<% } %>
    var jasmineFlight = require('../../node_modules/jasmine-flight/lib/jasmine-flight.js');
    
    beforeEach(function() {
    	var registry = require('flightjs/lib/registry');
        var component = require('flightjs/lib/component');
        this.Component = this.component = this.$node = null;
        <% if (type === 'component') { %>this.Component = require('../../app/scripts/<%= requirePath %>');
        registry.reset();
        this.component = jasmineFlight.setupComponent(this, fixture);<% } %> 
        <% if (type === 'mixin') { %>this.Component = component(function() {}, require('../../app/scripts/<%= requirePath %>'));
        registry.reset();
        this.component = jasmineFlight.setupMixin(this);<% } %>   
        jasmine.addMatchers(jasmineFlight.matchers);
    });

    afterEach(function () {
    	this.Component = require('../../app/scripts/<%= requirePath %>');
        <% if (type === 'component') { %>jasmineFlight.destroyComponent(this);<% } %>
        <% if (type === 'mixin') { %>jasmineFlight.destroyMixin(this);<% } %>
        jasmineFlight.events.cleanUp();
    });

    it('needs to be defined', function() {
        expect(this.component).toBeDefined();
    });

});