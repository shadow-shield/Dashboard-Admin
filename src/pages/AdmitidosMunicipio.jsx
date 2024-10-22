import GraficoEstudiantesPorMunicipio from "../components/GraficaMunicipio";


function AdmitidosMunicipio() {
    return (
        <div >
            <h1 style={{ textAlign: "center" }}>ADMITIDOS CLASIFICADOS POR MUNICIPIO DE RESIDENCIA
            </h1>
            
                <GraficoEstudiantesPorMunicipio />
            
        </div>
    )
}

export default AdmitidosMunicipio