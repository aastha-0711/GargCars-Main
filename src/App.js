import "./App.css";
import "antd/dist/antd.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Home />
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

export function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("user");
  return auth ? children : <Navigate to="/login" />;
}
