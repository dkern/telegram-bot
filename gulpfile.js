'use strict';

let gulp = require('gulp');
let jshint = require('gulp-jshint');

// validate all files
gulp.task('validate', () =>
    gulp.src([
            '**/*.js',
            '!**/node_modules/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish')));
