
import { Box, Typography } from '@mui/material';


// eslint-disable-next-line react/prop-types
const CuadroContenido = ({ valor }) => {
  return (
    <Box 
      sx={{ 
        flex: 1, 
        height: '150px', 
        backgroundColor: '#dcdcdc', 
        borderRadius: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Typography variant="h4" color="textPrimary">
        {valor}%
      </Typography>
    </Box>
  );
};

export default CuadroContenido;
