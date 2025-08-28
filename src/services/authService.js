import axios from "axios";
import logger from "../utils/logger.js";
let accessToken = null;

const getNewToken = async () => {
  try {
    logger.info("Solicitando nuevo token...");
    const  data = await axios.post("http://129.146.39.118:443/api-token-auth/", {
      username: process.env.USER,
      password: process.env.PASSWORD,
    },{ headers: { "Content-Type": "application/json"}});

    
    accessToken = data.data.token;
    
    logger.info(`Nuevo token generado: ${accessToken}`);
    return accessToken;
  } catch (error) {
    logger.error(`Error al obtener token: ${error.response?.data || error.message}`);
    throw new Error("No se pudo obtener token");
  }
};

const getValidToken = async () => {
  if (accessToken) {
    logger.info(`Usando token existente: ${accessToken}`);
    return accessToken;
  }
  return await getNewToken();
};

const api = axios.create({
  headers: { "Content-Type": "application/json" }
});

// Interceptor request → agrega token
api.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  config.headers.Authorization = `Token ${token}`;
  logger.info(`Haciendo request a ${config.url} con token: ${token}`);
  return config;
});

// Interceptor response → reintenta si 401
api.interceptors.response.use(
  (response) => {
    logger.info(`Response recibida de ${response.config.url} (status ${response.status})`);
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      logger.warn("Token inválido, solicitando uno nuevo...");
      const newToken = await getNewToken();
      error.config.headers.Authorization = `Token ${newToken}`;
      logger.info("Reintentando request con nuevo token...");
      return api.request(error.config);
    }
    logger.error(`Error en response: ${error.message}`);
    return Promise.reject(error);
  }
);

export default api;
