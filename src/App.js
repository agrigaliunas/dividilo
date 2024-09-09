import './App.css';
import { Route, Routes } from "react-router-dom";
import AuthScreen from './screens/AuthScreen.js';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} exact/>
    </Routes>

  );
}

export default App;