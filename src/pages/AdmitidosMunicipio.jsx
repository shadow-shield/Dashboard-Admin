import GraficoEstudiantesPorMunicipio from "../components/GraficaMunicipio";


function AdmitidosMunicipio() {
    return (
        <div >

            <h1 className="text-4xl font-bold text-center text-green-800 mt-8 mb-4">
                ADMITIDOS CLASIFICADOS POR MUNICIPIO DE RESIDENCIA
            </h1>

            <GraficoEstudiantesPorMunicipio />

        </div>
    )
}

export default AdmitidosMunicipio