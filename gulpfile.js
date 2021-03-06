var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var streamqueue = require('streamqueue').obj;
var flatten = require('gulp-flatten');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var path = require('path');

var wiredepInlineCss = {
   fileTypes: {
      scss: {
         replace: {
            css: function(filePath){
               var withoutIndex = filePath.substring(0, filePath.length - 4);
               return '@import "' + withoutIndex + '";';
            }
         }
      }
   }
};

function errorHandler(err){
 gutil.log(gutil.colors.red('Error'), err.message);
 this.end();
}

gulp.task('clean', function(cb){
   del('client', cb);
});

gulp.task('fonts:clean', function(cb){
   del('client/fonts', cb);
});

gulp.task('fonts', ['fonts:clean'], function(){
   return gulp.src('bower_components/**/fonts/bootstrap/*')
   .pipe(flatten())
   .pipe(gulp.dest('client/fonts/bootstrap'));
});

gulp.task('css:clean', function(cb){
   del('client/index.css', cb);
});

gulp.task('css', ['css:clean'], function(){
   return gulp.src('src/index.scss')
   .pipe(wiredep.stream(wiredepInlineCss))
   .pipe(sass())//{outputStyle: 'compressed'}))
   .on('error', errorHandler)
   .pipe(gulp.dest('client'));   
});

gulp.task('js:clean', function(cb){
   del('client/*.js', cb);
});

gulp.task('js', ['js:clean'], function(){
   var jsx = gulp.src('src/*.jsx')
   .pipe(babel())
   .on('error', errorHandler)
   .pipe(debug());

   var deps = gulp.src(wiredep().js);

   return streamqueue(deps, jsx)
   .pipe(debug({title: 'core.js'}))
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


gulp.task('images:clean', function(){
   return del(['client/*.gif', 'client/*.png']);
});

gulp.task('images', ['images:clean'], function(){
   return gulp.src("bower_components/fancybox/source/*.{png,gif}")
   .pipe(gulp.dest('client'));
});

gulp.task('html', ['html:clean'], function(cb){
   return gulp.src('src/*.html')
   .pipe(gulp.dest('client'));
});

gulp.task('watch', ['default'], function(){
   gulp.watch('src/*.html', ['html']);
   gulp.watch('src/*.jsx', ['js']);
   gulp.watch('src/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'fonts', 'html', 'images']);