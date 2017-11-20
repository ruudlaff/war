'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
cssminify = require('gulp-minify-css'),
rename = require("gulp-rename"),
csslint = require('gulp-csslint'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
size = require('gulp-filesize'),
sequence = require('run-sequence'),
del = require('del'),
order = require("gulp-order"),
templateCache = require('gulp-angular-templatecache'),
htmlmin = require('gulp-htmlmin'),
fontmin = require('gulp-fontmin'),
a11y = require('gulp-a11y'),
size_files = require('gulp-size'),
compress = require('compression');
var browsersync = require('browser-sync').create();

/* BROWSER SYNC */

gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: "./app/",
            middleware: function(req,res,next){
                 var gzip = compress();
                  gzip(req,res,next);
            }
        }
    });
    gulp.watch(sync.css).on('change', browsersync.reload);
    gulp.watch(sync.html).on('change', browsersync.reload);
});

gulp.task('build-test', function() {
  browsersync.init({
      server: {
          baseDir: "./dist/",
          middleware: function(req,res,next){
               var gzip = compress();
                gzip(req,res,next);
          }
      }
  });
});

var sync = {
  css: './dist/css/*.css',
  html: './dist/**/*.html'
};

/* CLEAN */

gulp.task('clean', function () {
  return del([
    './dist'
  ]);
});

/* CSS */
 
gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(order([
      'app/scss/sanitize.scss',
      'app/**/*.scss'
      ]))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('stylelint', function() {
  gulp.src('./app/css/styles.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('cssmin', function () {
	return gulp.src('./app/css/styles.css')
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
		.pipe(cssminify())
		.pipe(rename({suffix: '.min'}))
    	.pipe(gulp.dest('./app/css'))
    	.pipe(size());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/css/styles.css', ['stylelint','cssmin']);
});

/* JS */

gulp.task('jshint', function() {
  return gulp.src('./app/js/pages/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscompile', function() {
  return gulp.src([
    './app/js/l10n/**/*.js',
    './app/js/libs/angular/angular.js',
    './app/js/libs/angular/angular-ui-router.js',
    './app/js/libs/angular/angular-animate.min.js',
    './app/js/libs/angular/angular.cookies.js',
    './app/js/libs/angular/angular.fastclick.js',
    './app/js/libs/angular/angular.filter.js',
    './app/js/libs/**/*.js',
    './app/js/app.js',
    './app/js/router.js',
    './app/js/*.directive.js',
    './app/js/*.service.js',
    './app/js/*.component.js',
    './app/js/*.controller.js',
    './app/js/**/*.js',
    '!./app/js/**/*.spec.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./app'));
});

gulp.task('jscompress', function() {
  return gulp.src('./app/app.js')
    .pipe(uglify({mangle: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app'))
    .pipe(size());
});

gulp.task('js:watch', function() {
  gulp.watch('./app/js/**/*.js', ['jshint', 'jscompile']);
  gulp.watch('./app/app.js', ['jscompress']);
});

/* STATIC */

gulp.task('copy', function() {
  gulp.src('./app/index.html').pipe(gulp.dest('./dist'));
  gulp.src('./app/static/*').pipe(gulp.dest('./dist/static'));
  gulp.src('./app/app.min.js').pipe(gulp.dest('./dist'));
  gulp.src('./app/css/styles.min.css').pipe(gulp.dest('./dist/css'));
});

/* FONTS */

function minifyFont(text, cb) {
    gulp.src('./app/fonts/*')
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('./dist/fonts'))
        .on('end', cb);
}
 
gulp.task('fonts', function(cb) {
 
    var buffers = [];
 
    gulp.src(['./app/index.html','./app/js/**/*.html'])
        .on('data', function(file) {
            buffers.push(file.contents);
        })
        .on('end', function() {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });
 
});

/* JS TEMPLATE CREATION */

gulp.task('template', function () {
  return gulp.src('./app/js/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true,conservativeCollapse: true}))
    .pipe(templateCache('templates.js',{root:'js/'}))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('template:watch', function() {
  gulp.watch('./app/js/**/*.html', ['template']);
});

/* IMAGES */

gulp.task('imagecompress', function() {
	gulp.src('./app/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
});

/* Accessibility testing */

gulp.task('accessibility', function () {
  return gulp.src('./app/js/**/*.html')
    .pipe(a11y())
    .pipe(a11y.reporter());
});

/* File size reporting */

gulp.task('size', function () {
  gulp.src('./dist/app.min.js').pipe(size_files({title:"JS GZIPPED",gzip:true}));
  gulp.src('./dist/css/styles.min.css').pipe(size_files({title:"CSS GZIPPED",gzip:true}));
});

/* GROUPING TASKS */

gulp.task('dev', function(callback) {
  sequence('build',
    ['sass:watch','js:watch','template:watch','browser-sync'],
              callback);
});

gulp.task('build', function(callback) {
  sequence('clean',
              'template',
              ['sass','jscompile'],
              ['cssmin','jscompress'],
              ['copy','fonts','imagecompress'],
              'size',
              callback);
});