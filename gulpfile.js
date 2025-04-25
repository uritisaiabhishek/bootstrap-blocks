const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const clean = require("gulp-clean");

// Theme Paths
const paths = {
	root: "./",
	scss: "./assets/scss/**/*.scss",
	js: "./assets/js/**/*.js",
	cssDest: "./assets/css",
	jsDest: "./assets/js",
};

// Clean old compiled CSS/JS files
function cleanBuild() {
	return gulp
		.src([`${paths.cssDest}/*.css`, `${paths.jsDest}/custom.min.js`], {
			read: false,
			allowEmpty: true,
		})
		.pipe(clean());
}

// Compile SCSS to minified CSS with sourcemaps
function styles() {
	return gulp
		.src("./assets/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.cssDest));
}

// Compile & bundle JS to custom.min.js with sourcemaps
function scripts() {
	return gulp
		.src([
			"./assets/js/custom.js",
			"./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
			"./node_modules/@popperjs/core/dist/umd/popper.min.js",
			"./node_modules/swiper/swiper-bundle.min.js",
		])
		.pipe(sourcemaps.init())
		.pipe(concat("custom.js"))
		.pipe(terser())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.jsDest));
}

// Watch SCSS and JS files for changes
function watchFiles() {
	gulp.watch(paths.scss, styles);
	gulp.watch(paths.js, scripts);
}

// Define gulp tasks
exports.clean = cleanBuild;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watchFiles;
exports.build = gulp.series(cleanBuild, styles, scripts);
exports.default = gulp.series(cleanBuild, styles, scripts, watchFiles);
