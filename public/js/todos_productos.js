const host = "http://localhost:8000";

window.addEventListener("load", function (event) {
  // funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if (localStorage.getItem("email")) {
    let registrado = document.getElementById("registrado");
    registrado.innerHTML = `<li>${localStorage.getItem(
      "email"
    )}</li><button onClick="desloguear()">Salir</button>`;
  }

  
// funcion para mostrar productos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fetch(`${host}/todos_productos?total=3`)
.then(function (response) {
  return response.json();
})
.then(function (json) {
  const containerDiv = document.getElementById("todos_los_productos");
  containerDiv.innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    containerDiv.innerHTML += `<a href="/html/producto.html"><div class="productos">  <div>        <img
    src="../${json[i].foto}"
    class="img-chica"
  /></div></a><ul><li>${json[i].nombre}</li> <li>${json[i].precio} €</li> <li>${json[i].valoracion}/10</li></ul> </div> `;
  }
  containerDiv.innerHTML += "";
})
.catch(function (error) {
  console.log(error);
});

});

// funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desloguear() {
    localStorage.removeItem("email");
    let loginemail = document.getElementById("registrado");
    loginemail.innerHTML = `<div id="registrado"><li><a href="/html/login_register.html">Login/registro</a></li></div>`;
}