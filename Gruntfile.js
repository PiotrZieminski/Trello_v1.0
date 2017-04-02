module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/Style.css': 'sass/Style.sass'
                }
            }
        },

        watch: {
            scripts: {
                files: ['sass/*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            }
        },


    });
    // Load the plugins tasks
    grunt.loadNpmTasks('grunt-sass');

    // Default task(s).

    grunt.registerTask('default', ['sass']);

};

