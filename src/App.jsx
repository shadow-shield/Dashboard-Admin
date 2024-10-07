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
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

import logo from "./assets/logo.jpg";

// Importar los componentes de cada vista
import GraficaPuntaje from "./components/Grafica_Puntaje.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reportes from "./pages/Reportes.jsx";
import GraficaInst from "./components/Grafica_Instituciones.jsx";
import AdmitidosSexo from "./pages/AdmitidosSexo.jsx"; // Importar el nuevo componente AdmitidosSexo

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
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemIcon sx={{ color: "white" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
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
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Graficas">
                <ListItemIcon sx={{ color: "white" }}>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Graficas Puntajes" />
              </ListItemButton>
            </ListItem>
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
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Admitidos Sexo" />
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Reportes" element={<Reportes />} />
            <Route path="/Graficas" element={<GraficaPuntaje />} />
            <Route path="/GraficaInst" element={<GraficaInst />} />
            <Route path="/AdmitidosSexo" element={<AdmitidosSexo />} />{" "}
            {/* Nueva ruta para AdmitidosSexo */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
