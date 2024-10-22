import GraficaInst from "../components/GraficaInstituciones";

const AdmitidosInst = () => {
  return (
    <div >
      <h1 style={{textAlign:"center"}}>Admitidos por Instituciones </h1>
   
      <div style={{ marginTop: "2rem" }}>
        <GraficaInst />
      </div>
    </div>
  );
};

export default AdmitidosInst;
