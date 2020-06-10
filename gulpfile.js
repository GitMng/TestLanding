let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync')

sass.compiler = require('node-sass')


function css() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('./scss'))
        .pipe(browserSync.reload({stream: true}))
}

function scss() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowsersList: ['last 4 versions']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}))
}

function js() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'))
        .pipe(browserSync.reload({stream: true}))
}

function scriptReload() {
    return gulp.src('./app/js/**/*.js')
        .pipe(browserSync.reload({stream: true}))
}

function htmlReload() {
    return gulp.src('./app/*.html')
        .pipe(browserSync.reload({stream: true}))
}

function browser_sync() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    })
}

function watch() {
    gulp.watch('./scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('./app/js/**/*.js', gulp.parallel('scriptReload'))
    gulp.watch('./app/*.html', gulp.parallel('htmlReload'))
}


gulp.task('css', css)
gulp.task('scss', scss)
gulp.task('js', js)
gulp.task('scriptReload', scriptReload)
gulp.task('htmlReload', htmlReload)
gulp.task('browser_sync', browser_sync)
gulp.task('watch', watch)

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser_sync', 'watch'))