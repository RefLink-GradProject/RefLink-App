import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import { CandidateWithDetails, Employer, Posting } from './Types';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { useEffect, useState } from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Postings from './components/Postings';
import Register from './Register';

import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

const allPostings = await getPostings();
const postingsPlusFakes: Posting[] = allPostings.concat(postings);
const allCandidates = await getCandidates();

// const CurrentEmployer = await getEmployer();
import { getCandidateWithDetails, getCandidates, postCandidate } from './services/candidateServices';
import { getPostings } from './services/postingServices';
import { postings, referencerWithQuestions } from './fakeData';
import ChartsDraft from './components/ChartsDraft';

import { Loader } from './components/Loader';
import { AuthGuard } from './auth0/AuthGuard';
import { getEmployerByToken, postEmployerByToken } from './services/employerService';

import NavbarClean from './components/NavbarClean';
import AI from './components/AI';

const defaultClickedCandidate = await getCandidateWithDetails(allCandidates[0].guidId!)

export default function App() {

  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
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


  async function HandleEmployer() {
    try {
      if (isAuthenticated && !employer) {
        const token = await getIdTokenClaims();
        let acc = await getEmployerByToken(token!);
        if (!acc) {
          acc = await postEmployerByToken(token!, {
            name: user!.name,
            email: user!.email,
            company: ""
          })
        }
        await setEmployer(acc);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated && !employer)
    HandleEmployer()

  if (isAuthenticated && isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <div className='md:mx-12 md:grow '>
        <Navbar userName='Xinnan Luo' />

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
          <Route path='/postings/add' element={<AddPostingForm />} />
          <Route path={`/postings/:${clickedPosting.guidId}`} element={<Postings postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} setClickedCandidate={setClickedCandidate} />}/>
          <Route path="/callback" element={<Loader />} />
          <Route path={`/candidates/:${clickedCandidate?.guidId}`} element={<CandidateDetails candidate={clickedCandidate} />} />
          <Route path='/candidates/add' element={<AddCandidateForm addCandidate={addCandidate} />} />

          <Route path='/add-referencer/:guid' element={<AddReferencerForm />} />
          <Route path='/add-reference/:guid' element={<AddReviewForm />} />
          <Route path='/register' element={<AuthGuard component={Register} />} />
          <Route path='/charts' element={<AuthGuard component={ChartsDraft} />} />

        </Routes>
      </div>

    </>
  )
}


