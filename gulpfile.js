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
    tsProject   = ts.createProject('tsconfig.json'),
    bowerFiles  = require('main-bower-files'),
    rev         = require('gulp-rev'),
    runSequence = require('run-sequence'),
    inject      = require('gulp-inject');

    
// #################################################
// ############### DEVELOPMENT TASKS ###############
// #################################################


gulp.task('start', function (cb) {
    runSequence(
        ['css:libs:dev', 'js:libs:dev'],
        ['less', 'ts'],
        'build-dev-html',
        'browser-sync',
        'watch',
        cb
    );
});


gulp.task('build:dev', function(cb) {
    runSequence(
        ['less', 'ts'],
        ['css:libs:dev', 'js:libs:dev'],
        'build-dev-html',
        cb);
});


gulp.task('watch', ['watch:less', 'watch:js', 'watch:ts', 'watch:ejs', 'watch:html']);


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["./client/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});


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


gulp.task('less', function(cb) {
    return gulp.src('./client/css/**/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', gutil.log)
        .pipe(concat('site.css'))
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
   gulp.watch('./server/views/**/*.ejs').on('change', browserSync.reload); 
});


gulp.task('watch:html', function(cb){
   gulp.watch('./client/**/*.html').on('change', browserSync.reload); 
});


gulp.task('watch:less', function() {
    gulp.watch('./client/css/**/*.less', ['less']);
});


gulp.task('watch:ts', function() {
    gulp.watch('./**/*.ts', ['ts']);
});


gulp.task('css:libs:dev', function(cb){
   return gulp.src(bowerFiles())
        .pipe(filter(['*.css']))
        .pipe(gulp.dest('./client/css'));
});


gulp.task('js:libs:dev', function(cb){
   return gulp.src(bowerFiles())
        .pipe(filter(['*.js']))
        .pipe(gulp.dest('./client/app'));
});


gulp.task('build-dev-html', function(){  
    return gulp.src('./client/index.html')
        .pipe(inject(gulp.src('./client/css/**/*.css', { read:false }), { relative: true, addPrefix: 'assets' })) // css app files  
        .pipe(inject(gulp.src('./client/app/**/*.js', { read: false }), { relative: true, addPrefix: 'assets' })) // js app files  
        .pipe(gulp.dest('./client/'));
});



// ################################################
// ############### PRODUCTION TASKS ###############
// ################################################   
    
gulp.task('build:prod', function(cb){
    runSequence(
        'clean',
        ['less:prod', 'css:libs:prod', 'js:libs:prod', 'ts:prod'],
        ['copy-package.json', 'copy-bootstrap-fonts', 'copy-views', 'copy-html', 'copy-images'],
        'build-prod-html',
        cb
    );
});

    
gulp.task('less:prod', function(cb) {
    return gulp.src('./client/css/**/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', gutil.log)
        .pipe(concat('site.min.css'))
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('./dist/client/css'));
});   


gulp.task('css:libs:prod', function(cb){
   return gulp.src(bowerFiles())
        .pipe(filter(['*.css']))
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('./dist/client/css'));
});


gulp.task('js:libs:prod', function(cb){
   return gulp.src(bowerFiles())
        .pipe(filter(['*.js']))
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/client/app'));
});


gulp.task('ts:prod', function() {
	var tsResult = tsProject.src() // instead of gulp.src(...) 
		.pipe(ts(tsProject));
	
	return tsResult.js.pipe(gulp.dest('./dist'));
});


gulp.task('copy-bootstrap-fonts', function(cb){
    return gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('./dist/client/fonts'));
});


gulp.task('copy-package.json', function(cb){
   return gulp.src('./package.json')
        .pipe(gulp.dest('./dist/')); 
});


gulp.task('copy-views', function(cb){
   return gulp.src('./server/views/**/*.*')
        .pipe(gulp.dest('./dist/server/views')); 
});


gulp.task('copy-html', function(cb){
   return gulp.src('./client/**/*.html')
        .pipe(gulp.dest('./dist/client')); 
});

gulp.task('copy-images', function(cb){
    return gulp.src('./client/images/**/*.*')
        .pipe(gulp.dest('./dist/client/images'));
});

gulp.task('build-prod-html', function(){
    var localInject = function(pathGlob, name) {
		var options = {
        	ignorePath: '/dist/client/', // remove the '/dist/client' from the path           
        	addRootSlash: true, // add a root slash to the beginning of the path
            removeTags: true, // remove <--inject--> tags after injection
            name: name || 'inject',
            addPrefix: 'assets'
		};
		return inject(gulp.src(pathGlob, {read:false}), options);
	};
    
    return gulp.src('./client/index.html')
        .pipe(localInject('./dist/client/css/*.css')) // css files   
        .pipe(localInject('./dist/client/app/*.js')) // js files            
        .pipe(gulp.dest('./dist/client/'));
});


gulp.task('clean', function (cb) {
    rimraf('./dist/', cb);
    //   return gulp.src('./**/*.js', { read: false }) // much faster
    //   .pipe(ignore('node_modules/**'))
    //   .pipe(rimraf());
});
  