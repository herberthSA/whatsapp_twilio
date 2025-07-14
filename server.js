// server.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
  const mensaje = req.body.Body;
  const de = req.body.From;

  console.log(`Mensaje recibido de ${de}: ${mensaje}`);

  res.send('<Response></Response>'); // responde vacío
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
