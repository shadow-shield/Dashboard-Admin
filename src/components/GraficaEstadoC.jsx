import { useState, useEffect, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import jsPDF from "jspdf";
import { FaFileExcel } from 'react-icons/fa';
import html2canvas from "html2canvas";
import "jspdf-autotable";

const GraficaEstadoC = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const savedData = localStorage.getItem("datosEstudiantes");

    if (savedData) {
      const datosEstudiantes = JSON.parse(savedData);

      const estadoCounts = datosEstudiantes.reduce((acc, estudiante) => {
        const estadoC = estudiante.ESTADO_CIVIL;
        acc[estadoC] = (acc[estadoC] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(estadoCounts).map(
        ([estadoC, cantidad]) => ({
          EstadoCivil: estadoC,
          Cantidad: cantidad,
        })
      );

      setChartData(formattedData);
    }
  }, []);

  const generarPDF = () => {
    const pdf = new jsPDF("landscape", "pt", "a4");

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.addPage();

      const tableData = chartData.map((item) => [item.EstadoCivil, item.Cantidad]);
      const columns = ["Estado Civil", "Cantidad"];

      pdf.autoTable({
        head: [columns],
        body: tableData,
        startY: 10,
        theme: "grid",
        headStyles: {
          fillColor: "green",
          textColor: [255, 255, 255],
        },
      });

      pdf.save("REPORTE_CLASIFICADO_ESTADOCIVIL.pdf");
    });
  };

  return (
    <Card elevation={3} sx={{ margin: 2, borderRadius: 4 }}>
      <CardContent>
        <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
          <div
            ref={chartRef}
            style={{
              height: "600px",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              position: "relative",
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
              <div style={{ height: "500px" }}>
                <ResponsiveBar
                  data={chartData}
                  keys={["Cantidad"]}
                  indexBy="EstadoCivil"
                  layout="vertical"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.7}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={({ data }) => {
                    const colorMap = {
                      Soltero: "#4caf50",
                      Casado: "#ff9800",
                      Viudo: "#f44336",
                      Otro: "#2196f3",
                    };
                    return colorMap[data.EstadoCivil] || "#9c27b0";
                  }}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Cantidad de Admitidos",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Estado Civil",
                    legendPosition: "middle",
                    legendOffset: 40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor="white"
                  enableLabel={true}
                  label={({ value }) => `${value}`}
                />
              </div>
            )}
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={generarPDF}
            sx={{ mt: 2, backgroundColor: "green" }}
            disabled={chartData.length === 0}
          >
            Exportar Gráfica
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficaEstadoC;
