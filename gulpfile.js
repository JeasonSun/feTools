const gulp = require('gulp')
const clean = require('gulp-clean')
const copy = require('gulp-copy')
const less = require('gulp-less')
const uglifycss = require('gulp-uglifycss')
const uglifyjs = require('gulp-uglify-es').default
const htmlmin = require('gulp-htmlmin')
const jsonmin = require('gulp-jsonminify')

gulp.task('clean', () => {
  return gulp
    .src('output', { read: false, allowEmpty: true })
    .pipe(clean({ force: true }))
})

gulp.task('copy', () => {
  return gulp
    .src([
      'apps/**/*.{gif,png,jpg,jpeg,cur}',
      '!apps/static/screenshot/**/*'
    ])
    .pipe(copy('output'))
})

gulp.task('less', () => {
  return gulp
    .src(['apps/**/*.less'])
    .pipe(less())
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('css', () => {
  return gulp
    .src('apps/**/*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('output/apps'))
})

gulp.task('js', () => {
  return gulp
    .src('apps/**/*.js')
    .pipe(uglifyjs())
    .pipe(gulp.dest('output/apps'))
})

gulp.task('html', () => {
  return gulp
    .src('apps/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('output/apps'))
})

gulp.task('json', () => {
  return gulp
    .src('apps/**/*.json')
    .pipe(jsonmin())
    .pipe(gulp.dest('output/apps'))
})

gulp.task(
  'common',
  gulp.series(
    'clean',
    gulp.parallel('copy', 'less', 'css', 'js', 'html', 'json', done => {
      done()
    })
  )
)

gulp.task(
  'default',
  gulp.series('common', (done) => {
    console.log('默认编译已经完成')
    done()
  })
)

gulp.task('watch', () => {
  gulp.watch(
    ['apps/**/*.*','apps/manifest.json'],
    gulp.series('common', () => {
      console.log(new Date().toLocaleString(), '> 文件发生变化，已编译：')
    })
  )
})
