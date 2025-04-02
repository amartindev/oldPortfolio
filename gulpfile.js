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
        .pipe(dest('dist/css'));  // Guardar en dist/css
    done();
}

// Copiar archivos estáticos (como imágenes y fuentes) a "dist/assets"
function copyAssets(done) {
    src('assets/**/*')
        .pipe(dest('dist/assets'));  // Copiar a dist/assets
    done();
}

// Copiar el archivo index.html a "dist"
function copyHtml(done) {
    src('index.html')  // Copiar el archivo index.html
        .pipe(dest('dist/'));  // Copiarlo a la raíz de dist
    done();
}

// Copiar archivos JavaScript a "dist/js"
function copyJs(done) {
    src('js/**/*')  // Ajusta según la ubicación de tus archivos JS
        .pipe(dest('dist/js'));  // Copiar a dist/js
    done();
}

// Copiar imágenes a "dist/img"
function copyImages(done) {
    src('img/**/*')  // Ajusta según la ubicación de tus imágenes
        .pipe(dest('dist/img'));  // Copiar a dist/img
    done();
}

// Copiar archivos de idioma a "dist/lang" (si es necesario)
function copyLang(done) {
    src('lang/**/*')  // Ajusta según la ubicación de tus archivos de idioma
        .pipe(dest('dist/lang'));  // Copiar a dist/lang
    done();
}

// Observar cambios en SASS
function dev(done) {
    watch('sass/**/*.scss', css);
    done();
}

// Definir tareas principales
exports.build = series(css, copyAssets, copyHtml, copyJs, copyImages, copyLang);  // Incluye todas las tareas
exports.dev = parallel(css);
