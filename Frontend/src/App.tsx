import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPositionForm from './components/AddPositionForm';
import Positions from './components/Positions';

export default function App() {

  return (
    <>
    <Navbar />
    {/* <Link to="/"><button>HOME</button></Link> */}
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/positions" element= {<Positions />} />
      <Route path='/positions/add' element={<AddPositionForm />}/>

    </Routes>
    </>
  )
}


