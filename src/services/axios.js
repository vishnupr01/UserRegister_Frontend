import axios from 'axios';
const Api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust baseURL as needed
  withCredentials: true,
});
export default Api