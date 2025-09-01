import { BrowserRouter } from 'react-router-dom';
import Register from './pages/Register/register';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <h1>Welcome to OralVis-HealthCare</h1>
      {/* <Register /> */}
      <Login />
    </BrowserRouter>
  );
}

export default App;
