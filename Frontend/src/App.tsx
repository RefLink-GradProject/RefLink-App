import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import Postings from './components/Postings';
import { Question, Response, Candidate, Referencer, Posting } from './Types';


export default function App() {

  return (
    <>
    <Navbar />
    {/* <Link to="/"><button>HOME</button></Link> */}
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/postings" element= {<Postings />} />
      <Route path='/postings/add' element={<AddPostingForm />}/>

    </Routes>
    </>
  )
}


