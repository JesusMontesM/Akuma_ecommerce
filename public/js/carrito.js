const host = "http://localhost:8000";

window.addEventListener("load", mostrarCarrito(1)); // De momento pondremos la compra 1 hasta que tengamos las compras----------------------------------------------------------------------------------------------------------------------

// funcion para mostrar carrusel de productos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
      /></div><li>${json[i].titulo} <button onclick="añadirProducto(${json[i].id})">Añadir al carrito</button></li></div>`;
      }
      containerDiv.innerHTML += "</div>";
    })
    .catch(function (error) {
      console.log(error);
    });

// Mostrar la lista de productos de la compra-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mostrarCarrito(compraID) {
    fetch(`${host}/carrito/${compraID}`)
    .then (function(response){
        return response.json();
    })
    .then(function(json){
        let carritoDiv = document.getElementById("listaCarrito");
        
        let innerHTML = "<div>";
        for(i=0; i<json.length; i++){
            innerHTML += 
                `<div>
                    <img src="../${json[i].foto}"
                    class="img-enana"/>
                </div>
                <div>
                    <h3>${json[i].nombre}</h3>
                    <p>${json[i].descripcion}</p>
                    <p>${json[i].precio}€</p>
                </div>
                <div>
                    <button class="menos" onclick="menos(${json[i].id})">➖</button>
                    <span class="total" id="total_${json[i].id}">${json[i].cantidad}</span>
                    <button class="mas" onclick="mas(${json[i].id})">➕</button>
                    <button onclick="eliminar(${json[i].id})"><i class="bi bi-bag-x-fill"></i></button>
                </div>`;
        }

        innerHTML += `</div>`;

        let precioTotalProductos;
        for(i=0; i<json.length; i++){
            precioTotalProductos += json[i].cantidad*json[i].precio;
        }

        innerHTML += `<div>
        <h3>Resumen del pedido</h3>
        <p>Continua con el proceso de compra para seleccionar el metodo de pago</p>
        <h3>${precioTotalProductos}</h3>
        <button class="boton" onClick="location.href='forma_pago.html'">Proceder al pago</button>
        </div>`;

        carritoDiv.innerHTML=innerHTML;
     }).catch(function(error){
        console.log(error);
     });
}