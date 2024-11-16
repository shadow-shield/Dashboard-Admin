import { useState, useEffect, useRef } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardContent, Box, Button, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const GraficoAdmitidosPorDepartamento = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const savedData = localStorage.getItem('datosEstudiantes');

    if (savedData) {
      const datosEstudiantes = JSON.parse(savedData);

      const admitidosPorDepartamento = datosEstudiantes.reduce((acc, item) => {
        const departamento = item['ASPI_DPTORESIDENCIA.1'];
        if (acc[departamento]) {
          acc[departamento] += 1;
        } else {
          acc[departamento] = 1;
        }
        return acc;
      }, {});

      const totalAdmitidos = datosEstudiantes.length;

      const data = Object.entries(admitidosPorDepartamento).map(([key, value]) => ({
        id: key,
        label: key,
        value: ((value / totalAdmitidos) * 100).toFixed(2),
        cantidad: value,
      }));
      setChartData(data);
    }
  }, []);

  const customColors = ['#ff6b6b', '#4ecdc4', '#1a535c', '#ffe66d', '#ff9f1c'];

  const generarPDF = () => {
    const pdf = new jsPDF('landscape', 'pt', 'a4');

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.addPage();

      const tableData = chartData.map((item) => [item.id, item.value]);
      const columns = ['Departamento', 'Porcentaje (%)'];

      pdf.autoTable({
        head: [columns],
        body: tableData,
        startY: 10,
        theme: 'grid',
        headStyles: {
          fillColor: 'green',
          textColor: [255, 255, 255],
        },
      });

      pdf.save('REPORTE_CLASIFICADOS_POR_DEPARTEMENTOS-RE.pdf');
    });
  };

  return (
    <Card elevation={3} sx={{ margin: 5, borderRadius: 4, marginTop: 2.1 }}>
      <CardContent>
        <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>
          {chartData.length === 0 ? (
            <Box
            sx={{
              height: "600px",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              NO HAY DATOS DISPONIBLE. POR FAVOR, CARGAR EL ARCHIVO EXCEL PARA LOS DATOS.
            </Typography>
          </Box>
          ) : (
            <div
              ref={chartRef}
              style={{
                height: '600px',
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <ResponsivePie
                data={chartData}
                margin={{ top: 50, right: 20, bottom: 100, left: 100 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={1}
                activeOuterRadiusOffset={8}
                colors={customColors}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabel={(d) => `${d.id}: ${d.value}`}
                arcLinkLabelsSkipAngle={5}
                arcLinkLabelsTextColor="#333333"
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                arcLabel={(d) => `${d.value}%`}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 10,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          )}
          <Button
            variant="contained"
            color="success"
            onClick={generarPDF}
            sx={{ mt: 2, backgroundColor: 'green' }}
            disabled={chartData.length === 0}
          >
            Exportar Gráfica
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficoAdmitidosPorDepartamento;
