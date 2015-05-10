module.exports = function(grunt) {
	"use strict";
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: {
			dev: './src',
			dist: './dist'
		},
		uglify: {
			dist: {
				src: '<%= config.dev %>/<%= pkg.name %>.js',
				dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
			},
			options: {
				banner: '/*! <%= pkg.name %> | <%= pkg.version %> | <%= pkg.author %> | <%= pkg.version %> | <%= pkg.homepage %> */\n',
				preserveComments: false,
				sourceMap: true
			}
		},
		watch: {
			script: {
				files: ['<%= config.dev %>/{,/*}*.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['uglify']);
};