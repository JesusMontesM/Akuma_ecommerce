const host = "http://localhost:8000";

window.addEventListener("load", function (event) {
  // funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
      containerDiv.innerHTML = "<div>";

      for (let i = 0; i < json.length; i++) {
        containerDiv.innerHTML += `<div id="productos">  <div>        <img
        src="../${json[i].foto}"
        alt="imagen"
        width="15%"
      /></div><li>${json[i].titulo} <button onclick="carruselClick(${json[i].id})">Ver mas</button></li></div>`;
      }
      containerDiv.innerHTML += "</div>";
    })
    .catch(function (error) {
      console.log(error);
    });
});

// funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desloguear() {
  localStorage.removeItem("email");
  let loginemail = document.getElementById("registrado");
  loginemail.innerHTML = `<div id="registrado"><li><a href="/html/login.html">Login/registro</a></li></div>`;
}

// funcion para mostrar informacion del carrusel-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function carruselClick(productoID) {
  fetch(`${host}/carrusel/${productoID}`, {})
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("vermas");
      containerDiv.innerHTML = `<div>
      <div id= "vermas">
      <div>        <img
      src="../${json.foto}"
      alt="imagen"
      width="15%"
    /></div>
      <h5>Nombre: ${json.titulo}</h5>
      <h5>Descripcion: ${json.descripcion}</h5>
      <h5>Stock: ${json.stock}</h5>
      </div>
    </div>`;
    })
    .catch(function (error) {
      alert(error);
    });
}
