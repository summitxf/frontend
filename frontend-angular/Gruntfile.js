module.exports = function (grunt) {

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    grunt.initConfig({
        pkg    : grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    hostname  : 'localhost',
                    port      : 9090,
                    keepalive : true,
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
                    context: '/backend-service/cxf',
                    host   : 'localhost',
                    port   : 8080
                }]
            }
        },
        //清除目录
        clean  : {
            all: ['target/**']
        },
        copy   : {
            main: {
                files: [
                    {src: ['lib/cryptojs/*'], dest: 'target/frontend-angular/'},
                    {src: ['lib/*.min.js', 'lib/*.min.css'], dest: 'target/frontend-angular/'},
                    {src: ['fonts/*'], dest: 'target/frontend-angular/'},
                    {src: ['img/*'], dest: 'target/frontend-angular/'},
                    {src: ['templates/**'], dest: 'target/frontend-angular/'},
                    {src: ['*.html'], dest: 'target/frontend-angular/'}
                ]
            }
        },
        concat : {
            options: {
                separator: '\n /* ----- separator ----- */\n',
                banner   : '\n /* ----- banner ----- */\n',
                footer   : '\n /* ----- footer ----- */\n'
            },
            webapp : {
                src : ['js/*.js', 'js/**/*.js'],
                dest: 'target/frontend-angular/js/<%= pkg.name %>.js'
            }
        },
        uglify : {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build  : {
                src : 'target/frontend-angular/js/<%= pkg.name %>.js',
                dest: 'target/frontend-angular/js/<%= pkg.name %>.js'
            }
        },
        //压缩CSS
        cssmin : {
            options: {
                shorthandCompacting: false,
                roundingPrecision  : -1
            },
            target : {
                files: {
                    'target/frontend-angular/css/webapp.css': ['css/*.css']
                }
            }
        },
        usemin : {
            html: ['target/frontend-angular/index.html']
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

    grunt.registerTask('default', [
        'configureProxies:server',
        'connect:server'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
    ]);

};