/*jshint camelcase: false */

module.exports = function(grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);


    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        bower: 'bower_components',
        test: 'test',
    };

    grunt.initConfig({

        config: config,

        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: '.'
                }
            }
        },

        'bower-install-simple': {
            prod: {
                options: {
                    production: true
                }
            },
            dev: {
                options: {
                    production: false
                }
            }
        },

        concurrent: {
            server: [
                'sass:dev'
            ]
        },

        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/styles/',
                    src: ['*.scss'],
                    dest: '<%%= config.dist %>/styles',
                    ext: '.css'
                }]
            }
        },

        browserify: {
            vendor: {
                src: [],
                dest: '<%%= config.dist %>/scripts/vendor.js',
                options: {
                    require: ['lodash', 'es5-shim'],
                    alias: [
                        
                    ]
                }
            },
            client: {
                src: '<%%= config.app %>/scripts/main.js',
                dest: '<%%= config.dist %>/scripts/app.js',
                options: {
                    external: ['lodash', 'es5-shim']
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%%= config.app %>/styles/**',
                        '<%%= config.app %>/scripts/{,*/}*.js',
                        '<%%= config.dist %>/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'localhost:9001',
                    port: 3000 
                    
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/scripts/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },

        concat: {
            '<%%= config.dist %>/scripts/main.js': ['<%%= config.dist %>/scripts/vendor.js', '<%%= config.dist %>/scripts/app.js']
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= config.bower %>/bootstrap-sass/assets/fonts/bootstrap/',
                        src: '**',
                        dest: '<%%= config.dist %>/fonts/bootstrap/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: ['Chrome']
            }
        },

        watch: {
            bower: {
                files: ['bower.json']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            js: {
                files: ['<%%= config.app %>/scripts/**/*.js'],
                tasks: ['jshint', 'browserify', 'concat']
            },
            jstest: {
                files: ['test/spec/*.js'],
                tasks: ['karma:continuous']
            },
            sass: {
                files: ['<%%= config.app %>/styles/**/*.{scss,sass}'],
                tasks: ['sass:dev']
            }
        }

    });

    grunt.registerTask('serve', function() {

        grunt.task.run([
            'concurrent:server',
            'browserify',
            'concat',
            'connect:server',
            'browserSync',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'bower-install-simple:dev',
        'concurrent:server',
        'copy:main',
        'jshint',
        'browserify',
        'concat'
    ]);
};