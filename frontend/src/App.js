import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Pages/AllRoutes';
import Dashboard from './Pages/Admin/Dashboard';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
