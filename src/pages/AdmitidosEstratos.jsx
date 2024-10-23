import GraficaEstratos from "../components/GraficaEstratos";
import { datosEstudiantes } from "../data/datosEstudiantes";


const ReportEstratos = () => {
    return (
        <div>


            <GraficaEstratos
                datos={datosEstudiantes}
                indexBy="ESTRATO"
                title="Reporte Estratos"
                valueKey="value"
                isPercentage={false}
            />
            

        </div>
    );
};

export default ReportEstratos;
