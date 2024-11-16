import { useState, useEffect, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFileExcel } from 'react-icons/fa';
import "jspdf-autotable";

const GraficaAdmitidos = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem("datosEstudiantes");

    if (savedData) {
      const datosEstudiantes = JSON.parse(savedData);

      const tipoAdmisionCounts = datosEstudiantes.reduce((acc, estudiante) => {
        const tipoAdmision = estudiante.CIRC_DESCRIPCION;
        acc[tipoAdmision] = (acc[tipoAdmision] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(tipoAdmisionCounts).map(
        ([tipoAdmision, cantidad]) => ({
          tipoAdmision: tipoAdmision,
          cantidad: cantidad,
        })
      );

      setChartData(formattedData);
    }
  }, []);

  const handleExportPDF = () => {
    const input = chartRef.current;
    const pdf = new jsPDF("landscape");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.addPage();

      const tableData = chartData.map((item) => [item.tipoAdmision, item.cantidad]);
      const columns = ["Tipo de Admisión", "Cantidad"];

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

      pdf.save("Reporte_Clasificados_PorTipos.pdf");
    });
  };

  return (
    <Card elevation={3} sx={{ margin: "40px 40px 30px", borderRadius: 4, marginTop: "15px", marginBottom: "85px" }}>
      <CardContent>
        <div
          ref={chartRef}
          style={{
            height: "636px",
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
            <ResponsiveBar
              data={chartData}
              keys={["cantidad"]}
              indexBy="tipoAdmision"
              layout="horizontal"
              margin={{ top: 50, right: 130, bottom: 50, left: 240 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors="#FFD700"
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Cantidad de Admitidos",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleExportPDF}
            sx={{ mt: 2, backgroundColor: "green" }}
            disabled={chartData.length === 0}
          >
            Exportar Gráfica
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficaAdmitidos;
