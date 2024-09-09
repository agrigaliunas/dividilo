import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} exact/>
      <Route path="/register" element={<RegisterScreen />} exact/>

    </Routes>

  );
}

export default App;