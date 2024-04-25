import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import { Candidate, Posting } from './Types';
import { postings } from "./fakeData"
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Footer from './components/Footer';
import Postings from './components/Postings';

export default function App() {

  const [clickedCandidate, setClickedCandidate] = useState<Candidate>();
  const [clickedPosting, setClickedPosting] = useState<Posting>(postings[0]);

  return (
    <>
      <div className='mx-12 grow'>
        <Navbar userName='Xinnan Luo' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/postings"
            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />}
          />
          <Route path='/postings/add' element={<AddPostingForm />} />
          <Route path='/dashboard' element={<Dashboard postings={postings} setClickedCandidate={setClickedCandidate} setClickedPosting={setClickedPosting} />} />
          <Route
            path={`/postings/:${clickedPosting.guid}`}
            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />}
          />
          <Route path={`/candidates/:${clickedCandidate?.guid}`} element={<CandidateDetails candidate={clickedCandidate} />} />
          <Route path='/candidates/add' element={<AddCandidateForm />} />
          <Route path='/add-referencer' element={<AddReferencerForm />} />
          <Route path='/add-reference' element={<AddReviewForm />} />
        </Routes>
      </div>
      <Footer />

    </>
  )
}


