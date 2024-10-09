// src/App.jsx

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

import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
/* import BarChartIcon from "@mui/icons-material/BarChart"; */
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';

import logo from "./assets/logo.jpg";

// Importar los componentes de cada vista
import GraficaPuntaje from "./components/GraficaPuntaje.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reportes from "./components/Reportes.jsx";


import AdmitidosSexo from "./pages/AdmitidosSexo.jsx";
import AdmitidosPorTipo from "./pages/AdmitidosPorTipo.jsx";
import AdmitidosInst from "./pages/AdmitidosInstuticiones.jsx";
import AdmitidosGeneral from "./pages/AdmitidosGeneral.jsx";
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import AdmitidosEstadoCivil from "./pages/AdmitidosEstadoCivil.jsx";
import AlignVerticalBottomTwoToneIcon from '@mui/icons-material/AlignVerticalBottomTwoTone';
import AdmitidosDepartamentos from "./pages/AdmitidosDepartamentos.jsx";
import AdmitidosMunicipio from "./pages/AdmitidosMunicipio.jsx";


const App = () => {
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
        >
          <List>
          <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon sx={{ color: "white" }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to="/AdmitidosGeneral">
              <ListItemIcon sx={{ color: "white" }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Admitidos" />
            </ListItemButton>
            {/* <ListItem disablePadding>
              <ListItemButton component={Link} to="/Graficas">
                <ListItemIcon sx={{ color: "white" }}>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Graficas Puntajes" />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/GraficaInst">
                <ListItemIcon sx={{ color: "white" }}>
                  <DonutLargeIcon />
                </ListItemIcon>
                <ListItemText primary="Grafica Instituciones" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/AdmitidosSexo">
                <ListItemIcon sx={{ color: "white" }}>
                  <StackedBarChartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Sexo" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/AdmitidosPorTipo">
                <ListItemIcon sx={{ color: "white" }}>
                  <AlignHorizontalLeftIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Tipo de admision" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/AdmitidosPorEstado">
                <ListItemIcon sx={{ color: "white" }}>
                  <AlignVerticalBottomTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Por Estado Civil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/AdmitidosPorDepar">
                <ListItemIcon sx={{ color: "white" }}>
                  <DataSaverOffIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Clasificacion Departamento" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/AdmitidoMuni">
                <ListItemIcon sx={{ color: "white" }}>
                  <DataSaverOffIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Clasificacion Municipio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Reportes">
                <ListItemIcon sx={{ color: "white" }}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Reportes" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/configuracion">
                <ListItemIcon sx={{ color: "white" }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuración" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/desconectar">
                <ListItemIcon sx={{ color: "white" }}>
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
          }}
        >
          <img
            src={logo}
            alt="Logo de la Universidad"
            style={{ position: "absolute", top: 20, right: 20, width: "100px" }}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Reportes" element={<Reportes />} />
            <Route path="/Graficas" element={<GraficaPuntaje />} />
            <Route path="/GraficaInst" element={<AdmitidosInst />} /> {/* Corregido aquí */}
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
