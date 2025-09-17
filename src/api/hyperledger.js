import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace this with your actual Hyperledger backend API endpoint
const API_URL = 'http://192.168.1.10:3000/api'; // Example local network URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// --- AUTHENTICATION APIS ---

/**
 * Logs in a user.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - { success, token, user }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('API Error: loginUser', error.response?.data || error.message);
    throw error.response?.data || new Error('Login failed');
  }
};

/**
 * Registers a new user.
 * @param {object} userData - User registration data (name, email, password, role, etc.)
 * @returns {Promise<object>}
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('API Error: registerUser', error.response?.data || error.message);
    throw error.response?.data || new Error('Registration failed');
  }
};


// --- PRODUCE & BATCH APIS ---

/**
 * Creates a new produce batch on the blockchain.
 * @param {object} batchData - { cropName, quantity, harvestDate, price }
 * @returns {Promise<object>}
 */
export const createProduceBatch = async (batchData) => {
    try {
        const response = await api.post('/produce', batchData);
        return response.data; // e.g., { success: true, batchId: '...' }
    } catch (error) {
        console.error('API Error: createProduceBatch', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to create batch');
    }
};

/**
 * Fetches the complete history of a specific batch.
 * @param {string} batchId - The ID of the batch to fetch.
 * @returns {Promise<Array<object>>} - An array of transaction history items.
 */
export const getBatchHistory = async (batchId) => {
    try {
        const response = await api.get(`/produce/${batchId}`);
        return response.data;
    } catch (error) {
        console.error('API Error: getBatchHistory', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to fetch batch history');
    }
};

/**
 * Updates the state of a batch (e.g., Aggregator receives, Transporter ships).
 * @param {string} batchId - The ID of the batch to update.
 * @param {object} updateData - { status, location, quality, etc. }
 * @returns {Promise<object>}
 */
export const updateBatchStatus = async (batchId, updateData) => {
    try {
        const response = await api.put(`/produce/${batchId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('API Error: updateBatchStatus', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to update batch');
    }
};