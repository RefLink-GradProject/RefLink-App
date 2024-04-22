import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPositionForm from './components/AddPositionForm';
import Postings from './components/Postings';

export default function App() {

  return (
    <>
    <Navbar />
    {/* <Link to="/"><button>HOME</button></Link> */}
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/positions" element= {<Postings />} />
      <Route path='/positions/add' element={<AddPositionForm />}/>

    </Routes>
    </>
  )
}


