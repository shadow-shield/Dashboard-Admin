/* import GraficaEstadoCivil from "../components/GraficaEstadoCivil" */
import GraficaEstadoC from "../components/GraficaEstadoC"
import { datosEstudiantes } from "../data/datosEstudiantes";


const AdmitidosEstadoCivil = () => {
  return (
    <div >
        
        <div>
            <GraficaEstadoC 
            datos={datosEstudiantes}
            indexBy="ESTADO_CIVIL"
            title="Reporte Estado Civil"
            valueKey="value"
            isPercentage={false}
            />
        </div>
    </div>
  )
}

export default AdmitidosEstadoCivil