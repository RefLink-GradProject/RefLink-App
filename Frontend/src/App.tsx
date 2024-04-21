import {Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';

export default function App() {

  return (
    <>
    <Navbar />
    {/* <Link to="/"><button>HOME</button></Link> */}
    <Routes>
      <Route path="/" element= {<Home />}>
      </Route>

    </Routes>
    </>
  )
}


