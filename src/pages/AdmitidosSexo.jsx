
import GraficaSexo from "../components/GraficaSexo";

const AdmitidosSexo = () => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>ADMITIDOS CLASIFICADOS POR SEXO
      </h1>

   
      <div style={{ marginTop: "2rem" }}>
        <GraficaSexo />
      </div>
    </div>
  );
};

export default AdmitidosSexo;
