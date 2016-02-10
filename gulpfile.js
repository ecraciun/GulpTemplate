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
    cssnano     = require('gulp-cssnano'),
    browserSync = require('browser-sync').create(),
    nodemon     = require('gulp-nodemon'),
    plumber     = require('gulp-plumber'),
    filter      = require('gulp-filter'),
    ts          = require('gulp-typescript'),
    tsProject   = ts.createProject('tsconfig.json');
    //watch       = require('gulp-watch');
    //ts      = require('gulp-typescript');
    
    
gulp.task('less', function(cb) {
    return gulp.src('./client/css/**/*.less')
        // .pipe(filter(function (file) {
        //     console.log("File event: " + file.event);
        //     return file.event === "change";
        // }))
        .pipe(plumber())
        //.pipe(changed('./client/css'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', gutil.log)
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./client/css'))
        .pipe(filesize())
        .pipe(cssnano())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest('./client/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .on('error', gutil.log);
});


gulp.task('ts', function() {
	var tsResult = tsProject.src() // instead of gulp.src(...) 
		.pipe(ts(tsProject));
	
	return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('watch:js', function(cb){
   gulp.watch('./client/app/**/*.js').on('change', browserSync.reload); 
});

gulp.task('watch:ejs', function(cb){
   //gulp.watch('./server/views/**/*.ejs', ['reload']); 
   gulp.watch('./server/views/**/*.ejs').on('change', browserSync.reload); 
});

gulp.task('watch:less', ['less'], function() {
    gulp.watch('./client/css/**/*.less', ['less']);
});

gulp.task('watch:ts', ['ts'], function() {
    gulp.watch('./**/*.ts', ['ts']);
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
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./client/app'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest('./client/app'))
    .pipe(filesize())
    .on('error', gutil.log);
});


// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: './server'
//     },
//   })
// })

gulp.task('watch', ['watch:less', 'watch:js', 'watch:ts', 'watch:ejs']);

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: './server/app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["./client/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('start', ['browser-sync', 'watch'], function () {
});
