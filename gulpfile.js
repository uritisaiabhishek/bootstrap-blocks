const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const path = require("path");

// Theme Paths
const paths = {
	root: "./",
	scss: "./assets/scss/**/*.scss",
	js: "./assets/js/**/*.js",
	cssDest: "./assets/css",
	jsDest: "./assets/js",
	templates: "./templates/**/*.html",
	parts: "./parts/**/*.html",
	php: "./**/*.php",
	images: "./assets/images/**/*",
};

// Clean old compiled CSS/JS (optional)
function cleanBuild() {
	return gulp
		.src(
			[
				`${paths.cssDest}/*.css`,
				`${paths.jsDest}/*.js`,
				`!${paths.jsDest}/*.min.js`,
			],
			{
				read: false,
				allowEmpty: true,
			}
		)
		.pipe(clean());
}

// Compile SCSS
function styles() {
	return gulp
		.src("./assets/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest(paths.cssDest))
		.pipe(browserSync.stream());
}

// Compile & bundle JS
function scripts() {
	return gulp
		.src([
			"./node_modules/@popperjs/core/dist/umd/popper.min.js",
			"./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
			"./node_modules/swiper/swiper-bundle.min.js",
			"./assets/js/custom.js", // your custom JS file
		])
		.pipe(sourcemaps.init())
		.pipe(concat("main.js"))
		.pipe(terser())
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest(paths.jsDest))
		.pipe(browserSync.stream());
}

// Define Gulp tasks
exports.clean = cleanBuild;
exports.styles = styles;
exports.scripts = scripts;
exports.build = gulp.series(cleanBuild, styles, scripts);
