import { src, task, dest } from "gulp";
import cleanCSS from "gulp-clean-css";
import inline from "gulp-inline";
import uglify from "gulp-uglify";
import htmlSplit from 'gulp-htmlsplit';

function makeInline() {
	return src("./src/index.html")
		.pipe(
			inline({
				base: "./src",
				js: uglify,
				css: function () {
					return cleanCSS();
				},
			})
		);
}

task('default', function () {
	return makeInline()
		.pipe(htmlSplit())
		.pipe(dest("./dist"));
})


task('single', function () {
	return makeInline()
		.pipe(dest("./dist"));
})