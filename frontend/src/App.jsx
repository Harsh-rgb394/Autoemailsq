import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route element={<ProtectedRoute />}
          >
            <Route index path="/" element={<Homepage />} />
          </Route>

          <Route element={<PublicRoute />}>

            <Route path="/auth" element={<Register />}
            />
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>




    </>

  );
}

export default App;
