module.exports = function(grunt) {

    // get settings
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: grunt.file.readJSON("grunt-tasks/settings.json")
    });

    // load all NPM grunt tasks
    require('load-grunt-tasks')(grunt);

    // load all internal grunt tasks from "/grunt-tasks/" directory
    grunt.loadTasks('grunt-tasks');

};