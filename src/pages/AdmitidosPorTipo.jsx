
import GraficaAdmitidos from "../components/GraficaAdmitidosPorTipo";

const AdmitidosPorTipo = () => {
  return (
    <div >
      <h1 style={{textAlign:"center"}}>Admitidos Clasificados Por Tipo de Admision</h1>

      {/* Otras secciones del dashboard si existen */}

      {/* Sección del gráfico de admitidos clasificados por sexo */}
      <div style={{ marginTop: "2rem" }}>
        <GraficaAdmitidos />
      </div>
    </div>
  );
};

export default AdmitidosPorTipo;
