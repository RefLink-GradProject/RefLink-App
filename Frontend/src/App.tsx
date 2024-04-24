import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import Postings from './components/Postings';
import { Question, Response, Candidate, Referencer, Posting } from './Types';
import {candidate3, postings} from "./fakeData"
import Candidates from './components/Candidates';
import CandidateDetails from './components/CandidateDetails';
import { useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import PostingDetails from './components/PostingDetails';

export default function App() {

  const [clickedCandidate, setClickedCandidate] = useState<Candidate>();
  const [clickedPosting, setClickedPosting] = useState<Posting>(postings[0]);

  return (
    <>
    <Navbar />
    {/* <Link to="/"><button>HOME</button></Link> */}
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/postings" element= {<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting}/>} />
      <Route path='/postings/add' element={<AddPostingForm />}/>
      <Route path='/candidates' element={<Candidates postings={postings} setClickedCandidate={setClickedCandidate} setClickedPosting={setClickedPosting}/>}/>
      <Route 
        path={`/postings/:${clickedPosting.guid}`} 
        element={
          <>
            <Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting}/> 
            <PostingDetails clickedPosting={clickedPosting} setClickedCandidate={setClickedCandidate}/>
          </>
        }
      />
      <Route path={`/candidates/:${clickedCandidate?.guid}`} element= {<CandidateDetails candidate={clickedCandidate}/>}/>
      <Route path='/candidates/add' element={<AddCandidateForm />}/>
      <Route path='/add-referencer' element={<AddReferencerForm />}/>
    </Routes>
    
    </>
  )
}


