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
          registrado: true,
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
          registrado: true,
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



app.listen(8000, () => {
  console.log("API up and running!");
});
