import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', async (req, res) => {
  console.log(req.body)
  try {
    if (req.body.Latitude && req.body.Longitude) {
      console.log('Latitud:', req.body.Latitude);
      console.log('Longitud:', req.body.Longitude);
      const googleMapsUrl = `https://www.google.com/maps?q=${req.body.Latitude},${req.body.Longitude}`;
      console.log('Abrir mapa en:', googleMapsUrl);
    }
    console.log(req.body.Body)


  } catch (error) {
    console.error('Error al obtener ubicación:', error);
  }
});

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
