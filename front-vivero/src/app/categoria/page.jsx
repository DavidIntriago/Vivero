"use client"
import { obtener } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ListaAutos = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const obtenerCategoria = async () => {
      try {
        const result = await obtener("categoria");
        setData(result.data); 
        print(result)
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
     
    };

    obtenerCategoria();

  }, []);

  
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Lista de autos:
        </h1>
        
        {data && (
          <div
            className="catalogo"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {data.map((auto) => (
              <div className="catalogo-item"
              >
                <p>Modelo: {auto.nombre}</p>
                  </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListaAutos;