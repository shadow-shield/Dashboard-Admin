import  { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Fade,
} from "@mui/material";
import { Check, ErrorOutline } from "@mui/icons-material";

const UploadJsonFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus("");
    setShowAlert(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://backpermanencia.onrender.com/api/v1/json-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

     
      localStorage.setItem("datosEstudiantes", JSON.stringify(data));

      setUploadStatus("Archivo subido exitosamente.");
      setAlertType("success");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUploadStatus(
        "Error al subir el archivo. Por favor, intenta nuevamente."
      );
      setAlertType("error");
    } finally {
      setLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <Box className="flex flex-col justify-center items-center" sx={{ gap: 2 }}>
      <Fade in={selectedFile} timeout={600}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Archivo seleccionado: {selectedFile?.name}
        </Typography>
      </Fade>

      <Button variant="contained" component="label" sx={{ width: "300px" }}>
        Seleccionar archivo
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      <Fade in={selectedFile} timeout={600}>
        <Button
          variant="contained"
          color="success"
          onClick={handleUpload}
          sx={{ width: "300px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Subir Archivo"}
        </Button>
      </Fade>

      <Fade in={showAlert} timeout={600}>
        <Alert
          icon={
            alertType === "success" ? (
              <Check fontSize="inherit" />
            ) : (
              <ErrorOutline fontSize="inherit" />
            )
          }
          severity={alertType}
          sx={{ mt: 2 }}
        >
          {uploadStatus}
        </Alert>
      </Fade>
    </Box>
  );
};

export default UploadJsonFile;
