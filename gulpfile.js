const gulp = require('gulp');
const clean = require('gulp-clean');
const copy = require('gulp-copy');
const less = require('gulp-less');
const uglifycss = require('gulp-uglifycss');

gulp.task('clean', () => {
    return gulp
        .src('output', { read: false, allowEmpty: true })
        .pipe(clean({ force: true }))
});

gulp.task('copy', () => {
    return gulp
        .src(['apps/**/*.{gif,png,jpg,jpeg,cur}', '!apps/static/screenshot/**/*'])
        .pipe(copy('output'));
});

gulp.task('less', () => {
    return gulp
        .src(['apps/**/*.less'])
        .pipe(less())
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('common',
    gulp.series(
        'clean',
        gulp.parallel(
            'copy',
            'less',
            (done) => {
                done();
            }
        )
    )
);

gulp.task('default', gulp.series('common', () => {
    console.log('默认编译已经完成')
}));

gulp.task('watch', () => {
    gulp.watch('apps/**/*.*', gulp.series('common', () => {
        console.log(new Date().toLocaleString(), '> 文件发生变化，已编译：');
    }))
});


