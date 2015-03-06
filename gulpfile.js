var gulp 		= require('gulp'),
	browserify 	= require('gulp-browserify'),
	uglify		= require('gulp-uglify'),
	rename		= require('gulp-rename');

gulp.task('browserify', function() {
	gulp.src('./public/src/*.js')
		.pipe(browserify({ insertGlobals: true }))
		//.pipe(uglify())
		//.pipe(rename({ suffix: '.min'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', function() {
	gulp.watch('./public/src/*.js', ['browserify']);
});

gulp.task('run', ['watch']);