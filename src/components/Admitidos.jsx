import { Box, TextField, InputAdornment } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Admitidos = () => {
    const [admitidos, setAdmitidos] = useState([]);  
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
     
        const savedData = localStorage.getItem("datosEstudiantes");
        
        if (savedData) {
            
            setAdmitidos(JSON.parse(savedData));
        }
    }, []);  

    const filteredAdmitidos = admitidos.filter((item) => {
        return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const columns = [
        {
            field: 'TIDG_ABREVIATURA',
            headerName: 'TIPO DOCUMENTO',
            width: 150,
            filterable: true,
            type: 'singleSelect',
            valueOptions: ['CC', 'TI', 'PPT'],
        },
        { field: 'ASPI_NUMERODOCUMENTO', headerName: 'NUM DOCUMENTO', width: 180 },
        { field: 'NOMBRE_Y_APELLIDO', headerName: 'NOMBRE Y APELLIDO', width: 200 },
        { field: 'ASPI_EMAIL', headerName: 'EMAIL', width: 250 },
        { field: 'ASPI_SEXO', headerName: 'SEXO', width: 100 },
        { field: 'ESTADO_CIVIL', headerName: 'ESTADO CIVIL', width: 150 },
        { field: 'ESTRATO', headerName: 'ESTRATO SOCIOECONOMICO', width: 180 },
        { field: 'PROG_NOMBRE', headerName: 'PROGRAMA', width: 200 },
        { field: 'CIRC_DESCRIPCION', headerName: 'GRUPO', width: 150 },
        { field: 'ASPI_DPTORESIDENCIA_1', headerName: 'DEPARTAMENTO', width: 200 },
        { field: 'ASPI_MPIORESIDENCIA_1', headerName: 'MUNICIPIO', width: 200 },
        { field: 'INST_NOMBREINSTITUCION', headerName: 'INSTITUCIÓN EDUCATIVA', width: 250 },
        { field: 'ESSE_SNP', headerName: 'SNP ICFES', width: 180 },
        { field: 'PRXF_PUNTAJEOBTENIDO', headerName: 'PUNTAJE ICFES', width: 150 },
    ];

    const rows = filteredAdmitidos.map((item, index) => ({
        id: index,
        TIDG_ABREVIATURA: item.TIDG_ABREVIATURA,
        ASPI_NUMERODOCUMENTO: item.ASPI_NUMERODOCUMENTO,
        NOMBRE_Y_APELLIDO: item['NOMBRE Y APELLIDO'],
        ASPI_EMAIL: item.ASPI_EMAIL,
        ASPI_SEXO: item.ASPI_SEXO,
        ESTADO_CIVIL: item.ESTADO_CIVIL,
        ESTRATO: item.ESTRATO,
        PROG_NOMBRE: item.PROG_NOMBRE,
        CIRC_DESCRIPCION: item.CIRC_DESCRIPCION,
        ASPI_DPTORESIDENCIA_1: item.ASPI_DPTORESIDENCIA_1,
        ASPI_MPIORESIDENCIA_1: item.ASPI_MPIORESIDENCIA_1,
        INST_NOMBREINSTITUCION: item.INST_NOMBREINSTITUCION,
        ESSE_SNP: item.ESSE_SNP,
        PRXF_PUNTAJEOBTENIDO: item.PRXF_PUNTAJEOBTENIDO,
    }));

    return (
        <Box m="20px">
            <Box mb={2}>
                <TextField
                    label="Buscar Información"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DataGrid
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                pagination
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                sx={{
                    bgcolor: 'green',
                    '& .MuiDataGrid-columnHeader': {
                        bgcolor: 'green',
                        color: 'white',
                    },
                    '& .MuiDataGrid-cell': {
                        bgcolor: '#dff0d8',
                        color: 'black',
                    },
                    '& .MuiDataGrid-cell:hover': {
                        bgcolor: '#c3e6cb',
                        color: 'white',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'white',
                    },
                }}
            />
        </Box>
    );
};

export default Admitidos;
