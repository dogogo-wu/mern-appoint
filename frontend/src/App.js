import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import MyAppoint from './pages/MyAppoint'
import AllApoint from './pages/AllAppoint';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myappoint_page' element={<MyAppoint />} />
            <Route path='/allappoint' element={<AllApoint />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
