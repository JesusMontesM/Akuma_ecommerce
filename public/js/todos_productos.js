const host = "http://ec2-18-201-203-44.eu-west-1.compute.amazonaws.com:8000";

window.addEventListener("load", function (event) {
  // funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if (localStorage.getItem("email")) {
    let login_register = document.getElementById("login_register");
    login_register.innerHTML = `<li>${localStorage.getItem(
      "email"
    )}</li><button onClick="desloguear()">Salir</button>`;
  }

  
// funcion para mostrar productos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fetch(`${host}/todos_productos?total=5`)
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
  /></div></a><ul><li>${json[i].nombre}</li> <li>${json[i].precio} €</li> <li>${json[i].valoracion}/10</li> <li><button onclick="añadirProducto(${json[i].id})">Añadir al carrito</button></li></ul> </div> `;
  }
  containerDiv.innerHTML += "";
})
.catch(function (error) {
  console.log(error);
});

});

// funcion añadir al carrito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// <button onclick="agregarAlCarrito('Producto 1', 29.99)">Añadir al Carrito</button>

    // Función para agregar un producto al carrito
    // function añadir_carrito() {
        
    //     alert(`Se ha añadido al carrito correctamente.`);
    // }
// funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desloguear() {
    localStorage.removeItem("email");
    let loginemail = document.getElementById("login_register");
    loginemail.innerHTML = `<div id="login_register"><li><a href="/html/login_register.html">Login/registro</a></li></div>`;
}