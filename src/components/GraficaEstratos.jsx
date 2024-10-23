import { useState, useEffect, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, Box, Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import PropTypes from 'prop-types'; 

const GraficaEstratos = ({ datos, indexBy, title, valueKey, isPercentage = true }) => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    if (typeof indexBy !== 'string') {
      console.error('indexBy no es una cadena:', indexBy);
      return; 
    }

    const processedData = datos.reduce((acc, item) => {
      const key = item[indexBy].length > 8 ? `${item[indexBy].substring(0, 8)}...` : item[indexBy];

      if (acc[key]) {
        acc[key] += 1;
      } else {
        acc[key] = 1;
      }
      return acc;
    }, {});

    const total = datos.length;

    const data = Object.entries(processedData).map(([key, value]) => ({
      [indexBy]: key,
      [valueKey]: isPercentage ? ((value / total) * 100).toFixed(2) : value,
    }));

    setChartData(data);
  }, [datos, indexBy, valueKey, isPercentage]);

  const generarPDF = () => {
    const pdf = new jsPDF('landscape', 'pt', 'a4');

    html2canvas(chartRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.addPage();

      const tableData = chartData.map(item => [item[indexBy], item[valueKey]]);
      const columns = [indexBy, isPercentage ? 'Porcentaje (%)' : 'Cantidad'];

      pdf.autoTable({
        head: [columns],
        body: tableData,
        startY: 10,
        theme: 'grid',headStyles: {
            fillColor: "green", 
            textColor: [255, 255, 255], 
          }
      });

      pdf.save(`${title}.pdf`);
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
                keys={[valueKey]}
                indexBy={indexBy}
                layout="vertical"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.7}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={["#C44527"]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: isPercentage ? 'Porcentaje (%)' : 'Cantidad',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: indexBy.charAt(0).toUpperCase() + indexBy.slice(1),
                  legendPosition: 'middle',
                  legendOffset: 40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                enableLabel={true}
                label={({ value }) => `${value}${isPercentage ? '%' : ''}`}
              />
            </div>
          </div>
          <Button variant="contained" color="success" onClick={generarPDF} sx={{ mt: 2 }}>
            Exportar Gráfica
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

//NO se confundan con esto es por por props
GraficaEstratos.propTypes = {
  datos: PropTypes.arrayOf(PropTypes.object).isRequired,
  indexBy: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired, 
  isPercentage: PropTypes.bool,
};

export default GraficaEstratos;
