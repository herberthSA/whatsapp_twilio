import api from "../services/authService.js";
import logger from "../utils/logger.js";

export const postDatos = async (req, res) => {
  try {
    logger.info("Endpoint POST /datos recibido");
    
    // Body que envía Studio Flow o cliente
    const body = req.body;
    logger.info(`Body recibido: ${JSON.stringify(body)}`);

    // POST a la API externa con token
    const response = await api.post("https://api.example.com/protegido", body);

    logger.info(`Datos recibidos de la API: ${JSON.stringify(response.data)}`);

    // Siempre status 200
    res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (err) {
    logger.error(`Error en POST /datos: ${err.message}`);
    res.status(200).json({
      success: false,
      error: err.message
    });
  }
};
