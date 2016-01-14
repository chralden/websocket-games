module.exports = function (grunt) {

    grunt.config.merge({
        
        //Clean for build process
        clean: {
            build: ['<%= settings.dest %>/*', '!<%= settings.dest %>/reports']
        },


        //Copy for build/watch process
        copy: {
            main: {
                //Copy all frontend folders excluding JS
                files: [
                    { expand: true, cwd: '<%= settings.src %>', src: ['**/*', '!**/<%= settings.jsDir %>**'], dest: '<%= settings.dest %>' }
                ]
            }
        },

        //Watch static files, copy assets and browserify scripts
        watch: {
            main: {
                files: [ '<%= settings.src %>**/*', '!<%= settings.src %>**/<%= settings.jsDir %>**'],
                tasks: ['copy:main']
            },
            scripts: {
                files: ['<%= settings.src %><%= settings.jsDir %>**/*.js', '<%= settings.src %><%= settings.jsDir %>**/*.jsx'],
                tasks: ['browserify']
            }
        },

        express: {
            dev: {
                options: {
                    port: 9022,
                    script: 'app/server.js'
                }
            }
        },

        browserify: {
            options: {
                alias: { 'react': './<%= settings.src %>vendor/react.js' },
                transform:  [ require('grunt-react').browserify ],
                browserifyOptions: {
                    debug: true,
                    extensions: ['.js','.jsx']
                }
            },
            main: {
                src: '<%= settings.src %><%= settings.jsDir %>main.js',
                dest: '<%= settings.dest %><%= settings.jsDir %>bundle.js'
            }
        }
    });

    // - - - - - - - - -  - - - - - - - - -  - - - - - - - - -
    grunt.registerTask('build', 'Not watching, just compiling.', ['clean:build', 'copy:main', 'browserify'] );
    grunt.registerTask('serve', 'Watching files, and running django, with trigger recompilation.', ['build', 'express:dev', 'watch'] );
    grunt.registerTask('just-watch', 'Watching files, with trigger recompilation.', ['build', 'watch'] );
    grunt.registerTask('default', 'Watching files, and running django, with trigger recompilation.', ['serve'] );
};