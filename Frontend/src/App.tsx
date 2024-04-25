import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import { Candidate, Posting } from './Types';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { useEffect, useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Footer from './components/Footer';
import Postings from './components/Postings';
import { useQuery } from 'react-query';
import { getCandidates, getPostings } from './services/postingServices';
import { candidate1, candidate2, candidate3 } from './fakeData';

const allPostings = await getPostings();
// const allCandidates = await getCandidates();
const allCandidates = [candidate1, candidate2, candidate3]

export default function App() {

  // const getPostingsQuery = useQuery({ queryKey: ['getPostings'], queryFn: getPostings });
  // const allPostings = getPostingsQuery.data!;
  
  const[postings, setPostings] = useState<Posting[]>(allPostings);
  const[candidates, setCandidates] = useState<Candidate[]>(allCandidates);
  const [clickedCandidate, setClickedCandidate] = useState<Candidate>(allCandidates[0]);
  const [clickedPosting, setClickedPosting] = useState<Posting>(allPostings[0]);
  
  useEffect(() => {
    if (postings.length > 0) {
      setClickedPosting(postings[0]);
    }
  }, [postings]);


  // if (getPostingsQuery.isLoading) return (<p>Loading Postings...</p>)
  // if (getPostingsQuery.error) return (<p>Something went wrong when loading postings.</p>)
  return (
    <>
      <div className='mx-12 grow'>
        <Navbar userName='Xinnan Luo' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/postings"
            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={() => setClickedPosting} setClickedCandidate={ () =>setClickedCandidate} />}
          />
          <Route path='/postings/add' element={<AddPostingForm />} />
          <Route path='/dashboard' element={<Dashboard postings={postings} setClickedCandidate={() => setClickedCandidate} setClickedPosting={ () =>setClickedPosting} />} />
          <Route
            path={`/postings/:${clickedPosting.guidId}`}
            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={ () =>setClickedPosting} setClickedCandidate={ () => setClickedCandidate} />}
          />

          <Route path={`/candidates/:${clickedCandidate?.guidId}`} element={<CandidateDetails candidate={clickedCandidate} />} />
          <Route path='/candidates/add' element={<AddCandidateForm />} />
          <Route path='/add-referencer' element={<AddReferencerForm />} />
          <Route path='/add-reference' element={<AddReviewForm />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
