var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var wiredep = require('wiredep');
var babel = require('gulp-babel');
var streamqueue = require('streamqueue').obj;
var debug = require('gulp-debug');

gulp.task('clean', function(cb){
   del('client', cb);
});

gulp.task('css:clean', function(cb){
   del('client/*.css', cb);
});

gulp.task('css', ['css:clean'], function(){
   return gulp.src(wiredep().css)
   .pipe(concat('core.css'))
   .pipe(minify())
   .pipe(gulp.dest('client'));   
});

gulp.task('js:clean', function(cb){
   del('client/*.js', cb);
});

gulp.task('js', ['js:clean'], function(){
   var jsx = gulp.src('src/*.jsx')
   .pipe(babel());

   var deps = gulp.src(wiredep().js);

   return streamqueue(deps, jsx)
   .pipe(concat('core.js'))
   .pipe(uglify())
   .pipe(gulp.dest('client'));   
});

gulp.task('html', ['html:clean'], function(){
   return gulp.src('src/*.html')
   .pipe(gulp.dest('client'));
});

gulp.task('html:clean', function(cb){
   del('client/*.html', cb);
});

gulp.task('html', ['html:clean'], function(cb){
   return gulp.src('src/*.html')
   .pipe(gulp.dest('client'));
});

gulp.task('watch', ['default'], function(){
   gulp.watch('src/*.html', ['html']);
   gulp.watch('src/*.jsx', ['js']);
});

gulp.task('default', ['js', 'css', 'html']);