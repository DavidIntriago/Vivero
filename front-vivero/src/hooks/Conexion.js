import { NextResponse } from "next/server";
import { headers } from "../../next.config";

let URL = "http://localhost:3000/users/admin/";
export function url_api() {
  return URL;
}

export async function obtener(recurso) {
  const response = await fetch(URL + recurso);
  console.log(response);
  return await response.json();
}

export async function obtenerVentas(token) {
  try {
    const response = await fetch(
      URL + "/admin/venta",
      {
        method: "GET",
        headers: {
          "TOKEN-KEY": token,
        },
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function obtenerVentasUser(external) {
  try {
    const response = await fetch(
      URL + "/admin/venta/vendedor/"+external
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function obtenerVentasFecha(external) {
  try {
    const response = await fetch(
      URL + "/admin/ventaMes/"+external
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }

}
export async function obtenerInfVenta(external) {
  try {
    const response = await fetch(
      URL + "/admin/venta/"+external,
      
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function obtenerClientes(token) {
  try {
    const response = await fetch(
      URL + "/admin/cliente",
      {
        method: "GET",
        headers: {
          "TOKEN-KEY": token,
        },
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function obtenerInfAuto(externalAuto) {
  try {
    const response = await fetch(
      URL + "admin/infauto/" + externalAuto,
    );
    console.log(response)
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function updateAuto(data, token, external) {
  try {
    const response = await fetch(URL+"admin/auto/update/"+ external, {
      method: "PUT",
      headers: {
        "TOKEN-KEY": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function aggImg(imagen, token, external) {
  try {
   
    const response = await fetch(URL+"admin/auto/update/imagen/"+external, {
      method: "POST",
      headers: {
        "TOKEN-KEY": token,
      },
      body: imagen,
    });
    console.log(imagen)
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}



export async function datosAutos(data, token) {
  try {
    const response = await fetch(URL+"admin/auto/save", {
      method: "POST",
      headers: {
        "TOKEN-KEY": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function guardar_cliente(data, token) {
  try {
    const response = await fetch(URL+"admin/cliente/save", {
      method: "POST",
      headers: {
        "TOKEN-KEY": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function crear_venta(data, token) {
  try {
    const response = await fetch(URL+"admin/venta/save", {
      method: "POST",
      headers: {
        "TOKEN-KEY": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("aqui falla")
    console.log(error);
    return null;
  }
}
export async function update_venta(data, token, external) {
  try {
    const response = await fetch(URL+"admin/venta/update/"+external, {
      method: "PUT",
      headers: {
        "TOKEN-KEY": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("aqui falla")
    console.log(error);
    return null;
  }
}
