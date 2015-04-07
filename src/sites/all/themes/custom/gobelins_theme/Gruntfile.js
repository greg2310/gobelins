'use strict';

module.exports = function(grunt) {
  var defaultOptions, options, config;
  var path    = require('path');
  var _       = grunt.util._;
  var aliases = [];
  var data    = {};

  /* Default options */
  defaultOptions = {
    devPath        : 'app',
    stagingPath    : 'build',
    livereloadPort : '35729',
    connectPort    : '9001',
    siteDomain     : 'localhost',
    modernizrPath  : 'bower_components/modernizr/modernizr.js',
    copyFiles      : []
  };

  /* Merge options */
  var file = './grunt.json';
  if (grunt.file.exists(file)) {
    data = grunt.file.readJSON(file);
  }
  options = _.extend({}, defaultOptions, data);

  /* Generate browserify aliases list. */
  _.each(
    grunt.file.expand('./' + options.devPath + '/js/mocks/*.js'),
    function(filename) {
      aliases.push(filename + ':' + path.basename(filename, path.extname(filename)));
    }
  );

  /* Plugins default configuration */
  config = {

    /* CSS tasks */
    compass : {
      options : {
        outputStyle    : 'expanded',
        relativeAssets : true
      },
      app : {
        options : {
          sassDir   : options.devPath + '/scss/',
          cssDir    : options.stagingPath + '/css/',
          imagesDir : options.stagingPath + '/images',
          fontsDir  : options.stagingPath + '/fonts',
        }
      }
    },
    autoprefixer : {
      options : {
        cascade  : true,
        browsers : ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
      },
      app : {
        src : [options.stagingPath + '/css/*.css', '!' + options.stagingPath + '/css/*.min.css']
      }
    },
    csslint : {
      options : {
        'box-sizing'                  : false,
        'outline-none'                : false,
        'unqualified-attributes'      : false,
        'compatible-vendor-prefixes'  : false,
        'unique-headings'             : false,
        'font-sizes'                  : false,
        // Above rules are disabled for normalize compatibility.
        'vendor-prefix'               : false,
        'gradients'                   : false,
        // Above rules are disabled because vendor prefixes are managed by autoprefixer.
        'regex-selectors'             : false,
        // Above rules are disabled for fontello CSS compatibility.
        'qualified-headings'          : false,
        // Above rules are disabled for rich text editor styling.
        'duplicate-background-images' : false,
        // Above rules are disabled for icons.
        'box-model'                   : false,
        'floats'                      : false,
        'adjoining-classes'           : false,
        'ids'                         : false
      },
      app : {
        src : [options.stagingPath + '/css/*.css', '!' + options.stagingPath + '/css/*.min.css']
      }
    },
    cssmin : {
      options: {
        compatibility : 'ie8',
        rebase        : false
      },
      app : {
        files : [
          {
            expand : true,
            cwd    : options.stagingPath + '/css/',
            src    : ['*.css', '!*.min.css'],
            dest   : options.stagingPath + '/css/',
            ext    : '.min.css',
            extDot : 'last'
          }
        ]
      }
    },

    /* JS tasks */
    jshint : {
      options : {
        // Enforcing options.
        curly     : true,
        camelcase : true,
        immed     : true,
        indent    : 2,
        latedef   : 'nofunc',
        newcap    : true,
        noarg     : true,
        noempty   : true,
        undef     : true,
        unused    : true,
        trailing  : true,
        // Relaxing option.
        eqnull    : true,
        sub       : true,
        evil      : true,
        expr      : true, // needed for Google Analytics.
        // Environments.
        browser   : true,
        devel     : true,
        globals   : {
          jQuery        : true,
          Modernizr     : true,
          require       : true,
          module        : true
        }
      },
      app : {
        files: {
          src: [options.devPath + '/js/**/*.js', options.devPath + '/js/*.js', '!' + options.devPath + '/js/vendor/*.js', '!' + options.devPath + '/js/jstemplates/*.js']
        }
      }
    },
    'template-module' : {
      options : {
        module      : true,
        provider    : 'underscore',
        processName : function(filename) {
          return path.basename(filename);
        }
      },
      app : {
        files : [
          {
            expand  : true,
            flatten : true,
            cwd     : options.devPath + '/fragments/jstemplates/',
            src     : ['**/*.html'],
            dest    : options.devPath + '/js/jstemplates/',
            ext     : '.js',
            extDot  : 'last'
          }
        ]
      }
    },
    browserify: {
      options : {
        alias : aliases
      },
      app : {
        files : [
          {
            expand : true,
            cwd    : options.devPath + '/js/',
            src    : ['*.js*'],
            dest   : options.stagingPath + '/js/'
          }
        ]
      }
    },
    uglify : {
      app : {
        files : [
          {
            expand : true,
            cwd    : options.stagingPath + '/js/',
            src    : ['*.js*', '!*.min.js*'],
            dest   : options.stagingPath + '/js/',
            rename : function(dest, src) {
              return dest + src.replace('.js', '.min.js');
            }
          }
        ]
      }
    },

    /* HTML tasks */
    buildHtml : {
      app : {
        options : {
          templates : [options.devPath + '/fragments/**/*.html'],
        },
        expand : true,
        cwd    : options.devPath + '/',
        src    : ['*.html'],
        dest   : options.stagingPath + '/',
        ext    : '.html'
      }
    },

    /* Image tasks */
    imagemin : {
      app : {
        expand : true,
        cwd    : options.devPath + '/images/',
        src    : ['**/*.{png,jpeg,jpg,gif}'],
        dest   : options.stagingPath + '/images/'
      }
    },

    /* Other tasks */
    modernizr : {
      app : {
        extra : {
          shiv       : true,
          printshiv  : false,
          load       : false,
          mq         : true,
          cssclasses : true
        },
        devFile    : options.modernizrPath,
        outputFile : options.stagingPath + '/js/modernizr.js',
        files      : {
          src : [options.devPath + '/**/*.scss', options.devPath + '/**/*.js']
        }
      }
    },
    copy : {
      js : {
        files : [
          {
            src  : 'bower_components/jquery/dist/jquery.js',
            dest : options.stagingPath + '/js/jquery.js'
          }
        ]
      },
      css : {
        files : [
          {
            src  : 'bower_components/normalize.css/normalize.css',
            dest : options.devPath + '/scss/bower/_normalize.scss'
          }
        ]
      },
      fonts : {
        files : [
          {
            expand : true,
            cwd    : options.devPath + '/fonts/',
            src    : ['*'],
            dest   : options.stagingPath + '/fonts/',
            filter : 'isFile'
          }
        ]
      }
    },

    /* Working tasks */
    open : {
      app : {
        path : 'http://' + options.siteDomain + ':' + options.connectPort + '/' + options.stagingPath
      },
    },
    connect : {
      app : {
        options : {
          port      : options.connectPort,
          hostname  : '*',
          base      : '.',
          keepalive : true
        }
      }
    },
    watch : {
      options : {
        atBegin    : true,
        livereload : options.livereloadPort
      },
      css : {
        files : [options.devPath + '/**/*.scss'],
        tasks : ['css']
      },
      js : {
        files : [options.devPath + '/**/*.js', options.devPath + '/fragments/jstemplates/**/*.html'],
        tasks : ['js']
      },
      html : {
        files : [options.devPath + '/**/*.html', '!' + options.devPath + '/fragments/jstemplates/**/*.html'],
        tasks : ['html']
      },
      assets : {
        files : [options.devPath + '/**/*.{png,jpeg,jpg,gif}'],
        tasks : ['assets']
      }
    },
    concurrent : {
      options : {
        logConcurrentOutput : true
      },
      server : {
        tasks : ['watch', 'connect', 'open'],
      },
      build : {
        tasks : ['css', 'js', 'html', 'assets'],
      }
    }

  };

  /* Use .jshintrc if exists */
  if (grunt.file.exists('./.jshintrc')) {
    config.jshint.options.jshintrc = '.jshintrc';
  }

  /* Use .csslintrc file if exists */
  if (grunt.file.exists('./.csslintrc')) {
    config.csslint.options.csslintrc = '.csslintrc';
  }

  /* Add files into the copy task */
  _.each(
    options.copyFiles,
    function(value) {
      switch (value.src.substr(value.src.lastIndexOf('.'))) {
        case '.js':
          config.copy.js.files.push(value);
          break;

        case '.css':
          config.copy.css.files.push(value);
          break;
      }
    }
  );

  /* Load configuration */
  _.extend(config, options);
  grunt.initConfig(config);

  /* Load all plugins */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /* Define tasks */
  grunt.registerTask('css',     ['copy:css', 'compass', 'autoprefixer', 'csslint', 'cssmin']);
  grunt.registerTask('js',      ['jshint', 'template-module', 'modernizr', 'copy:js', 'browserify', 'uglify']);
  grunt.registerTask('html',    ['buildHtml']);
  grunt.registerTask('assets',  ['imagemin', 'copy:fonts']);
  grunt.registerTask('server',  ['concurrent:server']);
  grunt.registerTask('default', ['concurrent:build']);

  /* Help task */
  grunt.task.registerTask(
    'help',
    'Help task.',
    function() {
      grunt.log.writeln('');
      grunt.log.writeln('Availables commands :');
      grunt.log.writeln('');
      grunt.log.writeln('* grunt css    : run all CSS tasks');
      grunt.log.writeln('* grunt js     : run all JS tasks');
      grunt.log.writeln('* grunt html   : run all html tasks');
      grunt.log.writeln('* grunt assets : run all assets tasks');
      grunt.log.writeln('* grunt server : live check and compilation + web server');
      grunt.log.writeln('* grunt        : build all (css + js + html + image)');
    }
  );
};
