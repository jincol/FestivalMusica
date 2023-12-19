document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  ScrollNav();
  navegacionFija()
}
 //Funcion para obtener posicion y fijar elemento HTML (navegacion)
function navegacionFija(){
  const barra = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival');
  const body = document.querySelector('body');

  window.addEventListener('scroll',function(){

    if(sobreFestival.getBoundingClientRect().top < 0){
      barra.classList.add('fijo')
      body.classList.add('body-scroll')
    }else{
      barra.classList.remove('fijo')
      body.classList.remove('body-scroll')
    }

  })
}

 //Funcion que hara el efecto de Scroll Smoth 
 function ScrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a') //Obtiene los enlaces <a>
 
      enlaces.forEach(enlace =>{ //recore cada enlace y recibe como parametro un callbakk
        enlace.addEventListener('click',function (e) { //se le otorga un evento click y ejecuta una funcion e
          e.preventDefault(); //Previene el comportamiento normal
          const scroll = e.target.attributes.href.value //Obtiene el valor del atributo href
          const seccion = document.querySelector(scroll) //Obtiene el ID que contiene Scroll
          seccion.scrollIntoView({behavior: "smooth"}) //aplica el efecto
        })
      })
  }


function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  //un bucle que crea 12 repeticiones
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
            <source srcset="./build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="./build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="./build/img/thumb/${i}.jpg" alt="Imagen Galeria">
       `;

    imagen.onclick = function () {
      //genera un evento cada que se hace click
      mostrarImagen(i); //Recibe el valor del recorrido del bucle
    };

    galeria.appendChild(imagen); //agrega a galeria
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture"); //crea - innerHTML agrega al DOM
  imagen.innerHTML = ` 
            <source srcset="./build/img/grande/${id}.avif" type="image/avif">
            <source srcset="./build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="./build/img/grande/${id}.jpg" alt="Imagen Galeria">
       `;

  //Crea el overlay con la imagen de las filas superiores
  const overlay = document.createElement("div"); //rea
  overlay.appendChild(imagen);  //agrega a la clase overlay
  overlay.classList.add("overlay"); //agrega clase al div
  overlay.onclick=function(){  //escucha evento click
    const body = document.querySelector("body"); //seleeciona el body
    body.classList.remove('fijar-body') //remueve la clase
    overlay.remove(); //remueve el overlay
  }
  //btn para cerrar el modal
  const cerrarModal = document.createElement("p");
  cerrarModal.textContent = "X"; //crea contenido
  cerrarModal.classList.add("btn-cerrar"); 
  cerrarModal.onclick = function () { 
    const body = document.querySelector("body"); 
    body.classList.remove('fijar-body')
    overlay.remove();
  };

  overlay.appendChild(cerrarModal);
  //Agrega al body
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add('fijar-body') //agrega clase
}
