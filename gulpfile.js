var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var wiredep = require('wiredep');

gulp.task('clean', function(cb){
   del('client', cb);
});

gulp.task('js:clean', function(cb){
   del('client/*.js', cb);
});

gulp.task('js', ['js:clean'], function(cb){
   return gulp.src(wiredep().js)
   .pipe(concat('core.js'))
   .pipe(gulp.dest('client'));   
});

gulp.task('html', ['html:clean'], function(cb){
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
   gulp.watch('src/*', ['html']);
});

gulp.task('default', ['js', 'html']);