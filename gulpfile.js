const gulp = require('gulp')
const run = require('gulp-run')

gulp.task('dashboard', (cb) => {
	run('cd packages/dashboard && yarn build').exec('', () => {
		cb()
	})
})

gulp.task('dist', (cb) => {
	gulp
		.src('packages/dashboard/build/**')
		.pipe(gulp.dest('packages/synckage/src/web/webapp'))

	// copy lastest readme
	gulp.src('README.md').pipe(gulp.dest('packages/synckage/'))
	cb()
})
