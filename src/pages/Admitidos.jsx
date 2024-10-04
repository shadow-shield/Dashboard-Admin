import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    TextField,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Importa el ícono de búsqueda

const Admitidos = () => {
    const [admitidos, setAdmitidos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await fetch('src/data/admitidos.json');
                const data = await response.json();
                setAdmitidos(data);
            } catch (error) {
                console.error('Error al cargar los datos de estudiantes:', error);
            }
        };

        fetchEstudiantes();
    }, []);

    // Filtrar los admitidos según el término de búsqueda
    const filteredAdmitidos = admitidos.filter((item) => {
        const values = Object.values(item);
        return values.some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div>
            <TextField
                label="Buscar Información"
                variant="outlined"
                margin="normal"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px'}} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon /> 
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper} sx={{ width: '100%', margin: '20px auto', overflowX: 'auto' }}>
                {filteredAdmitidos.length === 0 ? (
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '400px',
                        }}
                    >
                        No existen admitidos...
                    </Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'rgb(66, 165, 66)' }}>
                                <TableCell sx={{ color: 'white' }}>TIPO DOCUMENTO</TableCell>
                                <TableCell sx={{ color: 'white' }}>NUM DOCUMENTO</TableCell>
                                <TableCell sx={{ color: 'white' }}>NOMBRE Y APELLIDO</TableCell>
                                <TableCell sx={{ color: 'white' }}>EMAIL</TableCell>
                                <TableCell sx={{ color: 'white' }}>SEXO</TableCell>
                                <TableCell sx={{ color: 'white' }}>ESTADO CIVIL</TableCell>
                                <TableCell sx={{ color: 'white' }}>ESTRATO SOCIOECONOMICO</TableCell>
                                <TableCell sx={{ color: 'white' }}>PROGRAMA</TableCell>
                                <TableCell sx={{ color: 'white' }}>GRUPO</TableCell>
                                <TableCell sx={{ color: 'white' }}>DEPARTAMENTO</TableCell>
                                <TableCell sx={{ color: 'white' }}>MUNICIPIO</TableCell>
                                <TableCell sx={{ color: 'white' }}>INSTITUCIÓN EDUCATIVA</TableCell>
                                <TableCell sx={{ color: 'white' }}>SNP ICFES</TableCell>
                                <TableCell sx={{ color: 'white' }}>PUNTAJE ICFES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAdmitidos.map((item, index) => (
                                <TableRow key={item.ASPI_NUMERODOCUMENTO + index}>
                                    <TableCell>{item.TIDG_ABREVIATURA}</TableCell>
                                    <TableCell>{item.ASPI_NUMERODOCUMENTO}</TableCell>
                                    <TableCell>{item['NOMBRE Y APELLIDO']}</TableCell>
                                    <TableCell>{item.ASPI_EMAIL}</TableCell>
                                    <TableCell>{item.ASPI_SEXO}</TableCell>
                                    <TableCell>{item.ESTADO_CIVIL}</TableCell>
                                    <TableCell>{item.ESTRATO}</TableCell>
                                    <TableCell>{item.PROG_NOMBRE}</TableCell>
                                    <TableCell>{item.CIRC_DESCRIPCION}</TableCell>
                                    <TableCell>{item.ASPI_DPTORESIDENCIA_1}</TableCell>
                                    <TableCell>{item.ASPI_MPIORESIDENCIA_1}</TableCell>
                                    <TableCell>{item.INST_NOMBREINSTITUCION}</TableCell>
                                    <TableCell>{item.ESSE_SNP}</TableCell>
                                    <TableCell>{item.PRXF_PUNTAJEOBTENIDO}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </div>
    );
};

export default Admitidos;
