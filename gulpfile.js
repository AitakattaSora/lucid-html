const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'css/',
  },
  html: '*.html',
};

gulp.task('sass', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', () => {
  return gulp.src(paths.html).pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', () => {
  browserSync.init(['css/*.css'], {
    server: {
      baseDir: './',
    },
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.styles.src, gulp.parallel('sass'));
  gulp.watch(paths.html, gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
