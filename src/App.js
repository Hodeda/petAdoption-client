import "./App.css";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav/NavBar";
import Homepage from "./components/Homepage/Homepage";
import ProfilePage from "./components/Profile/ProfilePage";
import AboutUs from "./components/Nav/AboutUs";
import SearchPage from "./components/Search/SearchPage";
import PetDetailsPage from "./components/Pets/PetDetailsPage";
import AnimationPage from "./components/AnimationPage";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";
import { UserContextInstance } from "./context/UserContext";
import AdminPage from "./components/Admin/AdminPage";
import PetEditForm from "./components/Admin/PetEditForm";
import AdminPrivateRoute from "./AdminPrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  const { token } = useContext(UserContextInstance);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/pets/:id"
          element={
            <AnimationPage>
              <PetDetailsPage />
            </AnimationPage>
          }
        />
        <Route
          path="/pets/:id/edit"
          element={
            <AnimationPage>
              <PetEditForm />
            </AnimationPage>
          }
        />
        <Route
          path="/admin"
          element={
            <AnimationPage>
              <AdminPrivateRoute>
                <AdminPage />
              </AdminPrivateRoute>
            </AnimationPage>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
