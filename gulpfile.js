var del = require('del'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    notify = require("gulp-notify"),
    minifyCSS = require('gulp-minify-css');

gulp.task('default', ['make'], function () {
    gulp.watch([
        './src/**/*.less',
        './src/**/*.js'
    ], ['make']);
});

gulp.task('make', ['clean', 'make:app:css'], function() {
    var target = gulp.src('./src/views/index.html');
    var sources = gulp.src([
        './bower_components/**/*.css',
        './src/**/*.css',
        './bower_components/**/*.min.js',
        './src/**/*.js'
    ], {read: false});

    return target
        .pipe(inject(sources), {relative: true})
        .pipe(gulp.dest('./'))
        .pipe(notify("Builded!"));
});

gulp.task('make:app:css', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('clean', function() {
    del('./index.html');
    del('./src/css/**/*.css');
    del('./src/build/**/*.css');
    del('./src/build/**/*.js');
});