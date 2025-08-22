import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/api', async (req, res) => {
  console.log(req.body)
  try {
    if (req.body.latitud && req.body.longitud) {
      
      console.log(req.body);
      // Aquí puedes procesar la ubicación recibida
      const googleMapsUrl = `https://www.google.com/maps?q=${req.body.latitud},${req.body.longitud}`;
      console.log('Ubicación:', googleMapsUrl);
      return res.sendStatus(200);
      
    }
    

  } catch (error) {
    console.error('Error al obtener ubicación:', error);
    return res.status(500).send('Error interno del servidor');
  }
});

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
