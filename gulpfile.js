const { src, dest, watch, parallel } = require("gulp");  // src pára identificar y dest para almacenar

// CSS
const sass = require("gulp-sass")(require("sass"));   // traigo sass
const plumber = require("gulp-plumber"); //Extraigo plumber

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


function css( done ) {
    // 1ro identificar el archivo de SASS
    // 2do Compilarlo
    // 3ro Almacenarla en el disco duro
    src('src/scss/**/*.scss')  // identifica --> **/* Para que busque todos los archivos con extension .scss
        .pipe(plumber())
        .pipe(sass())  // compila 
        .pipe(dest("build/css")); // donde se almacena

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución de la función
}

function imagenes( done ) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg, png}')
        .pipe( cache(imagemin(opciones)) )
        .pipe( dest('build/img') )

    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 70
    }
    
    src('src/img/**/*.{jpg, png}')  //{} con las llaves puedo especificar varios tipos de formatos de los archivos
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )

    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 70
    }
    
    src('src/img/**/*.{jpg, png}')  //{} con las llaves puedo especificar varios tipos de formatos de los archivos
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )

    done();
}

function dev( done ) {
    watch("src/scss/**/*.scss", css);  // Cuando cambie algo en el archivo, se va a llamar la funcion css

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);