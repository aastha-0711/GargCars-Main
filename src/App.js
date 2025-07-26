import "./App.css";
import "antd/dist/antd.css"; // Keep this for Ant Design styling
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

// Import your page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import UserBooking from "./pages/UserBooking";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes (accessible without login) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (require JWT authentication) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          {/* Note: /booking also points to Home. This route might be redundant if / just shows all cars.
             If '/booking' should be specifically for booking *process initiation* for ANY car,
             and requires login, then keep it protected.
          */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Home />{" "}
                {/* Or whatever component should be shown at /booking */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <BookingCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userbookings"
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userbookings/:id"
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcar"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editcar/:carid"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Modified ProtectedRoute function
export function ProtectedRoute({ children }) {
  // Check for the presence of the JWT (authToken) in localStorage
  const authToken = localStorage.getItem("authToken");

  // If authToken exists, render the child components (the protected page)
  // Otherwise, navigate the user to the /login page
  return authToken ? children : <Navigate to="/login" />;
}
