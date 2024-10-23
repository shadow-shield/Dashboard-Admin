
import GraficaAdmitidos from "../components/GraficaAdmitidosPorTipo";

const AdmitidosPorTipo = () => {
  return (
    <div >
      <h1 style={{textAlign:"center"}}>
      </h1>
      <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
      ADMITIDOS CLASIFICADOS POR TIPO DE ADMISIÓN
            </h1>
      

      <div style={{ marginTop: "2rem" }}>
        <GraficaAdmitidos />
      </div>
    </div>
  );
};

export default AdmitidosPorTipo;
