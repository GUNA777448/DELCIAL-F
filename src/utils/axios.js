import axios from "axios";

const instance = axios.create({
  baseURL: "https://delicial-b-01fq.onrender.com/api", // deployed backend URL
 // baseURL: "http://localhost:3000/api", // deployed backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging and adding auth token
instance.interceptors.request.use(
  (config) => {
    // Add auth token to all requests
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging and handling auth errors
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.log("Session expired, clearing local storage");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
