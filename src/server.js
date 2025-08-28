import express from 'express';
import apiRoutes from './routes/apiRoutes.js';
import logger from './utils/logger.js'; 

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);
app.post('/v1', async (req, res) => {
  console.log(req.body)
  try {
    if (req.body.latitud && req.body.longitud) {
      
      logger.info(req.body);
      // Aquí puedes procesar la ubicación recibida
      const googleMapsUrl = `https://www.google.com/maps?q=${req.body.latitud},${req.body.longitud}`;
      console.log('Ubicación:', googleMapsUrl);
      return res.sendStatus(200);
      
    }
  } catch (error) {
    console.error('Error al obtener ubicación:', error);
    logger.error('Error al obtener ubicación:', error);
    return res.status(500).send('Error interno del servidor');
  }
});
app.listen(port, () => {
  logger.info(`Servidor escuchando en ${port}`);

});
