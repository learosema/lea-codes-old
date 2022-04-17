import gulp from "gulp";
import { createGulpEsbuild } from "gulp-esbuild";
// import { glsl } from 'esbuild-plugin-glsl';

// Flags whether we compress the output etc
const isProduction = process.env.NODE_ENV === "production";

function buildFactory(gulpEsbuild) {
  function esbuild() {
    return gulp
      .src("./src/js/index.js")
      .pipe(
        gulpEsbuild({
          outfile: "bundle.js",
          bundle: true,
          format: "esm",
          minify: true,
          plugins: [], // [glsl({ minify: isProduction })],
        })
      )
      .pipe(gulp.dest("./public"));
  }
  return esbuild;
}

function esbuild() {
  const gulpEsbuild = createGulpEsbuild({ piping: true });
  return buildFactory(gulpEsbuild)();
}

function watchEsbuild() {
  const gulpEsbuild = createGulpEsbuild({ incremental: true, piping: true });
  gulp.watch(
    "./src/js/**/*.js",
    { ignoreInitial: true },
    buildFactory(gulpEsbuild)
  );
}

export { esbuild, watchEsbuild };
