module.exports = function(grunt) {
  /*
   * Include grunt configuration
   */
  var gruntConfig = require( './config/grunt.conf.js' );

  /*
   * Helpers (preparing for grunt util deprecation)
   */
  var glob = require('glob');

  /*
   * Time grunt execution
   */
  require('time-grunt')(grunt);

  /*
   * JIT Grunt will automatically load other npm tasks
   */
  require('jit-grunt')(grunt);
  grunt.loadNpmTasks('grunt-protractor-runner');

  /*
   * Configuration
   */
  var gruntTasks = {
    pkg: grunt.file.readJSON('package.json'),
    /*
     * Placed at the top of the compiled source files.
     * Use the 'banner' -> banner: '<%= meta.banner %>'
     *
     */
    meta: {
      banner:
        '/*\n' +
        ' * Compiled <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * Docs @ <%= pkg.repository.url %>\n' +
        ' */\n'
    },
    /*
     * The shell task can run handy shell commands.
     * To configure the dev/prod server check out the 'sh' files
     * in './server'.
     *
     */
    shell: {
      dev_server: {
        command: './server/build-server.sh'
      },
      prod_server: {
        command: './server/production-server.sh'
      },
      run_selenium: {
        command: './node_modules/protractor/bin/webdriver-manager start'
      },
      update_selenium: {
        command: './node_modules/protractor/bin/webdriver-manager update'
      }
    },
    /*
     * The copy task copies files for both build and compile
     * phases, as well as test files.
     *
     * 'build_index' will process the 'index.html' file and write
     * <script> tags for all files (modules or vendor scripts).
     *
     * 'compile_index' will process the 'index.html' file without
     * providing any scripts. In this case, a single script will
     * be included: 'app.min.js'.
     *
     * See './src/index.html' for more details.
     *
     */
    copy: {
      build_app_js: {
        src: [
          findModuleFilesIn('./src/app/'),
          findModuleFilesIn('./src/common/')
        ],
        dest: '<%= build_dir %>'
      },
      build_app_data: {
        src: ['./src/app/**/*.json'],
        dest: '<%= build_dir %>/data/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      },
      build_unit: {
        src: ['./src/**/*.spec.js'],
        dest: '<%= build_dir %>'
      },
      build_vendor_js: {
        src: ['<%= build.vendor_js %>'],
        dest: '<%= build_dir %>'
      },
      build_views: {
        cwd: './src',
        src: ['app/**/*.html', '!app/shared/**/*.html'],
        dest: '<%= build_dir %>/views/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      },
      build_shared_views: {
        cwd: './src',
        src: ['app/shared/**/*.html'],
        dest: '<%= build_dir %>/shared-views/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      },
      build_index: {
        cwd: './src',
        src: ['index.html'],
        dest: '<%= build_dir %>',
        expand: true,
        options: {
          process: processBuildScripts
        }
      },
      build_assets: {
        cwd: './src/assets',
        src: [
          'img/**/*',
          'fonts/**/*',
          '!**/*.less',
          '!**/*.css'
        ],
        dest: '<%= build_dir %>src/assets/',
        expand: true
      },
      build_fonts: {
        src: ['<%= common.vendor_fonts %>'],
        dest: '<%= build_dir %>src/assets/fonts/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      },
      build_karma: {
        src: ['./config/karma.conf.js'],
        dest: '<%= build_dir %>',
        options: {
          process: processBuildScripts
        }
      },
      build_protractor: {
        cwd: './src',
        src: ['**/*.protractor.js', '**/*.e2e.js'],
        dest: '<%= build_dir %>src/e2e/',
        expand: true,
        flatten: true
      },
      compile_app_data: {
        cwd: '<%= build_dir %>',
        src: ['data/*.json'],
        dest: '<%= compile_dir %>',
        expand: true
      },
      compile_views: {
        cwd: '<%= build_dir %>',
        src: ['views/**/*.html'],
        dest: '<%= compile_dir %>',
        expand: true
      },
      compile_index: {
        cwd: './src',
        src: ['index.html'],
        dest: '<%= compile_dir %>',
        expand: true,
        options: {
          process: function processCompileIndex(content){
            return grunt.template.process(content);
          }
        }
      },
      compile_app_assets: {
        cwd: '<%= build_dir %>',
        src: ['src/assets/**/*', '!src/assets/**/*.md'],
        dest: '<%= compile_dir %>',
        expand: true
      }
    },
    /*
     * The clean task is used to remove files / directories that
     * are used and not needed anymore.
     *
     * It's also used to remove the build directory before a new
     * compile, see 'build_clean' below.
     *
     */
    clean: {
      build_clean: ['<%= build_dir %>'],
      build_css_clean: ['<%= build_dir %>/src/assets/css/app.custom.css'],
      compile_js_clean: ['<%= compile_dir %>/src/app/modules.min.js'],
      compile_shared_views_clean: ['<%= compile_dir %>/shared-views/'],
      clean_samples: [
        './src/app/about/',
        './src/app/home/',
        './src/app/profile-feature/',
        './src/app//shared/profile-model'
      ]
    },
    /*
     * The less task compiles all less files.
     * They will be afterwards concatenated with vendor
     * stylesheet, see the 'cssmin' task.
     *
     */
    less: {
      build_less: {
        src: ['./src/assets/**/*.less'],
        dest: '<%= build_dir %>/src/assets/css/app.custom.css',
        options: {
          cleancss: true,
          compress: true
        }
      }
    },
    /*
     * The cssmin task minifies css files and merges them into a
     * single file (done during build).
     *
     */
    cssmin: {
      build_css: {
        src: [
          '<%= build.vendor_css %>',
          './src/assets/**/*.css',
          '<%= build_dir %>/src/assets/css/app.custom.css'
        ],
        dest: '<%= build_dir %>/src/assets/css/app.min.css',
        options: {
          keepSpecialComments: 0,
          banner: '<%= meta.banner %>'
        }
      }
    },
    /*
     * This task autoprefixes CSS
     * You won't have to ever add -webkit-, -moz-, etc
     * in your CSS files EVER!
     *
     */
    autoprefixer: {
      options: {
        browsers: ['> 1%']
      },
      build_autoprefix_css: {
        src: '<%= build_dir %>/src/assets/css/app.min.css',
        dest: '<%= build_dir %>/src/assets/css/app.min.css'
      }
    },
    /*
     * The uglify task mainly minifies and mangles module scripts.
     * After all scripts are concatenated, it minifies without
     * mangling to remove comments, line breaks, etc that come
     * from vendor scripts.
     *
     */
    uglify: {
      compile_module_js: {
        options: {
          wrap: 'moduleExports',
          mangle: {
            except: ['exceptionLoggingService']
          }
        },
        src: [
          '<%= compile.vendor_js %>',
          findModuleFilesIn('./build/src/app/'),
          findModuleFilesIn('./build/src/common/')
        ],
        dest: '<%= compile_dir %>/src/app/modules.min.js'
      },
      compile_soft_uglify: {
        options: {
          mangle: false,
          banner: '<%= meta.banner %>'
        },
        src: ['<%= compile_dir %>/src/app/app.min.js'],
        dest: '<%= compile_dir %>/src/app/app.min.js'
      }
    },
    /*
     * The concat task is used in the compile phase to merge all
     * scripts into one.
     *
     */
    concat: {
      compile_js: {
        src: [
          '<%= compile.vendor_min_js %>',
          '<%= compile_dir %>/src/app/modules.min.js',
          '<%= compile_dir %>/shared-views/views.min.js'
        ],
        dest: '<%= compile_dir %>/src/app/app.min.js',
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    /*
     * The html2js task is used to convert all shared views into a module
     * that adds them to $templateCache. It also minifies HTML
     * markup.
     *
     */
    html2js: {
      options: {
        htmlmin: {
          collapseBooleanAttributes: false,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          removeComments: true,
          removeEmptyAttributes: false,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      compile_shared_views: {
        src: ['<%= build_dir %>/shared-views/**/*.html'],
        dest: '<%= compile_dir %>/shared-views/views.min.js',
        options: {
          module: 'sharedViewsModule',
          base: './build',
          singleModule: true
        }
      }
    },
    /*
     * The jshint task detects errors and potential problems in
     * the JavaScript source and grunt files.
     *
     */
    jshint: {
      options: {
        jshintrc: true
      },
      src_js: ['./src/**/*.js'],
      gruntfiles: ['./gruntfile.js', 'grunt.conf.js']
    },
    /*
     * Karma is used to run unit tests.
     * It can run continiously (similar to the watch task).
     *
     */
    karma: {
      options: {
        configFile: '<%= build_dir %>/config/karma.conf.js'
      },
      unit: {
        port: 9191,
        background: false
      },
      continuous: {
        singleRun: false,
        autoWatch: true
      }
    },
    /*
     * Protractor is used to run E2E tests. (need a running
     * selenium server).
     *
     * To run locally, 'grunt test', 'grunt test:e2e' and
     * 'grunt protractor:build' will do the job.
     *
     * It also contains configuration for Travis CI.
     * Both '/build' (development) and '/application' (
     * production) paths are covered.
     *
     */
    protractor: {
      options: {
        keepAlive: false, // the grunt process stops when the test fails.
        noColor: false,
        args: {}
      },
      build: {
        options: {
          keepAlive: true,
          configFile: './config/protractor.conf.js', //Local tests
        }
      },
      ci_dev: {
        options: {
          configFile: './config/protractor-ci.conf.js'
        }
      },
      ci_prod: {
        options: {
          configFile: './config/protractor-ci-prod.conf.js'
        }
      }
    },
    /*
     * The `watch` task builds JavaScript, HTML and all assets
     * (including tests and the gruntfiles themselves) when any
     * of them are changed.
     *
     */
    watch: {
      options: {
        livereload: true
      },
      src_js: {
        files: ['./src/**/*.js', './src/**/*.json'],
        tasks: ['newer:jshint:src_js', 'newer:copy:build_app_js']
      },
      src_html: {
        files: ['./src/**/*.html', '!./src/index.html'],
        tasks: ['newer:copy:build_views', 'copy:build_shared_views']
      },
      src_index: {
        files: ['./src/index.html'],
        tasks: ['copy:build_index']
      },
      src_stylesheets: {
        files: ['./src/assets/**/*.less', './src/assets/**/*.css'],
        tasks: ['newer:less:build_less', 'cssmin:build_css', 'clean:build_css_clean', 'autoprefixer:build_autoprefix_css']
      },
      src_assets: {
        files: ['./src/assets/**/*', '!./src/assets/**/*.less', '!./src/assets/**/*.css'],
        tasks: ['newer:copy:build_assets']
      },
      gruntfiles: {
        files: ['./gruntfile.js', 'grunt.conf.js'],
        tasks: ['newer:jshint:gruntfiles'],
        options: {
          livereload: false
        }
      },
      tests: {
        files: ['src/**/*.spec.js', 'src/**/*.e2e.js', 'src/**/*.protractor.js'],
        tasks: ['newer:copy:build_karma', 'newer:copy:build_unit', 'newer:copy:build_protractor']
      }
    }
  };

  /*
   * When initializing Grunt, it needs to be extended with the
   * 'gruntConfig' object (imported from './config/grunt.conf.js')
   *
   */
  grunt.initConfig(
    grunt.util._.extend(gruntTasks, gruntConfig)
  );

  /*
   * Tasks.
   * Running 'grunt' should be enough for development.
   * When ready for production, 'grunt compile' will compile the
   * application into the './application' directory.
   *
   */
  grunt.registerTask('default', ['build', 'karma:unit', 'watch']);
  grunt.registerTask('build', [
    'jshint',
    'copy:build_app_js',
    'copy:build_app_data',
    'copy:build_vendor_js',
    'copy:build_views',
    'copy:build_shared_views',
    'copy:build_fonts',
    'copy:build_index',
    'copy:build_unit',
    'copy:build_protractor',
    'copy:build_karma',
    'copy:build_assets',
    'less:build_less',
    'cssmin:build_css',
    'clean:build_css_clean',
    'autoprefixer:build_autoprefix_css'
  ]);
  grunt.registerTask('compile', [
    'jshint',
    'clean:build_clean',
    'build',
    'copy:compile_views',
    'html2js:compile_shared_views',
    'uglify:compile_module_js',
    'concat:compile_js',
    'uglify:compile_soft_uglify',
    'clean:compile_js_clean',
    'clean:compile_shared_views_clean',
    'copy:compile_app_data',
    'copy:compile_app_assets',
    'copy:compile_index'
  ]);
  grunt.registerTask('test', ['karma:unit', 'protractor:build']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:ci', ['karma:unit', 'protractor:ci_dev', 'protractor:ci_prod']);
  grunt.registerTask('test:e2e', ['protractor:build']);
  grunt.registerTask('dev', ['shell:dev_server']);
  grunt.registerTask('prod', ['shell:prod_server']);

  /*
   * Helper methods.
   * The methods below use the 'module_file_order' Array in
   * 'grunt.conf.js' to easily load modules in a consistent
   * manner, generate globbing patterns or process files.
   *
   * (i.e. the 'index.html' is processed in order to
   * automatically write <script> tags)
   *
   */


  /*
   * Generates a globbing pattern that matches the
   * 'module_file_order' Array in 'grunt.conf.js'.
   *
   * @param {String} modulePath - The module path
   * @returns {Array} output - An Array of globbing patterns
   *
   * (i.e. findModuleFilesIn('./src/app/') loads all module
   * files in './src/app' in the defined order)
   *
   */
  function findModuleFilesIn(modulePath){
    var output = [],
        i;

    for(i = 0; i <= gruntConfig.module_file_order.length-1; i++){
      output.push(modulePath + gruntConfig.module_file_order[i]);
    }

    return output;
  }

  /*
   * 'Manually globs (using 'node-glob')' for all JavaScript files
   * that should be included in the build phase, then stores them
   * into the 'buildScripts' Array. 'buildScripts' is then passed * as 'scripts' to the template.
   * The template is processed (usually loops through 'scripts').
   * (See 'index.html')
   *
   * @param {String} content - File content
   * @returns {String} - Processed content
   *
   */
  function processBuildScripts(content){
    var buildScripts = [],
        globFiles,
        customModules = gruntConfig.build.vendor_js
                        .concat(findModuleFilesIn('./src/app/'))
                        .concat(findModuleFilesIn('./src/common/'));

    customModules.forEach(function(module){
      globFiles = glob.sync(module);

      if(globFiles.length > 0){
        buildScripts = buildScripts.concat(globFiles);
      }
    });

    return grunt.template.process(content, {
      data: {
        scripts: buildScripts
      }
    });
  }
};