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

// Agregar actividad
const agregarActividad = async (tiempo, fecha, idUsuario, apiKey, idActividad) => {
  try {
    const response = await fetch(`${BASE_URL}/registros.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tipo de contenido
        "apikey": apiKey, // API Key en el header
        "iduser": idUsuario, // ID del usuario en el header
      },
      body: JSON.stringify({
        idActividad: idActividad, // ID de la actividad
        idUsuario: idUsuario, // ID del usuario (también en el body, si es necesario)
        tiempo: tiempo, // Tiempo de la actividad
        fecha: fecha, // Fecha de la actividad
      }),
    });

    if (response.ok) {
      return response.json(); // Si la respuesta es exitosa, devuelve los datos
    } else {
      const errorData = await response.json(); // Captura el cuerpo de la respuesta en caso de error
      console.log("Error del servidor:", errorData); // Muestra el mensaje de error
      return Promise.reject({
        message: "Ha ocurrido un error",
      });
    }
  } catch (error) {
    console.log("Error en la solicitud:", error); // Captura errores de red o de la API
    return Promise.reject({
      message: "Ha ocurrido un error",
    });
  }
};

//Obtener actividades

const ObtenerActividades = async (apiKey, idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/actividades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,   
        "iduser": idUser, 
      },
    });

    console.log(response);

    if (response.ok) {
      console.log("Entro");
      return response.json();
    } else {
      console.log("No entro", response.status);
      return Promise.reject(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log("No entro2", error);
    return Promise.reject("Ha ocurrido un error");
  }
};




export { login, getPaises, registrarse,agregarActividad ,ObtenerActividades};
