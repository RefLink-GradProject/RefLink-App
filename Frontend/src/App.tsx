import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Postings from './components/Postings';
import Register from './Register';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CandidateWithDetails, Employer, Posting } from './Types';
import { getCandidateWithDetails, getCandidates, postCandidate } from './services/candidateServices';
import { getPostings } from './services/postingServices';
import { Loader } from './components/Loader';
import { AuthGuard } from './auth0/AuthGuard';

const allPostings = await getPostings();
const allCandidates = await getCandidates();
const defaultClickedCandidate = await getCandidateWithDetails(allCandidates[0].guidId!)

export default function App() {
  const [employer, setEmployer] = useState<Employer | null>(null)
  const [postings, setPostings] = useState<Posting[]>(allPostings);
  const [clickedCandidate, setClickedCandidate] = useState<CandidateWithDetails>(defaultClickedCandidate);
  const [clickedPosting, setClickedPosting] = useState<Posting>(allPostings[0]);

  async function addCandidate(name: string, email: string) {
    await postCandidate(name, email, clickedPosting.guidId);
    const updatedPostings = await getPostings();
    const updatedClickedPosting = updatedPostings.find(posting => posting.guidId === clickedPosting.guidId);
    if (updatedClickedPosting)
       {
      setClickedPosting(updatedClickedPosting);
    }
    setPostings(updatedPostings);
  }

  return (
    <>
      <div className='mx-12 2xl:mx-80 md:grow flex justify-center flex-col'>
        <div>
          <Navbar userName={employer?.name} />
        </div>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/postings"
              element={
                <AuthGuard
                  component={Postings}
                  postings={postings}
                  clickedPosting={clickedPosting}
                  setClickedPosting={setClickedPosting}
                  setClickedCandidate={setClickedCandidate}
                />}
            />
            <Route
              path="/dashboard"
              element={
                <AuthGuard
                  component={Dashboard}
                  postings={postings}
                  setClickedCandidate={setClickedCandidate}
                  setClickedPosting={setClickedPosting}
                />}
            />

            <Route path='/postings/add' element={<AddPostingForm employer={employer!} />} />
            <Route path={`/postings/:${clickedPosting.guidId}`} element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />} />
            <Route path="/callback" element={<Loader />} />
            <Route path={`/candidates/:${clickedCandidate?.guidId}`} element={<CandidateDetails candidate={clickedCandidate} />} />
            <Route path='/candidates/add' element={<AddCandidateForm addCandidate={addCandidate} />} />
            <Route path='/add-referencer/:guid' element={<AddReferencerForm />} />
            <Route path='/add-reference/:guid' element={<AddReviewForm />} />
            <Route path='/register' element={<AuthGuard component={Register} setEmployer={setEmployer} />} />
          </Routes>
        </div>
      </div>

    </>
  )
}


