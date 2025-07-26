import { message } from "antd"; // Import Ant Design message for notifications

// Helper function to get headers with JWT
export function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  // If no token, return Content-Type, but without Authorization header
  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Standard Bearer token format
  };
}

// Helper function to handle common authentication errors (401/403)
export function handleAuthError(error) {
  // Changed 'response' to 'error' to match axios error structure
  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  ) {
    message.error("Session expired or unauthorized. Please log in again.");
    // Clear any stored authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Redirect to login page. Use window.location.href for a full refresh
    // which ensures all app state is reset and ProtectedRoute re-evaluates.
    window.location.href = "/login";
    return true; // Indicate that an auth error was handled and redirection occurred
  }
  return false; // Indicate no auth error, continue processing response
}
