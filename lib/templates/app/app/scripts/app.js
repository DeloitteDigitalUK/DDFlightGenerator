/*global _:true */
var _ = require('lodash');

var app = {
	components: {},
	plugins: {}
};

/*===== plugin hook =====*/
// NB! The above line is required for our yeoman generator and should not be changed.


/*===== component hook =====*/
// NB! The above line is required for our yeoman generator and should not be changed.

//Attach Plugins to DOM
_.each(app.plugins, function(plugin, index) {
    'use strict';
    if (app.plugins.hasOwnProperty(index)) {
        if (app.plugins[index].hasOwnProperty('attachTo')) {
            app.plugins[index].attachTo($('body'));
        }
    }
});

//Attach Components to DOM
$('[data-component]').each(function(){
	'use strict';
    var $self = $(this),
        component = $self.data('component');

    if (app.components.hasOwnProperty(component)) {
        if (app.components[component].hasOwnProperty('attachTo')){
            app.components[component].attachTo($self);
        }
    }
});