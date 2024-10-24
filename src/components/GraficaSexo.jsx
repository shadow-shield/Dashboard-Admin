import { useState, useEffect, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, CardContent, Box, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

const GraficaSexo = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const savedData = localStorage.getItem("fileResponse");

    if (savedData) {
      const datosEstudiantes = JSON.parse(savedData);

      const sexoCounts = datosEstudiantes.reduce((acc, estudiante) => {
        const sexo = estudiante.ASPI_SEXO;
        acc[sexo] = (acc[sexo] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(sexoCounts).map(
        ([sexo, cantidad]) => ({
          Sexo: sexo,
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

      const tableData = chartData.map((item) => [item.Sexo, item.Cantidad]);
      const columns = ["Sexo", "Cantidad"];

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

      pdf.save("Reporte_Grafica_Sexo.pdf");
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
            }}
          >
            <div style={{ height: "500px" }}>
              <ResponsiveBar
                data={chartData}
                keys={["Cantidad"]}
                indexBy="Sexo"
                layout="vertical"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.7}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                // Personalizar los colores según el valor de "Sexo"
                colors={({ data }) =>
                  data.Sexo === "F" ? "#800080" : "#36a2eb"
                }
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
                  legend: "Sexo",
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
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={generarPDF}
            sx={{ mt: 2 }}
          >
            Exportar Gráfica
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficaSexo;
