import Admin from "./Admin";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* User Side */}
        <Route path="/" element={<Home />} />

        {/* Admin Side */}
        <Route path="/admin" element={<Admin />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


