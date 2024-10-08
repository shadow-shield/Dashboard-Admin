import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { motion } from "framer-motion";
import { datosEstudiantes } from '../data/datosEstudiantes'; // Asegúrate de que la ruta sea correcta

const GraficaSexo = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const sexoCounts = datosEstudiantes.reduce((acc, estudiante) => {
      const sexo = estudiante.ASPI_SEXO; 
      acc[sexo] = (acc[sexo] || 0) + 1; 
      return acc;
    }, {});

    
    const formattedData = Object.entries(sexoCounts).map(([sexo, cantidad]) => ({
      Sexo: sexo,
      Cantidad: cantidad,
    }));

    setChartData(formattedData);
  }, []);

  return (
    <motion.div
      style={{ height: "500px", background: "#f9f9f9", padding: "20px", borderRadius: "10px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <ResponsiveBar
        data={chartData}
        keys={["Cantidad"]}
        indexBy="Sexo"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(datum) => (datum.indexValue === "M" ? "#36a2eb" : "#800080")}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Cantidad de Admitidos",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Sexo",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        label={(d) => `${d.value}`}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: "10px",
              color,
              background: "#fff",
              border: `1px solid ${color}`,
            }}
          >
            <strong>{id}:</strong> {value}
          </div>
        )}
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
        motionStiffness={80}
        motionDamping={13}
        isInteractive={true}
        enableLabel={true}
      />
    </motion.div>
  );
};

export default GraficaSexo;
