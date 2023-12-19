const host = "http://localhost:8000";

window.addEventListener("load", function (event) {
  // funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if (localStorage.getItem("email")) {
    let login_register = document.getElementById("login_register");
    login_register.innerHTML = `<li>${localStorage.getItem(
      "email"
    )}</li><button onClick="desloguear()">Salir</button>`;
  }

  // // funcion para mostrar carrusel de productos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
        class="img-chica"
      /></div><li>${json[i].titulo} <button onclick="carruselClick(${json[i].id})">Ver mas</button></li><li><button onclick="añadirProducto(${json[i].id})">Añadir al carrito</button></li></div>`;
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
  let loginemail = document.getElementById("login_register");
  loginemail.innerHTML = `<div id="login_register"><li><a href="/html/login_register.html">Login/registro</a></li></div>`;
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
      class="img-normalizada"
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

// funcion para añadir al carrito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function añadirProducto(compraID) {
//   const usuarioID = document.getElementById("nombre").value;
//   const direccionID = document.getElementById("apellidos").value;
//   const tarjetaID = document.getElementById("email_register").value;
//   const precio_final = document.getElementById("repite_email").value;
//   const compra_realizada = document.getElementById("password_register").value;

//   fetch(`${host}/carrito/${compraID}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       usuarioID: usuarioID,
//       direccionID: direccionID,
//       tarjetaID: tarjetaID,
//       precio_final: precio_final,
//       apellidos: apellidos,
//       compra_realizada: compra_realizada,
//     }),
//   })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         const containerDiv = document.getElementById("vermas");
//         containerDiv.innerHTML = `<div>
//         <div id= "vermas">
//         <div>        <img
//         src="../${json.foto}"
//         class="img-normalizada"
//       /></div>
      
//       </div>`;
//       alert(`Se ha añadido al carrito correctamente.`);
//       })
//       .catch(function (error) {
//         alert(error);
//       });
//   }

// function añadirProducto(compraID) {
//   const compraID = document.getElementById("compraID").value;
//   const productoID = document.getElementById("apellidos").value;
//   const cantidad = document.getElementById("email_register").value;

//   fetch(`${host}/carrito/${compraID}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       compraID: compraID,
//       productoID: productoID,
//       cantidad: cantidad,
//     }),
//   })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         if (json.login_register) {
//           localStorage.setItem("email", email);
//           window.location.href = "/index.html";
//           alert("añadido al carrito");
//         }
//       })
//       .catch(function (error) {
//         alert(error);
//       });
//   }

