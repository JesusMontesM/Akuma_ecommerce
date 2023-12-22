const host = "http://ec2-18-201-203-44.eu-west-1.compute.amazonaws.com:8000";

// funcion para el login-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // const checked = document.getElementById("checked").checked;
  // console.log(checked);

  fetch(`${host}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      alert(json.message);

      if (json.login_register) {
        localStorage.setItem("email", email);
        window.location.href = "/index.html";
      }
    })
    .catch(function (error) {
      alert(error);
    });
}

// funcion para el register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function register() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email_register").value;
  const repiteEmail = document.getElementById("repite_email").value;
  const password = document.getElementById("password_register").value;
  const repitePassword = document.getElementById("repitecontraseña").value;

  if (password == repitePassword && email == repiteEmail) {
    fetch(`${host}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        repiteemail: repiteEmail,
        password: password,
        nombre: nombre,
        apellidos: apellidos,
        repitePassword: repitePassword,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.login_register) {
          localStorage.setItem("email", email);
          window.location.href = "/index.html";
          alert("Usuario registrado");
        }
      })
      .catch(function (error) {
        alert(error);
      });
  } else if(password != repitePassword) {
    alert("las contraseñas no coinciden");
  }
  else if (email != repiteEmail) {
    alert("el email no es el mismo");
  }
  else {
    alert("error");
  }
}
