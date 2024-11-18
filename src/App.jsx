// src/App.jsx

import { useState } from "react"; // Importar useState
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";

import logo from "./assets/logo.jpg";


/* import GraficaPuntaje from "./components/GraficaPuntaje.jsx"; */
import Dashboard from "./pages/Dashboard.jsx";
import AdmitidosSexo from "./pages/AdmitidosSexo.jsx";
import AdmitidosPorTipo from "./pages/AdmitidosPorTipo.jsx";
/* import AdmitidosInst from "./pages/AdmitidosInstuticiones.jsx"; */
import AdmitidosGeneral from "./pages/AdmitidosGeneral.jsx";
import AdmitidosEstadoCivil from "./pages/AdmitidosEstadoCivil.jsx";
import AdmitidosDepartamentos from "./pages/AdmitidosDepartamentos.jsx";
import AdmitidosMunicipio from "./pages/AdmitidosMunicipio.jsx";
import ReportEstratos from "./pages/AdmitidosEstratos.jsx";

import Configuracion from "./components/configuracion.jsx";
import "./index.css";

const App = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  if (!sessionStorage.getItem('datosBorrados')) {
    localStorage.removeItem('datosEstudiantes');

    sessionStorage.setItem('datosBorrados', 'true');
  }

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            backgroundColor: "#4caf50",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="transition-transform duration-300 transform hover:scale-105"
        >
          <List>
            <ListItemButton
              component={Link}
              to="/dashboard"
              className={`hover:bg-green-600 transition duration-200 ${activeItem === "dashboard" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => handleItemClick("dashboard")}
            >
              <ListItemIcon sx={{ color: activeItem === "dashboard" ? "green.600" : "white" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio " />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/AdmitidosGeneral"
              className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidosGeneral" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => handleItemClick("AdmitidosGeneral")}
            >
              <ListItemIcon sx={{ color: activeItem === "AdmitidosGeneral" ? "green.600" : "white" }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Informacion Admitidos" />
            </ListItemButton>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/AdmitidosSexo"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidosSexo" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("AdmitidosSexo")}
              >
                <ListItemIcon sx={{ color: activeItem === "AdmitidosSexo" ? "green.600" : "white" }}>
                  <StackedBarChartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificados Por Sexo" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/AdmitidosPorTipo"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidosPorTipo" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("AdmitidosPorTipo")}
              >
                <ListItemIcon sx={{ color: activeItem === "AdmitidosPorTipo" ? "green.600" : "white" }}>
                  <AlignHorizontalLeftIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificados Por Tipo de admision" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/AdmitidosPorEstado"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidosPorEstado" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("AdmitidosPorEstado")}
              >
                <ListItemIcon sx={{ color: activeItem === "AdmitidosPorEstado" ? "green.600" : "white" }}>
                  <AlignHorizontalLeftIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificados Por Estado Civil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/AdmitidosPorDepar"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidosPorDepar" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("AdmitidosPorDepar")}
              >
                <ListItemIcon sx={{ color: activeItem === "AdmitidosPorDepar" ? "green.600" : "white" }}>
                  <DataSaverOffIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificacion Por Departamento" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/AdmitidoMuni"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "AdmitidoMuni" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("AdmitidoMuni")}
              >
                <ListItemIcon sx={{ color: activeItem === "AdmitidoMuni" ? "green.600" : "white" }}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificacion Municipio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Estratos"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "Estratos" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("Estratos")}
              >
                <ListItemIcon sx={{ color: activeItem === "Estratos" ? "green.600" : "white" }}>
                  <FamilyRestroomIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificados Estratos" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/configuracion"
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "configuracion" ? "bg-white text-green-600" : "text-white"}`}
                onClick={() => handleItemClick("configuracion")}
              >
                <ListItemIcon sx={{ color: activeItem === "configuracion" ? "green.600" : "white" }}>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Cargar Archivo" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (window.confirm("¿Seguro que deseas desconectarte?")) {
                    
                    if (window.close) {
                      window.close();
                    } else {
                      window.close();
                      
                    }
                  }
                  window.close();
                }
                
              }
                className={`hover:bg-green-600 transition duration-200 ${activeItem === "desconectar" ? "bg-white text-green-600" : "text-white"}`}
              >
                <ListItemIcon sx={{ color: activeItem === "desconectar" ? "green.600" : "white" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Desconectar" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Área de visualización */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 6,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "auto",
            backgroundColor: "white",
            color: "green",
          }}
        >
          <img
            src={logo}
            alt="Logo de la Universidad"
            className="absolute top-5 right-5 w-24 transition-transform duration-300 hover:scale-110" // Efecto de escala al pasar el ratón
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Estratos" element={<ReportEstratos />} />
            {/* <Route path="/Graficas" element={<GraficaPuntaje />} /> */}
            {/* <Route path="/GraficaInst" element={<AdmitidosInst />} /> */}
            <Route path="/AdmitidosGeneral" element={<AdmitidosGeneral />} />
            <Route path="/AdmitidosSexo" element={<AdmitidosSexo />} />
            <Route path="/AdmitidosPorTipo" element={<AdmitidosPorTipo />} />
            <Route path="/AdmitidosPorEstado" element={<AdmitidosEstadoCivil />} />
            <Route path="/AdmitidosPorDepar" element={<AdmitidosDepartamentos />} />
            <Route path="/AdmitidoMuni" element={<AdmitidosMunicipio />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
