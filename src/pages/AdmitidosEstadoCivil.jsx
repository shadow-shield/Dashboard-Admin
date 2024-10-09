import GraficaEstadoCivil from "../components/GraficaEstadoCivil"


const AdmitidosEstadoCivil = () => {
  return (
    <div >
        <h1 style={{textAlign:"center"}}>ADMITIDOS CLASIFICADOS POR ESTADO CIVIL
        </h1>
        <div>
            <GraficaEstadoCivil />
        </div>
    </div>
  )
}

export default AdmitidosEstadoCivil