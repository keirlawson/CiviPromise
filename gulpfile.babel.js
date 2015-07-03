/*eslint-env node*/
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {server as karma} from 'karma';
import path from 'path';
import babel from 'gulp-babel';

const APP_SRC = 'src/**/*.js';
const JS_FILES = [APP_SRC, '*.js', 'test/**/*.js'];
const BUILD_DIR = 'lib';

gulp.task('lint', () => {
  return gulp.src(JS_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('unitTest', (done) => {
  karma.start({
    configFile: path.join(__dirname, '/karma.conf.js')
  }, done);
});

gulp.task('build', ['lint', 'unitTest'], () => {
  return gulp.src(APP_SRC)
  .pipe(babel())
  .pipe(gulp.dest(BUILD_DIR));
});
