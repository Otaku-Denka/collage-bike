var gulp = require('gulp');
var lost = require('lost');
var stylus = require('gulp-stylus');
var poststylus = require('poststylus');
var customMedia = require('postcss-custom-media');
var axis = require('axis');
var rucksackCss = require('rucksack-css');

var paths = {
    cssSource: 'src/',
    cssOutput: 'src/css/'
};

gulp.watch(paths.cssSource + '**/**/*.styl', ['stylus']);

gulp.task('stylus', function() {
    gulp
        .src(paths.cssSource + '**/*.styl')
        .pipe(
            stylus({
                use: [
                    poststylus([
                        'autoprefixer',
                        'rucksack-css',
                        'lost',
                        'postcss-custom-media'
                    ]),
                    axis()
                ]
            })
        )
        .pipe(gulp.dest('./src'));
});

gulp.task('default', ['stylus']);
