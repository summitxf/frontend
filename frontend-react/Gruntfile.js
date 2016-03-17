module.exports = function (grunt) {

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    grunt.initConfig({
        pkg       : grunt.file.readJSON('package.json'),
        connect   : {
            server: {
                options: {
                    hostname  : 'localhost',
                    port      : 9090,
                    //keepalive : true,
                    open      : true,
                    base      : '.',
                    middleware: function (connect, options) {

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var middlewares = [proxySnippet];

                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                },
                proxies: [{
                    context: '/backend-service',
                    host   : 'localhost',
                    port   : 8080
                }]
            }
        },
        clean     : {
            all: ['target/**', 'build/**']
        },
        babel     : {
            options: {
                //sourceMap: true,
                presets: ['es2015', 'react', 'stage-2']
            },
            dist   : {
                files: [{
                    expand: true,
                    cwd   : 'js/',
                    src   : ['**/*.js'],
                    dest  : 'build/'
                }]
            }
        },
        browserify: {
            dev: {
                files: {
                    "build/<%= pkg.name %>.js": "build/index.dev.js"
                }
            },
            prod: {
                files: {
                    "build/<%= pkg.name %>.js": "build/index.js"
                }
            }
        },
        copy      : {
            main: {
                files: [
                    {src: ['build/<%= pkg.name %>.js'], dest: 'target/webapp/js/<%= pkg.name %>.js'},
                    {src: ['*.html'], dest: 'target/webapp/'}
                ]
            }
        },
        // react js use browserify
        concat    : {
            options: {
                separator: '\n /* ----- separator ----- */\n',
                banner   : '\n /* ----- banner ----- */\n',
                footer   : '\n /* ----- footer ----- */\n'
            },
            webapp : {
                src : ['js/*.js', 'js/**/*.js'],
                dest: 'target/webapp/js/<%= pkg.name %>.js'
            }
        },
        uglify    : {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build  : {
                src : 'target/webapp/js/<%= pkg.name %>.js',
                dest: 'target/webapp/js/<%= pkg.name %>.js'
            }
        },
        cssmin    : {
            options: {
                shorthandCompacting: false,
                roundingPrecision  : -1
            },
            target : {
                files: {
                    'target/webapp/css/<%= pkg.name %>.css': ['css/*.css']
                }
            }
        },
        usemin    : {
            html: ['target/webapp/index.html']
        },
        watch     : {
            babel: {
                files: ['js/*.js','js/**/*.js'],
                tasks: ['babel:dist', 'browserify:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-browserify");

    grunt.registerTask('default', [
        'clean',
        'babel',
        'browserify:dev',
        'configureProxies:server',
        'connect:server',
        'watch:babel'
    ]);

    grunt.registerTask('build', [
        'clean',
        'babel',
        'browserify:prod',
        'copy',
        'uglify',
        'cssmin',
        'usemin'
    ]);

};