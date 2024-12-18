import { useState, useEffect, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, Box, Button, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFileExcel } from 'react-icons/fa';
import 'jspdf-autotable';

const GraficoEstudiantesPorMunicipio = () => {
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        const savedData = localStorage.getItem('datosEstudiantes');

        if (savedData) {
            const datosEstudiantes = JSON.parse(savedData);

            const estudiantesPorMunicipio = datosEstudiantes.reduce((acc, item) => {
                let municipioOriginal = item['ASPI_MPIORESIDENCIA.1'];
                const municipio = municipioOriginal.length > 8 ? `${municipioOriginal.substring(0, 8)}...` : municipioOriginal;

                if (acc[municipio]) {
                    acc[municipio] += 1;
                } else {
                    acc[municipio] = 1;
                }
                return acc;
            }, {});

            const totalEstudiantes = datosEstudiantes.length;

            const data = Object.entries(estudiantesPorMunicipio).map(([key, value]) => ({
                municipio: key,
                porcentaje: ((value / totalEstudiantes) * 100).toFixed(2),
            }));

            setChartData(data);
        }
    }, []);

    const generarPDF = () => {
        const pdf = new jsPDF('landscape', 'pt', 'a4');

        html2canvas(chartRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.addPage();

            const tableData = chartData.map((item) => [item.municipio, item.porcentaje]);
            const columns = ['Municipio', 'Porcentaje (%)'];

            pdf.autoTable({
                head: [columns],
                body: tableData,
                startY: 10,
                theme: 'grid',
                headStyles: {
                    fillColor: "green",
                    textColor: [255, 255, 255],
                },
            });

            pdf.save('REPORTE_CLASIFICADOS_POR_MUNICIPIOS.pdf');
        });
    };

    return (
        <Card elevation={3} sx={{ margin: 2, borderRadius: 4 }}>
            <CardContent>
                <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>
                    <div
                        ref={chartRef}
                        style={{
                            height: '600px',
                            background: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            position: 'relative',
                        }}
                    >
                        {chartData.length === 0 ? (
                             <Box
                             sx={{
                               height: '600px',
                               background: 'white',
                               padding: '20px',
                               borderRadius: '10px',
                               display: 'flex',
                               alignItems: 'center', 
                               justifyContent: 'center',
                               textAlign: 'center', 
                             }}
                           >
                             <Typography variant="h6" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <FaFileExcel style={{ color: 'green', marginRight: '10px', fontSize: '40px' }} />
                               NO HAY DATOS DISPONIBLES. POR FAVOR, CARGAR EL ARCHIVO EXCEL PARA LOS DATOS.
                             </Typography>
                           </Box>
                        ) : (
                            <div style={{ height: '500px' }}>
                                <ResponsiveBar
                                    data={chartData}
                                    keys={['porcentaje']}
                                    indexBy="municipio"
                                    layout="vertical"
                                    margin={{ top: 10, right: 130, bottom: 80, left: 60 }}
                                    padding={0.3}
                                    valueScale={{ type: 'linear' }}
                                    indexScale={{ type: 'band', round: true }}
                                    colors={['#FFA500']}
                                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Porcentaje de Estudiantes (%)',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                    }}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 45,
                                        legend: 'Municipios',
                                        legendPosition: 'middle',
                                        legendOffset: 70,
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor="white"
                                    enableLabel={true}
                                    label={({ value }) => `${value}%`}
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: 'green' }}
                        onClick={generarPDF}
                        aria-label="Botón para exportar el gráfico a PDF"
                        aria-describedby="exportar-grafico-descripcion"
                        disabled={chartData.length === 0}
                    >
                        Exportar Gráfica
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GraficoEstudiantesPorMunicipio;
