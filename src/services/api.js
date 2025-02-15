const BASE_URL = "https://movetrack.develotion.com";

const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
      }),
    });
    console.log(response)
    if (response.status == 200) {
      return response.json();
    } if (response.status == 409) {
      return Promise.reject("Usuario y/o contraseña incorrecto");
    } else {
      return Promise.reject("Ha ocurrido un error");
    }
  } catch (error) {
    return Promise.reject("Ha ocurrido un error");
  }
};

const getPaises = async () => {
  try {
    const response = await fetch(`${BASE_URL}/paises.php`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    });
    console.log(response)
    if (response.status == 200) {
      return response.json();
    } else {
      return Promise.reject("Ha ocurrido un error");
    }
  } catch (error) {
    return Promise.reject("Ha ocurrido un error");
  }
};

const registrarse = async (username, password, pais) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios.php`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        password: password,
        pais: pais
      }),
    });
    console.log(response)
    if (response.status == 200) {
      console.log("registro exitoso")
      return response.json();
    }else if(response.status == 409){
      return Promise.reject("El nombre de usuario ya está en uso");
    } else {
      return Promise.reject("Ha ocurrido un error");
    }
  } catch (error) {
    return Promise.reject("Ha ocurrido un error");
  }
};

export { login, getPaises, registrarse };
