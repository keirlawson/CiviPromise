/*eslint-env node*/
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {server as karma} from 'karma';
import path from 'path';
import babel from 'gulp-babel';
import http from 'http';
import connect from 'connect';
import cors from 'cors';
import proxy from 'proxy-middleware';

const APP_SRC = 'src/**/*.js';
const JS_FILES = [APP_SRC, '*.js', 'test/**/*.js'];
const BUILD_DIR = 'lib';
const INTEGRATION_DRUPAL_ADDR = 'http://localhost:8888';
const PROXY_PORT = 9999;

let corsProxyServer;

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

gulp.task('integrationTest', ['startCorsProxy'], (done) => {
  karma.start({
    configFile: path.join(__dirname, '/karma.integration.conf.js')
  }, () => {
    corsProxyServer.close(done);
  });
});

gulp.task('build', ['lint', 'unitTest'], () => {
  return gulp.src(APP_SRC)
  .pipe(babel())
  .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('startCorsProxy', (done) => {
  let app = connect();
  app.use(cors());
  app.use(proxy(INTEGRATION_DRUPAL_ADDR));
  corsProxyServer = http.createServer(app).listen(PROXY_PORT, done);
});
