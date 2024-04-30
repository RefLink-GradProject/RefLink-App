import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import { Candidate, CandidateWithDetails, Employer, Posting } from './Types';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { useEffect, useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Postings from './components/Postings';
import Register from './Register';
import { useAuth0 } from '@auth0/auth0-react';
import { getCandidateWithDetails, getCandidates, postCandidate } from './services/candidateServices';
import { getPostings } from './services/postingServices';
import { postings } from './fakeData';
import ChartsDraft from './components/ChartsDraft';
import { CallbackPage } from './auth0/Callback';
import { AuthGuard } from './auth0/AuthGuard';
import { getEmployerByToken } from './services/employerService';
import NavbarClean from './components/NavbarClean';
import AI from './components/AI';


const allPostings = await getPostings();
const postingsPlusFakes: Posting[] = allPostings.concat(postings);
const allCandidates = await getCandidates();

const defaultClickedCandidate = await getCandidateWithDetails(allCandidates[0].guidId!)

export default function App() {

  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [employer, setEmployer] = useState<Employer | null>(null)
  const [postings, setPostings] = useState<Posting[]>(postingsPlusFakes);
  // const [candidates, setCandidates] = useState<Candidate[]>(allCandidates);
  const [clickedCandidate, setClickedCandidate] = useState<CandidateWithDetails>(defaultClickedCandidate);
  const [clickedPosting, setClickedPosting] = useState<Posting>(allPostings[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCleanNavbar, setIsCleanNavbar] = useState<boolean>(false);


  async function addCandidate(name: string, email: string) {
    await postCandidate(name, email, clickedPosting.guidId);
    const updatedPostings = await getPostings();
    const updatedClickedPosting = updatedPostings.find(posting => posting.guidId === clickedPosting.guidId);
    if (updatedClickedPosting) {
      setClickedPosting(updatedClickedPosting);
    }
    setPostings(updatedPostings);

  }

  console.log(isAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && !employer) { 
        try {
          const token = await getIdTokenClaims();
          const acc = await getEmployerByToken(token!);
          setEmployer(acc);
        } catch (error) {
          console.error('Error checking registration:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [isAuthenticated]); 
  

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-dots loading-lg text-secondary'></span>
      </div>
    );
  }

  return (
    <>
      <div className='md:mx-12 md:grow '>
        {isCleanNavbar ? (<NavbarClean userName='Xinnan Luo' />) :(<Navbar userName='Xinnan Luo' />)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/postings"

            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />}

          />

          <Route path='/postings/add' element={<AddPostingForm />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/dashboard" element={<Dashboard postings={postings} setClickedCandidate={setClickedCandidate} setClickedPosting={setClickedPosting} />} />
          <Route
            path={`/postings/:${clickedPosting.guidId}`}
            element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />}
          />

          <Route path={`/candidates/:${clickedCandidate?.guidId}`} element={<CandidateDetails candidate={clickedCandidate} />} />
          <Route path='/candidates/add' element={<AddCandidateForm addCandidate={addCandidate} />} />
          <Route path='/add-referencer/:guid' element={<AddReferencerForm setIsCleanNavbar={setIsCleanNavbar}/>} />
          <Route path='/add-reference/:guid' element={<AddReviewForm setIsCleanNavbar={setIsCleanNavbar}/>} />
          <Route path='/register' element={<AuthGuard employer={employer} component={Register}/> } />
          <Route path='/charts' element={<AuthGuard employer={employer} component={ChartsDraft} />} />
          <Route path='/ai' element={<AI />} />

        </Routes>
      </div>

    </>
  )
}


