var gulp 		= require('gulp'),
	browserify 	= require('gulp-browserify'),
	uglify		= require('gulp-uglify'),
	rename		= require('gulp-rename');

gulp.task('browserify-syncdata', function() {
	gulp.src('./public/src/syncdata.js')
		.pipe(browserify({ insertGlobals: true }))
		.pipe(rename({ prefix: 'browser-'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('browserify-syncdata-min', function() {
	gulp.src('./public/src/syncdata.js')
		.pipe(browserify({ insertGlobals: true }))
		.pipe(uglify())
		.pipe(rename({ prefix: 'browser-', suffix: '.min'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('syncdata-node', function() {
	gulp.src('./public/src/syncdata.js')
		.pipe(rename({ prefix: 'node-'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', function() {
	gulp.watch('./public/src/syncdata.js', ['browserify-syncdata']);
	gulp.watch('./public/src/syncdata.js', ['browserify-syncdata-min']);
	gulp.watch('./public/src/syncdata.js', ['syncdata-node']);
});

gulp.task('run', ['watch']);