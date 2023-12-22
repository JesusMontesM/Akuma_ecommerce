const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// crear conexion con mysql------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bichomalo17",
  database: "ecommerce",
});

// conectar con mysql------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

connection.connect(function (error) {
  if (error) {
    return console.error(`error: ${error.message}`);
  }

  console.log("Conectado a MYSQL!!!");
});

// Funciones utiles---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Funcion error para callback---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function handleSQLError(response, error, result, callback) {
  if (error) {
    response.status(400).send(`error: ${error.message}`);
    return;
  }
  callback(result);
}

// Endpoints para Index------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// carrusel de productos-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get(`/carrusel`, (request, response) => {
  // select * from carrusel
  connection.query("SELECT * FROM carrusel", (error, result, fields) => {
    if (error) {
      response.status(400).send(`error: ${error.message}`);
      return;
    }
    let total = request.query.total;
    let productos = [];
    for (let i = 0; i < total; i++) {
      productos[i] = result[i];
    }
    response.send(productos);
  });
});

// mostrar producto segun id------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/carrusel/:idproducto", function (request, response) {
  const idproducto = request.params.idproducto;

  connection.query(
    `select * from carrusel where id = "${idproducto}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }

      if (result.length == 0) {
        response.send({});
      } else {
        response.send(result[0]);
      }
    }
  );
});

// Termina el Index------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Login-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post(`/login`, function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  let nombre = request.body.nombre;
  connection.query(
    `select * from usuarios where email = "${email}" and password = "${password}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }

      if (result.length == 0) {
        response.send({ message: "email o password no validos" });
      } else {
        response.send({
          message: `usuario logueado: ${email}`,
          login_register: true,
        });
      }
    }
  );
});

// registro--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post(`/registro`, function (request, response) {
  // hacer un registro
  let nombre = request.body.nombre;
  let apellidos = request.body.apellidos;
  let email = request.body.email;
  let password = request.body.password;

  // console.log(request.body);

  // insert into usuarios------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  connection.query(
    `insert into usuarios (nombre, apellidos, email, password) values ("${nombre}", "${apellidos}", "${email}", "${password}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }
      //   console.log("usuario registrado");
      else {
        response.send({
          message: `usuario registrado: ${email}`,
          login_register: true,
        });
      }
    }
  );
});

// Mostrar todos los productos--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get(`/todos_productos`, (request, response) => {
  // select * from carrusel
  connection.query("SELECT * FROM productos", (error, result, fields) => {
    if (error) {
      response.status(400).send(`error: ${error.message}`);
      return;
    }
    let total = request.query.total;
    let productos = [];
    for (let i = 0; i < total; i++) {
      productos[i] = result[i];
    }
    response.send(productos);
  });
});

// Termina login y registro------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// endpoint para carrito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// app.post(`/carrito`, function (request, response) {
//   // comenzar una compra
//   let usuarioID = request.body.usuarioID;
//   let direccionID = request.body.direccionID;
//   let tarjetaID = request.body.tarjetaID;
//   let precio_final = request.body.precio_final;
//   let compra_realizada = request.body.compra_realizada;

//   // insert into compras------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   connection.query(
//     `insert into compras (usuarioID, direccionID, tarjetaID, precio_final, compra_realizada) values ("${usuarioID}", "${direccionID}", "${tarjetaID}", "${precio_final}", "${compra_realizada}")`,
//     function (error, result, fields) {
//       if (error) {
//         response.status(400).send(`error: ${error.message}`);
//         return;
//       } else {
//         response.send({
//           message: `añadido al carrito`,
//         });
//       }
//     }
//   );

// });

// app.post(`/carrito/:compraID`, function (request, response) {

//   let precio_final = request.body.precio_final;

//   // actualizar una compra------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   connection.query(
//     `UPDATE compras 
//     SET 
//        precio_final = '${precio_final}' 
//     WHERE 
//        id = 2;`,
//     function (error, result, fields) {
//       if (error) {
//         response.status(400).send(`error: ${error.message}`);
//         return;
//       } else {
//         response.send({
//           message: `añadido al carrito`,
//         });
//       }
//     }
//   );

// });

// endpoint para carrito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post(`/carrito`, function (request, response) {
  // comenzar una compra
  let compraID = request.body.compraID;
  let productoID = request.body.productoID;
  let cantidad = request.body.cantidad;


  // insert into compras------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  connection.query(
    `insert into compra_producto (compraID, productoID, cantidad) values ("${compraID}", "${productoID}", "${cantidad}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      } else {
        response.send({
          message: `añadido al carrito`,
        });
      }
    }
  );

});

app.post(`/carrito/:compraID`, function (request, response) {

  let precio_final = request.body.precio_final;

  // actualizar una compra------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  connection.query(
    `UPDATE compras 
    SET 
       precio_final = '${precio_final}' 
    WHERE 
       id = 2;`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      } else {
        response.send({
          message: `añadido al carrito`,
        });
      }
    }
  );

});

// mostar compra carrito-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get(`/carrito/:compraID`, function (request, response) {
  connection.query(
    `SELECT * FROM productos
  JOIN compra_producto ON productos.id=compra_producto.productoID
  JOIN compras ON compras.id=compra_producto.compraID
      WHERE compraID= ${request.params.compraID}`,
    function (error, result, fields) {
      if (error) {
        return console.error(`error: ${error.message}`);
      }
      response.send(result);
    }
  );
});

// endpoint para forma de pago-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// app.get(`/formasPago/:usuarioId`, function(request, response){
//   connection.query(`SELECT * FROM tarjetas where usuarioID=${request.params.usuarioID}`,
//   function(error, result, fields){
//       if(error){
//           return console.error(`error:${error.message}`);
//       }
//       response.send(result);
//   })
//   console.log("Listado de tarjeta del usuario correspondiente");
// })

// app.post(`/tarjetas/:usuarioId`, function (request, response) {
//   let numeroTarjeta = request.body.numeroTarjeta;
//   let titularTarjeta = request.body.titularTarjeta;
//   let caducidadTarjeta = request.body.caducidadTarjeta;
//   let codigoSeguridadTarjeta = request.body.codigoSeguridadTarjeta;
//   let usuarioId = request.params.usuarioId;

//   console.log(request.body.titularTarjeta, request.params);
//   connection.query(`INSERT INTO tarjetas (numero_tarjeta, titular, caducidad, codigo, usuarioId) VALUES 
//                   ("${numeroTarjeta}",
//                   "${titularTarjeta}",
//                   "${caducidadTarjeta}",
//                   "${codigoSeguridadTarjeta}",
//                   ${usuarioId})`,
//       function (error, result, fields) {
//           if (error) {
//               return console.error(`error: ${error.message}`);
//           }
//           response.send({ message: `Card added` });
//       });
//   console.log("Card added to database")
// });


app.listen(8000, () => {
  console.log("API up and running!");
});
