const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const tsProject = ts.createProject("tsconfig.json");
const tslint = require("gulp-tslint");
const runSequence = require('run-sequence');

const outputFolder = "dist";
const logFolder = "log";

gulp.task("clean", function () {
	return del([outputFolder, logFolder]);
});


/**
  * @description Ts Linter
  */
// gulp.task("lint", function () {
// 	return gulp.src(["src/**/*.ts", "!src/**/*.d.ts"])
// 		.pipe(tslint({
// 			formatter: "verbose",
// 			configuration: "./tslint.json"
// 		}))
// 		.pipe(tslint.report())
// });

gulp.task("compile", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(outputFolder));
});

gulp.task("copyContent", function () {
	return gulp.src(["Dockerfile"]).pipe(gulp.dest(outputFolder));
});

/**
  * @todo add "lint" after "clean"
  */
gulp.task('default', gulp.series("clean", "compile", "copyContent"));