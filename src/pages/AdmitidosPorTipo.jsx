
import GraficaAdmitidos from "../components/GraficaAdmitidosPorTipo";

const AdmitidosPorTipo = () => {
  return (
    <div >
      <h1 style={{textAlign:"center"}}>Admitidos Clasificados Por Tipo de Admision</h1>

      <div style={{ marginTop: "2rem" }}>
        <GraficaAdmitidos />
      </div>
    </div>
  );
};

export default AdmitidosPorTipo;
