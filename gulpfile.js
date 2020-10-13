const { init } = require('browser-sync');

const gulp = require('gulp'),
    sass=require('gulp-sass'),
    pug=require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcesmaps= require('gulp-sourcemaps');
    // https://browsersync.io/docs/gulp
gulp.task('sass',  ()=> {
  return gulp.src("dev/scss/**/*.scss")/**creamos una carpeta scss */
  .pipe(sourcesmaps.init())
  .pipe(sass({
    // outputStyle:'compressed'
  }).on('error', sass.logError))/*mostramos error consola */
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(sourcesmaps.write('./dist'))
  .pipe(gulp.dest("./dist/css/"))/*capturamos archivos y lo guardamos */
  .pipe(browserSync.stream());
}); 



  // https://browsersync.io/docs/gulp 
gulp.task('default',()=>{
    // gulp.watch('dev/**/*.pug',gulp.series('pug'))
    gulp.watch('./dev/scss/**/*.scss',gulp.series('sass'))
    gulp.watch('./dist/**/*.html').on('change',browserSync.reload)
    browserSync.init({
      server: {
          baseDir: "./dist"
      }    
    });
})