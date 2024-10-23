import { useState, useEffect, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { datosEstudiantes } from '../data/datosEstudiantes';
import { Card, CardContent, Box, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GraficoEstudiantesPorMunicipio = () => {
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        const estudiantesPorMunicipio = datosEstudiantes.reduce((acc, item) => {
            let municipioOriginal = item['ASPI_MPIORESIDENCIA_1'];
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
    }, []);

    const generarPDF = () => {
        const pdf = new jsPDF('landscape', 'pt', 'a4');

        html2canvas(chartRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.addPage();

            // Generar la tabla de datos
            const tableData = chartData.map(item => [item.municipio, item.porcentaje]);
            const columns = ['Municipio', 'Porcentaje (%)'];

            pdf.autoTable({
                head: [columns],
                body: tableData,
                startY: 10,
                theme: 'grid',
                headStyles: {
                    fillColor: "green",
                    textColor: [255, 255, 255],
                }
            });

            pdf.save('grafica-municipios.pdf');
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
                        }}
                    >
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
                                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                enableLabel={true}
                                label={({ value }) => `${value}%`}
                            />
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        sx={{ mt: 1, backgroundColor: '#4caf50' }}
                        onClick={generarPDF}
                    >
                        Generar Gráfica
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GraficoEstudiantesPorMunicipio;
