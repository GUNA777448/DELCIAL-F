// Authentication utility functions

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (!token || !user) {
    return false;
  }
  
  try {
    // Basic token validation (you can add more sophisticated validation)
    const userData = JSON.parse(user);
    return !!(userData.email && token);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return false;
  }
};

// Get current user data
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Set authentication data
export const setAuth = (token, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
};

// Check if token is expired (basic check)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Decode JWT token (without verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Validate session on app start
export const validateSession = () => {
  const token = getAuthToken();
  const user = getCurrentUser();
  
  if (!token || !user) {
    clearAuth();
    return false;
  }
  
  if (isTokenExpired(token)) {
    console.log("Token expired, clearing session");
    clearAuth();
    return false;
  }
  
  return true;
}; 