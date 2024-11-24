import axios from 'axios';


const API_URL = 'http://localhost:8080/api/usuarios';


export const loginUsuario = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};


export const registrarUsuario = async (registroData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, registroData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
