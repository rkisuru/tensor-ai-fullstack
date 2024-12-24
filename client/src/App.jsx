import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./components/Menu.jsx";
import Conversation from "./components/Conversation.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/conversation/:id" element={<Conversation />} />
      </Routes>
    </Router>
  );
};

export default App;
