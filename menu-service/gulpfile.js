const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const tsProject = ts.createProject("tsconfig.json");
const pm2 = require('pm2');

const outputFolder = "dist";

const logFolder = "log";
const protoFolder = "proto";
const configFolder = "config";
const luaFolder = "lua";
const constantFolder = "constant";
const modelFolder = "model";

gulp.task("clean", function () {
	return del([outputFolder, logFolder, protoFolder, configFolder, luaFolder, constantFolder, modelFolder]);
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

gulp.task("copyConstant", function () {
	return gulp.src(['../constant/**/*']).pipe(gulp.dest("./src/constant"));
});

gulp.task("compile", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(outputFolder));
});

// gulp.task("copyContent", function () {
// 	return gulp.src(["Dockerfile"]).pipe(gulp.dest(outputFolder));
// });

gulp.task("copyProto", function () {
	return gulp.src(['../proto/**/*']).pipe(gulp.dest("./proto"));
});

gulp.task("copyModel", function () {
	return gulp.src(['../model/**/*']).pipe(gulp.dest("./model"));
});

gulp.task("copyConfig", function () {
	return gulp.src(['../config/**/*']).pipe(gulp.dest("./config"));
});

gulp.task("copyLua", function () {
	return gulp.src(['../lua/**/*']).pipe(gulp.dest("./lua"));
});

gulp.task('default', gulp.series("clean", "copyConstant","copyProto", "copyModel", "copyConfig", "copyLua", "compile"));


gulp.task('local', function () {
	pm2.connect(true, function () {
		pm2.start({
			name: 'menu',
			script: 'dist/app.js',
			env: {
				"NODE_ENV": "default"
			}
		}, function () {
			
			pm2.streamLogs('menu', 0);
		});
	});
});


gulp.task('dev', function () {
	pm2.connect(true, function () {
		pm2.start({
			name: 'menu',
			script: 'dist/app.js',
			env: {
				"NODE_ENV": "development"
			}
		}, function () {
			
			pm2.streamLogs('menu', 0);
		});
	});
});
gulp.task('qa', function () {
	pm2.connect(true, function () {
		pm2.start({
			name: 'menu',
			script: 'dist/app.js',
			env: {
				"NODE_ENV": "testing"
			}
		}, function () {
			
			pm2.streamLogs('menu', 0);
		});
	});
});

gulp.task('local', gulp.series("clean", "copyConstant","copyProto", "copyModel", "copyConfig", "copyLua", "compile", 'local'));
gulp.task('dev', gulp.series("clean", "copyConstant","copyProto", "copyModel", "copyConfig", "copyLua", "compile", "dev"));
gulp.task('qa', gulp.series("clean", "copyConstant","copyProto", "copyModel", "copyConfig", "copyLua", "compile", "qa"));