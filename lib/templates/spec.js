describe('flight component', function() {
	'use strict';
	
	<% if (type === 'component') { %> jasmine.getFixtures().fixturesPath = '/base/test/spec/fixtures/';
    jasmine.getJSONFixtures().fixturesPath = '/base/test/spec/fixtures/';
    var fixture = null; //readFixtures('NAME-OF-FIXTURE.html');
    <% } %>
    
    var jasmineFlight = require('../../node_modules/jasmine-flight/lib/jasmine-flight.js');
    
    beforeEach(function() {
    	var registry = require('flightjs/lib/registry');
    	this.Component = this.component = this.$node = null;
    	this.Component = require('../../app/scripts/<%= requirePath %>');
    	registry.reset();
        <% if (type === 'component') { %> this.component = jasmineFlight.setupComponent(this, fixture);
        <% } %> 
        <% if (type === 'mixin') { %> this.component = jasmineFlight.setupMixin(this, null);
        <% } %>   
    	jasmine.addMatchers(jasmineFlight.matchers);
    });

    afterEach(function () {
    	this.Component = require('../../app/scripts/<%= requirePath %>');
    	jasmineFlight.destroyComponent(this);
    	jasmineFlight.events.cleanUp();
    });

    it('needs to be defined', function() {
        expect(this.component).toBeDefined();
    });

});