var gulp = require('gulp');


gulp.task('clean', function(){
});

gulp.task('html:clean', function(cb){
   cb();
});


gulp.task('html', ['html:clean'], function(cb){
   return gulp.src('src/*.html')
      .pipe(gulp.dest('client'));
});

gulp.task('default', ['html']);