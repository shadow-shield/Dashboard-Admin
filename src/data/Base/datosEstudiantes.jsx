import React, { useState } from "react";
import axios from "axios";

const UploadJsonFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(() => {
    // Intentar cargar los datos del localStorage al iniciar
    const savedData = localStorage.getItem("fileData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    // Si los datos ya están almacenados en el localStorage, no hacer otra petición
    if (fileData) {
      console.log("Using cached data from localStorage:", fileData);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

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
      setFileData(data); // Guardar los datos en el estado
      localStorage.setItem("fileData", JSON.stringify(data)); // Guardar los datos en el localStorage
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default UploadJsonFile;
