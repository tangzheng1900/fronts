var gulp = require('gulp')  
            ,livereload = require('gulp-livereload');  
gulp.task('watch', function () {  
    livereload.listen();//这里需要注意！旧版使用var server = livereload();已经失效
    gulp.watch(['*.html'], function(event){
        livereload.changed(event.path);
    });
});


var less=require('gulp-less');

gulp.task('testLess',function () {
    gulp.src(['src/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('src/css'));

});

gulp.task('testWatch',function () {
    gulp.watch('src/**/*.less',['testLess']);

});


//借鉴别人的写法
/*
'use strict';
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('style', function(){
    return gulp.src(path.join(__dirname, 'less/!*.less'))
        .pipe(less())
        .pipe(gulp.dest(path.join(__dirname, 'css')));
});

gulp.task('default', ['style']);
gulp.task('watch', ['style']);*/
