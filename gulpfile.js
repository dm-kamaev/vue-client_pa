'use strict';

const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const { getSftpConfig, appPath } = require('./config/backend')

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: getSftpConfig
})

gulp.task('copy', function () {
  gulp.src('dist/vue/**/*')
    .pipe(gulpSSH.dest('/p/clientPA/public/static/general/vue/'))
  gulp.src('dist/**/*.html')
    .pipe(gulpSSH.dest('/p/clientPA/template/'))
});

gulp.task('copy-site', function () {
  gulp.src('dist/vue/**/*')
    .pipe(gulpSSH.dest('/p/pancake/static/pancake/vue/'))
});

gulp.task('copy-app', function () {
  gulp.src('dist/css/**/*')
    .pipe(gulp.dest(`${appPath}/www/css/`))
  gulp.src('dist/js/**/*')
    .pipe(gulp.dest(`${appPath}/www/js/`))
  gulp.src('dist/**/*.html')
    .pipe(gulp.dest(`${appPath}/www/`))
});
