module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: 'assets/sass/**/*',
				tasks: ['compass:dev']
			},
			neuter: {
				files: ['app/**/*.js'],
                tasks: ['neuter']
			},
			emberTemplates: {
				files: 'app/templates/**/*.hbs',
				tasks: ['emberTemplates']
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'assets/sass',
					cssDir: 'public/dev/css'
				}
			},
			prod: {
				options: {
					sassDir: 'assets/sass',
					cssDir: 'public/prod/css',
					outputStyle: 'compressed'
				}
			}
		},
		neuter: {
			dev: {
                options: {
                    filepathTransform: function (filepath) {
                        return 'app/' + filepath;
                    }
                },
				src: 'app/app.js',
				dest: 'public/dev/js/app.js'
			}
		},
       	copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'public/dev',
                    dest: 'public/prod',
                    src: [
                        'js/libs.js',
                        'js/global.js',
                        'js/libs/html5shiv.js',
                        'js/libs/respond.min.js'
                    ]
                }]
            }
        },
		htmlmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'public/dev',
                    src: '*.html',
                    dest: 'public/prod'
                }]
            }
        },
		useminPrepare: {
			html: 'public/dev/index.html',
			options: {
                dest: 'public/prod'
            }
		},
		usemin: {
			html: ['public/prod/index.html'],
		},
		clean: ["public/prod/js/**/*", "public/prod/css/**/*"],
		rev: {
			assets: {
				files: [{
					src: ['public/prod/js/libs.js', 'public/prod/js/global.js', 'public/prod/css/global.css']
				}]
			}
		},
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                	console.log(sourceFile)
                    var templatePath = 'app/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            prod: {
                files: {
                    'public/dev/js/templates.js': 'app/templates/**/*.hbs'
                }
            }
        },
		connect: {
			app: {
				options: {
					port: 8000,
					base: 'public/dev'
				}
			}
		}
	});

	grunt.registerTask('database', 'Deployd', function() {
		grunt.util.spawn({
			cmd: 'node',
			args: ['connect.js'],
			opts: {stdio: 'inherit'}
		});
	});

	grunt.registerTask('default', ['compass:dev', 'neuter', 'emberTemplates']);
	grunt.registerTask('prod', ['clean', 'compass:prod', 'neuter', 'emberTemplates', 'copy', 'htmlmin', 'useminPrepare', 'concat', 'uglify', 'rev', 'usemin' ]);
	grunt.registerTask('run', ['database', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-neuter');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-contrib-clean');

};