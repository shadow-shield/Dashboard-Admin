import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const datosAdmitidos = [
  { sexo: "F", cantidad: 18 },
  { sexo: "M", cantidad: 126 },
];

const GraficaSexo = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Formatear los datos para el gráfico
    setChartData(
      datosAdmitidos.map((item) => ({
        Sexo: item.sexo, // Eje Y
        Cantidad: item.cantidad, // Eje X
      }))
    );
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveBar
        data={chartData}
        keys={["Cantidad"]}
        indexBy="Sexo"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(datum) => (datum.indexValue === "M" ? "#36a2eb" : "#ff6384")} // Colores personalizados para cada sexo
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
    </div>
  );
};

export default GraficaSexo;
