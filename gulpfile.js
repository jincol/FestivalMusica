const { src, dest, watch, parallel } = require("gulp"); //requiere -> extrae las funciones de gulp

//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber"); //Nos ayude a detectar error sin parar la ejecucion de watch
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");


//src ->Identifia un archivo o una serie de las mismas
//dest -> Nos permite alamcenar en una carpeta destino

//Imagenes
const cache = require("gulp-cache");
const webp = require("gulp-webp"); //Convierte webp
const avif = require("gulp-avif"); //convierte en Avif
const imagemin = require("gulp-imagemin"); //optimiza jpg

//Java Script
const terser = require("gulp-terser-js");

//Funcion que ejecuta css
function css(callback) {
  src("src/scss/**/*.scss") //Encontrar el origen o el archivo
  .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")); //Almacenar en el disco duro

  callback(); //Sig., que aqui es el final de la funcion
}

//Funcion que optimiza imagenes jpg
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

//Funcion que ejecuta las imagenes a webp
function versionWebp(done) {
  const opiciones = { quality: 50 };

  src("src/img/**/*.{png,jpg}").pipe(webp(opiciones)).pipe(dest("build/img"));

  done();
}

//Funcion que ejecuta las imagenes a avif
function versionAvif(done) {
  const opiciones = { quality: 50 };

  src("src/img/**/*.{png,jpg}")
    .pipe(avif(opiciones))
    .pipe(dest("build/img"));

  done();
}

//f¿Funcion que mueve los archivos a otra carpeta
function javaScript(done) {
  src("src/js/**/*.js")
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest("build/js"));
  done();
}  



function dev(done) {
  watch("src/scss/**/*.scss", css); //el archivo a ejecutra,la funcion a ejecutar
  watch("src/js/**/*.js", javaScript); //el archivo de origen a ejecutra,la funcion a ejecutar estara en escucha activa siempre
  done();
}

exports.css = css;
exports.javaScript = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif,javaScript, dev);
