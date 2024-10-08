import React from "react";
import GraficaSexo from "../components/GraficaSexo";

const AdmitidosSexo = () => {
  return (
    <div>
      <h1>Admitidos por sexo</h1>

      {/* Otras secciones del dashboard si existen */}

      {/* Sección del gráfico de admitidos clasificados por sexo */}
      <div style={{ marginTop: "2rem" }}>
        <GraficaSexo />
      </div>
    </div>
  );
};

export default AdmitidosSexo;
