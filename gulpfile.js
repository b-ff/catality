var gulp = require('gulp'),
	jade = require('gulp-jade'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	stylus = require('gulp-stylus'),
	inject = require('gulp-inject'),
	notify = require("gulp-notify"),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	minifyCSS = require('gulp-minify-css'),
	angularFilesort = require('gulp-angular-filesort');

/**
 *  CLEANING TASKS
 */

gulp.task('clean', function () {
	return gulp.src(['./tmp/', './dist/'])
		.pipe(clean({force: true}))
		.pipe(notify('Cleaning complete!'));
});

/**
 *  VENDOR TASKS
 */

// Move vendor minified JS to dist/app/vendor
gulp.task('dist:js:vendor', ['clean'], function () {
	return gulp.src([
		'./bower_components/**/*.min.js',
		'./bower_components/**/*-min.js'
	])
		.pipe(gulp.dest('./dist/vendor/js/'));
});

// Move vendor minified CSS to dist/css/vendor
gulp.task('dist:css:vendor', ['clean'], function () {
	return gulp.src([
		'./bower_components/**/*.min.css',
		'./bower_components/**/*-min.css'
	])
		.pipe(gulp.dest('./dist/vendor/css/'));
});

// Common task for vendor files
gulp.task('dist:vendor', ['dist:js:vendor', 'dist:css:vendor']);

// Move all vendor js into a single file vendor.min.app
gulp.task('dist:js:vendor:min', ['dist:js:vendor'], function () {
	return gulp.src('./dist/vendor/js/**/*.js')
		.pipe(angularFilesort())
		.pipe(uglify())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('./dist/vendor/'));
});

// Move all vendor css into a single file vendor.min.css
gulp.task('dist:css:vendor:min', ['dist:css:vendor'], function () {
	return gulp.src('./dist/vendor/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('./dist/vendor/'));
});

// Common task for vendor:min, removes separated vendor files
gulp.task('dist:vendor:min', ['dist:js:vendor:min', 'dist:css:vendor:min'], function () {
	return gulp.src(['./dist/vendor/js', './dist/vendor/css'])
		.pipe(clean({force: true}));
});

/**
 *  APP STYLES TASKS
 */

gulp.task('dist:stylus', ['clean'], function () {
	return gulp.src('./src/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./tmp/css/'));
});

gulp.task('dist:css:app', ['dist:stylus'], function () {
	return gulp.src('./tmp/css/**/*.css', {read: false})
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist:css:app:min', ['dist:stylus'], function () {
	return gulp.src('./tmp/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('dist:js:app', ['clean'], function () {
	return gulp.src('./src/**/*.js')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist:js:app:min', function () {
	return gulp.src('./src/**/*.js')
		.pipe(angularFilesort())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('dist:jade', ['clean'], function () {
	return gulp.src('./src/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('dist:jade:min', ['clean'], function () {
	return gulp.src('./src/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./dist/'))
});

gulp.task('dist:templates', ['clean'], function () {
	return gulp.src(['./src/**/*.html', '!./src/index.html'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['dist:vendor', 'dist:css:app', 'dist:js:app', 'dist:jade', 'dist:templates']);
gulp.task('dist:min', ['dist:vendor:min', 'dist:css:app:min', 'dist:js:app:min', 'dist:jade:min', 'dist:templates']);

/**
 *  INJECT
 */

gulp.task('inject', ['dist'], function () {
	var css = gulp.src([
		'./dist/vendor/css/**/*.css',
		'./dist/app/**/*.css'
	]);

	var jquery = gulp.src('./dist/vendor/js/jquery/dist/jquery.min.js');

	var vendorJS = gulp.src('./dist/vendor/js/**/*.js');
	//.pipe(angularFilesort());

	//vendorJS = es.merge(jquery, vendorJS);

	var appJS = gulp.src('./dist/app/**/*.js')
		.pipe(angularFilesort());

	return gulp.src('./dist/index.html')
		.pipe(inject(css, {relative: true}))
		.pipe(inject(vendorJS, {
			relative: true,
			starttag: '<!-- inject:vendor:js-->'
		}))
		.pipe(inject(appJS, {
			relative: true,
			starttag: '<!-- inject:app:js-->'
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('inject:min', ['dist:min'], function () {
	var css = gulp.src(['./dist/vendor/vendor.min.css', './dist/css/app.min.css']);
	var vendorJS = gulp.src('./dist/vendor/vendor.min.js');
	var appJS = gulp.src('./dist/js/app.min.js');

	return gulp.src('./dist/index.html')
		.pipe(inject(css, {relative: true}))
		.pipe(inject(vendorJS, {
			relative: true,
			starttag: '<!-- inject:vendor:js -->'
		}))
		.pipe(inject(appJS, {
			relative: true,
			starttag: '<!-- inject:app:js -->'
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('make', ['clean', 'dist', 'inject']);

gulp.task('make:min', ['clean', 'dist:min', 'inject:min']);

/**
 *  FINAL BUILDING
 */

gulp.task('build', ['make:min'], function () {
	return gulp.src([
		'./tmp/',
		'./dist/vendor/css/',
		'./dist/css/app/',
		'./dist/vendor/js/',
		'./dist/js/app/'
	])
		.pipe(clean({force: true}))
		.pipe(notify('Building complete!'));
});

gulp.task('serve', ['make'], function () {
	gulp.watch('./src/app/**/*.js', ['make']);
	gulp.watch('./src/app/**/*.jade', ['make']);
	gulp.watch('./src/app/**/*.styl', ['make']);
	gulp.watch('./src/app/**/*.html', ['make']);

	return gulp.src('./dist/')
		.pipe(webserver({
			open: true
		}));
});


