const { src, dest, watch } = require("gulp");  // src pára identificar y dest para almacenar
const sass = require("gulp-sass")(require("sass"));   // traigo sass

function css(done) {
    // 1ro identificar el archivo de SASS
    // 2do Compilarlo
    // 3ro Almacenarla en el disco duro
    src('src/scss/app.scss')  // identifica
    .pipe(sass())  // compila 
    .pipe(dest("build/css")); // donde se almacena

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución de la función
}

function dev(done) {
    watch("src/scss/app.scss", css);  // Cuando cambie algo en el archivo, se va a llamar la funcion css

    done();
}

exports.css = css;
exports.dev = dev;