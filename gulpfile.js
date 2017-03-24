"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const jsvalidate = require('gulp-jsvalidate');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const modifyCssUrls = require('gulp-modify-css-urls');
const uglifyjs = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer');// проверяет файлы и не пропускает уже существующие

var needBuild = process.env.NODE_ENV == 'build',
    config = {
        bowerDir: './bower_components',
        libsDir : './app/libs'
    };

gulp.task('styles', function(){
    return gulp.src("app/style/style.scss")
        .pipe(plumber({
            errorHandler: notify.onError(function(e){
                return {
                    title: 'Style',
                    message: e.message
                }
            })
        }))
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function(callback){
    gulp.src("app/assets/*.*", {since: gulp.lastRun('assets')})
        .pipe(newer('dist'))
        .pipe(gulp.dest('dist'));

    gulp.src("app/assets/img/*.*", {since: gulp.lastRun('assets')})
        .pipe(newer('dist/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));

    callback();
});

gulp.task('js', function(){
    return gulp.src("app/js/*.js")
        .pipe(plumber({
            errorHandler: notify.onError(function(e){
                return {
                    title: 'Script',
                    message: e.message
                }
            })
        }))
        .pipe(jsvalidate())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function(){
    return del('dist');
});

gulp.task('sprite', function(callback) {
    var spriteData =
        gulp.src('app/forSprite/*.*') // путь, откуда берем картинки для спрайта
            //.pipe(imagemin())
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                padding: 10
            }));

    spriteData.img
        .pipe(gulp.dest('dist/img/')); // путь, куда сохраняем картинку
    spriteData.css
        .pipe(modifyCssUrls({
            modify: function (url, filePath) {
                return '../img/' + url;
            }
        }))
        .pipe(gulp.dest('app/style/')); // путь, куда сохраняем стили

    callback();
});

gulp.task('createBootstrap', function(callback){
    gulp.src(config.bowerDir + '/custom-bootstrap/style.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.bowerDir + '/custom-bootstrap'));

    callback();
});

gulp.task('setLibraries', function(callback){

    gulp.src([ // забираем js библиотеки, которые будем использовать
        config.bowerDir + '/jquery/dist/jquery.js',
        config.bowerDir +  '/bootstrap/dist/js/bootstrap.min.js',
        config.bowerDir +  '/wow/dist/wow.min.js',
        config.bowerDir +  '/jquery-validation/dist/jquery.validate.min.js',
        config.libsDir +  '/parallax/deploy/jquery.parallax.min.js',
        config.libsDir +  '/parallaxslider/jquery.velocity.min.js',
        config.libsDir +  '/parallaxslider/jquery.touchSwipe.min.js',
        config.libsDir +  '/parallaxslider/parallaxslider.js',
        config.libsDir +  '/flexslider/jquery.flexslider-min.js'
    ]).pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));

    gulp.src([// забираем css библиотеки, которые будем использовать
        config.bowerDir + '/normalize-css/normalize.css',
        config.bowerDir + '/custom-bootstrap/style.css',
        config.bowerDir + '/font-awesome/css/font-awesome.css',
        config.bowerDir + '/animate.css/animate.css',
        config.libsDir + '/flexslider/flexslider.css',
        'app/style/sprite.css'
    ]).pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'));

    gulp.src([// забираем fonts, которые будем использовать
        config.bowerDir + '/font-awesome/fonts/*',
        config.libsDir + '/flexslider/fonts/*'
    ], {since: gulp.lastRun('setLibraries')})
        .pipe(gulp.dest('dist/fonts'));

    callback();
});

gulp.task('build', gulp.series(
    'clean',
    'sprite',
    'createBootstrap',
    'setLibraries',
    gulp.parallel('styles', 'assets', 'js'))
);

gulp.task('serve', function(){
    browserSync.init({
        server: 'dist'
    });

    browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function(){
    gulp.watch('app/style/**/*.*', gulp.series('styles'));
    gulp.watch('app/assets/**/*.*', gulp.series('assets'));
    gulp.watch('app/js/**/*.*', gulp.series('js'));
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel('watch', 'serve')
));