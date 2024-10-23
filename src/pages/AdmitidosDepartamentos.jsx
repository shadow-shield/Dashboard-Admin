import GraficoAdmitidosPorDepartamento from "../components/GraficoAdminidoPorDepartamentoDeResidencia"


const AdmitidosDepartamentos = () => {
  return (
    <div >

      <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
        ADMITIDOS CLASIFICADOS POR DEPARTAMENTO DE RESIDENCIA
      </h1>
      <div>
        <GraficoAdmitidosPorDepartamento />
      </div>
    </div>
  )
}

export default AdmitidosDepartamentos