const host = "http://localhost:8000";

// funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("load", function (event) {
  if (localStorage.getItem("email")) {
    let registrado = document.getElementById("registrado");
    registrado.innerHTML = `<li>${localStorage.getItem(
      "email"
    )}</li><button onClick="desloguear()">Salir</button>`;
  }

// // funcion para mostrar carrusel de eventos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  fetch(`${host}/carrusel?total=3`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("carrusel");
      containerDiv.innerHTML = "<ul>";

      for (let i = 0; i < json.length; i++) {
        containerDiv.innerHTML += `<div id="productos">../${json[i].foto}<li>${json[i].titulo} <button onclick="carruselClick(${json[i].id})">Ver mas</button></li></div>`;
      }
      containerDiv.innerHTML += "</ul>";
    })
    .catch(function (error) {
      console.log(error);
    });
});

// funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function desloguear() {
//   localStorage.removeItem("email");
//   let loginemail = document.getElementById("registrado");
//   loginemail.innerHTML = `<div id="registrado"><li><a href="/html/login.html">Login/registro</a></li></div>`;
// }

// funcion para mostrar informacion del carrusel-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function carruselClick(total) {
  fetch(`${host}/carrusel?${total}`, {})
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("carrusel");
      containerDiv.innerHTML = `<div>
      <div id= "sabermas">
      <h5>Descripcion: ${json.descripcion}</h5>
      <h5>Stock - ${json.stock}</h5>
      </div>
    </div>`;
    })
    .catch(function (error) {
      alert(error);
    });
}


