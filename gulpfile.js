const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");

// Compilar SASS y guardar en "dist/css"
function css(done) {
    src('sass/style.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(dest('dist/css'));
    done();
}


function copyAssets(done) {
    src('assets/**/*')
        .pipe(dest('dist/assets'));
    done();
}


function dev(done) {
    watch('sass/**/*.scss', css);
    done();
}


exports.build = series(css, copyAssets);
exports.dev = parallel(css);
