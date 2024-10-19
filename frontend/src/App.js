import './App.css';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import MemoryManagement from './AppComponents/MemoryManagement';
import MemoryDetails from './AppComponents/MemoryDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Navigate to="memory"/>}/>
          <Route path='/memory' element={<MemoryManagement/>}/>
          <Route path='/memory/:id' element={<MemoryDetails/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
