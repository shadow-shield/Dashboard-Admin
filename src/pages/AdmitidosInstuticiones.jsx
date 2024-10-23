import GraficaInst from "../components/GraficaInstituciones";

const AdmitidosInst = () => {
  return (
    <div >
     
      <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
      Admitidos por Instituciones 
    </h1>
   
      <div style={{ marginTop: "2rem" }}>
        <GraficaInst />
      </div>
    </div>
  );
};

export default AdmitidosInst;
