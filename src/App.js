import "./App.css";
import logo from "./logo.png";
import NavBar from "./pages/NavBar";
import Mockman from "mockman-js"
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
         </div>
  );
}

export default App;
