import ReporteGraficas from "../components/ReporteGraficas";
import { datosEstudiantes } from "../data/datosEstudiantes";


const ReportesEstudiantes = () => {
    return (
        <div>


            <ReporteGraficas
                datos={datosEstudiantes}
                indexBy="ESTRATO"
                title="Reporte de Estudiantes por Municipio"
                valueKey="value"
                isPercentage={false}
            />
            

        </div>
    );
};

export default ReportesEstudiantes;
