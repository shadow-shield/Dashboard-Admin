import GraficoAdmitidosPorDepartamento from "../components/GraficoAdminidoPorDepartamentoDeResidencia"


const AdmitidosDepartamentos = () => {
  return (
    <div >
        <h1 style={{textAlign:"center"}}>ADMITIDOS CLASIFICADOS POR DEPARTAMENTO DE RESIDENCIA
        </h1>
        <div>
            <GraficoAdmitidosPorDepartamento />
        </div>
    </div>
  )
}

export default AdmitidosDepartamentos