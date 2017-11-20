// Karma configuration
// Generated on Mon Jul 18 2016 14:22:28 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './app/js/devices/global.js',
        './app/js/devices/*.js',
        './app/js/l10n/global.js',
        './app/js/l10n/**/*',
        './app/js/libs/angular/angular.js',
        './app/js/libs/angular/angular-ui-router.js',
        './app/js/libs/angular/angular-animate.min.js',
        './app/js/libs/angular/angular.cookies.js',
        './app/js/libs/angular/angular.fastclick.js',
        './app/js/libs/angular/angular.filter.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './app/js/libs/**/*.js',
        './app/js/app.js',
        './app/js/router.js',
        './app/js/*.directive.js',
        './app/js/*.component.js',
        './app/js/*.controller.js',
        './app/js/**/*.js',
        './app/js/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
