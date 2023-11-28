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

// carrusel-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get(`/carrusel`, (request, response) => {
  // select * from carrusel
  connection.query("select * from carrusel", (error, result, fields) => {
    handleSQLError(response, error, result, (result) => {
        let total = request.query.total;
        let carrusel = [];
        for (let i = 0; i < total; i++) {
          carrusel[i] = result[i];
        }
        response.send(carrusel);
    });
  });
});



app.listen(8000, () => {
  console.log("API up and running!");
});
