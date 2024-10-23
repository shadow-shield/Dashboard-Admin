

import GraficaSexo from "../components/GraficaSexo";

const AdmitidosSexo = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
        CLASIFICADOS POR SEXO
      </h1>
      <div style={{ marginTop: "2rem" }}>
        <GraficaSexo />
      </div>
    </div>
  );
};

export default AdmitidosSexo;
