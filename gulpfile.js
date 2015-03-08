var gulp 		= require('gulp'),
	browserify 	= require('gulp-browserify'),
	uglify		= require('gulp-uglify'),
	rename		= require('gulp-rename');

gulp.task('browserify-syncdata', function() {
	gulp.src('./public/src/syncdata.js')
		.pipe(browserify({ insertGlobals: true }))
		//.pipe(uglify())
		//.pipe(rename({ suffix: '.min'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('browserify-demo', function() {
	gulp.src('./public/src/demo.js')
		.pipe(browserify({ insertGlobals: true }))
		//.pipe(uglify())
		//.pipe(rename({ suffix: '.min'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', function() {
	gulp.watch('./public/src/syncdata.js', ['browserify-syncdata']);
	gulp.watch('./public/src/demo.js', ['browserify-demo']);
});

gulp.task('run', ['watch']);