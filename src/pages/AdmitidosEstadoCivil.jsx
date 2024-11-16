import GraficaEstadoC from "../components/GraficaEstadoC"


const AdmitidosEstadoCivil = () => {
  return (
    <div >
        
        <div>
            <GraficaEstadoC 
            datos={null}
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