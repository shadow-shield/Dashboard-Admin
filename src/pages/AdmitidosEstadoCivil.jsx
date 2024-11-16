import GraficaEstadoC from "../components/GraficaEstadoC"


const AdmitidosEstadoCivil = () => {
  return (
    <div >
      <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
        ADMITIDOS CLASIFICADOS POR ESTADO CIVIL

      </h1>
      <div style={{ marginTop: "2rem" }}>
        <GraficaEstadoC

        /></div>


    </div>
  )
}

export default AdmitidosEstadoCivil