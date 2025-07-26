import axios from "axios"; // Ensure axios is imported
import { message } from "antd"; // Ensure message is imported from antd

// No need to import getAuthHeaders or handleAuthError here,
// as login/register endpoints are typically public and don't require
// sending an auth token to themselves. Error handling is specific to these actions.

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Dispatch action to show loading spinner

  try {
    // Use the absolute URL for your backend login endpoint
    const response = await axios.post(
      "http://localhost:8000/api/users/login", // Correct absolute URL
      reqObj // reqObj will contain { email, password }
    );

    // Backend's successful response.data should look like:
    // { message: "Login successful", token: "...", user: { _id, username, email, admin, phone } }
    const { token, user } = response.data; // Correctly destructure token and user from response.data

    // Store the JWT (authToken) and user data in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store the user object as received

    message.success(response.data.message || "Login successful!"); // Show success message

    dispatch({ type: "LOADING", payload: false }); // Hide loading spinner

    // Redirect to the home page after a short delay for message visibility
    setTimeout(() => {
      window.location.href = "/"; // Use window.location.href for a full page reload
      // This ensures App.js's ProtectedRoute re-evaluates
      // and all components correctly pick up the new auth state.
    }, 500);
  } catch (error) {
    // Log the full error for debugging on the client-side console
    console.error("Login API Error:", error);

    // Display an Ant Design error message to the user
    // Access error.response.data.message if the backend sends structured errors
    message.error(
      error.response?.data?.message ||
        "Invalid credentials or network error. Please try again."
    );

    dispatch({ type: "LOADING", payload: false }); // Hide loading spinner
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Show loading spinner

  try {
    // Use the absolute URL for your backend registration endpoint
    const response = await axios.post(
      "http://localhost:8000/api/users/register", // Correct absolute URL
      reqObj // reqObj will contain { username, email, password, phone }
    );

    message.success(
      response.data.message || "Registration successful! Please login."
    ); // Show success message

    dispatch({ type: "LOADING", payload: false }); // Hide loading spinner

    // Redirect to the login page after successful registration
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to login page
    }, 500);
  } catch (error) {
    // Log the full error for debugging
    console.error("Register API Error:", error);

    // Display an Ant Design error message
    message.error(
      error.response?.data?.message ||
        "Registration failed. User might already exist or network error."
    );

    dispatch({ type: "LOADING", payload: false }); // Hide loading spinner
  }
};
