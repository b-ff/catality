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
	gettext = require('gulp-angular-gettext'),
	angularFilesort = require('gulp-angular-filesort'),

	tmpFolder = './tmp/',
	distFolder = './catality/';


/**
 *  CLEANING TASKS
 */

gulp.task('clean', function () {
	return gulp.src([
		tmpFolder,
		distFolder,
		'./index.html'
	])
		.pipe(clean({force: true}))
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
		.pipe(gulp.dest(distFolder + 'vendor/js/'));
});

// Move vendor minified CSS to dist/css/vendor
gulp.task('dist:css:vendor', ['clean'], function () {
	return gulp.src([
		'./bower_components/**/*.min.css',
		'./bower_components/**/*-min.css'
	])
		.pipe(gulp.dest(distFolder + 'vendor/css/'));
});

// Common task for vendor files
gulp.task('dist:vendor', ['dist:js:vendor', 'dist:css:vendor', 'dist:fonts:vendor']);

// Move all vendor js into a single file vendor.min.app
gulp.task('dist:js:vendor:min', ['dist:js:vendor'], function () {
	return gulp.src(distFolder + 'vendor/js/**/*.js')
		.pipe(angularFilesort())
		.pipe(uglify())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest(distFolder + 'vendor/'));
});

// Move all vendor css into a single file vendor.min.css
gulp.task('dist:css:vendor:min', ['dist:css:vendor'], function () {
	return gulp.src(distFolder + 'vendor/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest(distFolder + 'vendor/'));
});

// Common task for vendor:min, removes separated vendor files
gulp.task('dist:vendor:min', ['dist:js:vendor:min', 'dist:css:vendor:min', 'dist:fonts:vendor:min'], function () {
	return gulp.src([
		distFolder + 'vendor/js',
		distFolder + 'vendor/css'
	])
		.pipe(clean({force: true}));
});

gulp.task('dist:fonts:vendor', ['clean'], function () {
	return gulp.src([
		'./bower_components/**/*.woff',
		'./bower_components/**/*.woff2',
		'./bower_components/**/*.eot',
		'./bower_components/**/*.ttf',
		'./bower_components/**/*.svg'
	])
		.pipe(gulp.dest(distFolder + 'vendor/css/'));
});

gulp.task('dist:fonts:vendor:min', ['clean'], function () {
	return gulp.src([
		'./bower_components/**/*.woff',
		'./bower_components/**/*.woff2',
		'./bower_components/**/*.eot',
		'./bower_components/**/*.ttf',
		'./bower_components/**/*.svg'
	])
		.pipe(gulp.dest(distFolder + 'vendor/'));
});

/**
 *  APP STYLES TASKS
 */

gulp.task('dist:images', ['clean'], function () {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest(distFolder + 'images/'));
});

gulp.task('dist:stylus', ['clean'], function () {
	return gulp.src('./src/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest(tmpFolder + 'css/'));
});

gulp.task('dist:css:app', ['dist:stylus'], function () {
	return gulp.src(tmpFolder + 'css/**/*.css')
		.pipe(gulp.dest(distFolder));
});

gulp.task('dist:css:app:min', ['dist:stylus'], function () {
	return gulp.src(tmpFolder + 'css/**/*.css')
		.pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest(distFolder + 'css/'));
});

gulp.task('dist:js:app', ['clean'], function () {
	return gulp.src('./src/**/*.js')
		.pipe(gulp.dest(distFolder));
});

gulp.task('dist:js:app:min', function () {
	return gulp.src('./src/**/*.js')
		.pipe(angularFilesort())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(distFolder + 'js/'));
});

gulp.task('dist:jade', ['clean'], function () {
	return gulp.src('./src/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(distFolder))
});

gulp.task('dist:templates', ['clean'], function () {
	return gulp.src(['./src/**/*.html', '!./src/index.html'])
		.pipe(gulp.dest(distFolder));
});

gulp.task('dist', ['dist:vendor', 'dist:images', 'dist:css:app', 'translations:json', 'dist:js:app', 'dist:jade', 'dist:templates']);
gulp.task('dist:min', ['dist:vendor:min', 'dist:images', 'dist:css:app:min', 'translations:json', 'dist:js:app:min', 'dist:jade', 'dist:templates']);

/**
 *  TRANSLATIONS
 */

gulp.task('translations:pot', ['dist:jade'], function () {
	return gulp.src([
		distFolder + 'app/**/*.html',
		distFolder + 'app/**/*.js'
	])
		.pipe(gettext.extract('i18n.pot', {
			// options to pass to angular-gettext-tools...
		}))
		.pipe(gulp.dest('./src/app/translations/'));
});

gulp.task('translations:json', ['dist:jade'], function () {
	return gulp.src('./src/app/translations/**/*.po')
		.pipe(gettext.compile({
			// options to pass to angular-gettext-tools...
			format: 'json'
		}))
		.pipe(gulp.dest(distFolder + 'app/translations/'));
});

/**
 *  INJECT
 */

gulp.task('inject', ['dist', 'moveIndex'], function () {
	var css = gulp.src([
		distFolder + 'vendor/css/**/*.css',
		distFolder + 'app/**/*.css'
	]);

	var jquery = gulp.src(distFolder + 'vendor/js/jquery/dist/jquery.min.js');

	var vendorJS = gulp.src(distFolder + 'vendor/js/**/*.js');
	//.pipe(angularFilesort());

	//vendorJS = es.merge(jquery, vendorJS);

	var appJS = gulp.src([distFolder + 'app/**/*.js'])
		.pipe(angularFilesort());

	return gulp.src('./index.html')
		.pipe(inject(css, {relative: true}))
		.pipe(inject(vendorJS, {
			relative: true,
			starttag: '<!-- inject:vendor:js-->'
		}))
		.pipe(inject(appJS, {
			relative: true,
			starttag: '<!-- inject:app:js-->'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('inject:min', ['dist:min', 'moveIndex'], function () {
	var appJS = gulp.src(distFolder + 'js/app.min.js'),
		vendorJS = gulp.src(distFolder + 'vendor/vendor.min.js'),
		css = gulp.src([
			distFolder + 'vendor/vendor.min.css',
			distFolder + 'css/app.min.css'
		]);

	return gulp.src('./index.html')
		.pipe(inject(css, {relative: true}))
		.pipe(inject(vendorJS, {
			relative: true,
			starttag: '<!-- inject:vendor:js -->'
		}))
		.pipe(inject(appJS, {
			relative: true,
			starttag: '<!-- inject:app:js -->'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('moveIndex', ['dist:jade'], function() {
	return gulp.src(distFolder + 'index.html')
		.pipe(gulp.dest('./'));
});

gulp.task('make', ['clean', 'dist', 'translations:pot', 'inject'], function() {
	return gulp.src(tmpFolder)
		.pipe(clean({force: true}))
		.pipe(notify('Compiled!'));
});

gulp.task('make:min', ['clean', 'dist:min', 'inject:min']);

/**
 *  FINAL BUILDING
 */
gulp.task('build', ['make:min'], function () {
	return gulp.src([
		'./tmp/',
		distFolder + 'vendor/css/',
		distFolder + 'css/app/',
		distFolder + 'vendor/js/',
		distFolder + 'js/app/'
	])
		.pipe(clean({force: true}))
		.pipe(notify('Building complete!'));
});

gulp.task('serve', ['make'], function () {
	gulp.watch('./src/app/**/*.po', ['make']);
	gulp.watch('./src/app/**/*.js', ['make']);
	gulp.watch('./src/app/**/*.jade', ['make']);
	gulp.watch('./src/app/**/*.styl', ['make']);
	gulp.watch('./src/app/**/*.html', ['make']);

	return gulp.src('./')
		.pipe(webserver({
			open: true
		}));
});


