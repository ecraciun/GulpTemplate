/* File: gulpfile.js */

// grab our gulp packages
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    jshint      = require('gulp-jshint'),
    less        = require('gulp-less'),
    path        = require('path'),
    rimraf      = require('rimraf'),
    ignore      = require('gulp-ignore'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    filesize    = require('gulp-filesize'),
    changed     = require('gulp-changed'),
    cssnano     = require('gulp-cssnano');
    //watch       = require('gulp-watch');
    //ts      = require('gulp-typescript');
    
    
gulp.task('less', function(cb) {
    return gulp.src('./client/less/**/*.less')
        .pipe(changed('./client/css'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./client/css'))
        .pipe(filesize())
        .pipe(cssnano())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest('./client/css'))
        .on('error', gutil.log);
});

gulp.task('watch:less', function() {
    gulp.watch('./client/less/**/*.less', ['less']);
});

gulp.task('clean', function (cb) {
    rimraf('./build/', cb);
 
//   return gulp.src('./**/*.js', { read: false }) // much faster
//   .pipe(ignore('node_modules/**'))
//   .pipe(rimraf());
  
});
// 

gulp.task('concat-libs', function() {  
  return gulp.src('./client/app/libs/**/*.js')
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./client/app'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('./client/app'))
    .pipe(filesize())
    .on('error', gutil.log);
});