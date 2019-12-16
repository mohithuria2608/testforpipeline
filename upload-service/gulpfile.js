const gulp = require("gulp");
const pm2 = require('pm2');
const ts = require("gulp-typescript");
const del = require("del");
const tsProject = ts.createProject("tsconfig.json");
const tslint = require("gulp-tslint");
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;

const outputFolder = "dist";
const logFolder = "log";
const protoFolder = "proto";

gulp.task("clean", function () {
	return del([outputFolder, logFolder, protoFolder]);
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

gulp.task("copyProto", function () {
	return gulp.src(['../proto/**/*']).pipe(gulp.dest("./proto"));
});

gulp.task("copyModel", function () {
	return gulp.src(['../model/**/*']).pipe(gulp.dest("./model"));
});

gulp.task("copyConfig", function () {
	return gulp.src(['../config/**/*']).pipe(gulp.dest("./config"));
});

gulp.task('server', function () {
	pm2.connect(true, function () {
		pm2.start({
			name: 'upload',
			script: 'dist/app.js',
			env: {
				"NODE_ENV": "default"
			}
		}, function () {
			console.log('upload pm2 started');
			pm2.streamLogs('menu', 0);
		});
	});
});

// gulp.task('server', function () {
// 	const env = Object.create(process.env);
// 	env.NODE_ENV = 'default';
// 	return spawn('node', ['dist/app.js'], { env: env, stdio: 'inherit' });
// })

/**
  * @todo add "lint" after "clean"
  */
gulp.task('default', gulp.series("clean", "compile", "copyContent", "copyProto", "copyModel", "copyConfig", "server"));
