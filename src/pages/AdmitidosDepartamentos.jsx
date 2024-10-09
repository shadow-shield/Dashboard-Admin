import GraficoAdmitidosPorDepartamento from "../components/GraficoAdminidoPorDepartamentoDeResidencia"


const AdmitidosDepartamentos = () => {
  return (
    <div >
        <h1 style={{textAlign:"center"}}>Admitidos Por Departamentos </h1>
        <div>
            <GraficoAdmitidosPorDepartamento />
        </div>
    </div>
  )
}

export default AdmitidosDepartamentos