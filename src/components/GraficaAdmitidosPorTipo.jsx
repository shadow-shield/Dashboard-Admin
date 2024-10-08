// GraficosAdmitidos.js
import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { datosEstudiantes } from "../data/datosEstudiantes";

const GraficaAdmitidos = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Agrupar los estudiantes por tipo de admisión
    const data = datosEstudiantes.reduce((acc, estudiante) => {
      const tipoAdmision = estudiante.CIRC_DESCRIPCION;
      const found = acc.find(item => item.tipoAdmision === tipoAdmision);
      if (found) {
        found.cantidad += 1;
      } else {
        acc.push({ tipoAdmision: tipoAdmision, cantidad: 1 });
      }
      return acc;
    }, []);

    setChartData(data);
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveBar
        data={chartData}
        keys={["cantidad"]}
        indexBy="tipoAdmision"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 240 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors="#f4a261" // Color personalizado para las barras
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
          legend: "Tipo de Admisión",
          legendPosition: "middle",
          legendOffset: -10,
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

export default GraficaAdmitidos;
