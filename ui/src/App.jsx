import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItems from "./pages/AddItems";
import ViewItems from "./pages/ViewItems";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>
    </Router>
  );
};

export default App;



















 