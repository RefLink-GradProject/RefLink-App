import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPostingForm from './components/AddPostingForm';
import AddReferencerForm from './components/AddReferencerForm';
import AddReviewForm from './components/AddReviewForm';
import Postings from './components/Postings';
import Dashboard from './components/Dashboard';
import CandidateDetails from './components/CandidateDetails';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from './components/Loader';
import { AuthGuard } from './auth0/AuthGuard';
import { getEmployerByToken, postEmployerByToken } from './services/employerService';
import AddCandidateForm from './components/AddCandidateForm';
import { Employer } from './Types';
import Register from './Register';


export default function App() {
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isAuthenticated && isLoading || user && isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div className='mx-12 2xl:mx-80 md:grow flex justify-center flex-col'>
        <div>
          <Navbar userName={employer?.name} />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/add-reference/:guid' element={<AddReviewForm />} />
            <Route path='/add-referencer/:guid' element={<AddReferencerForm />} />
            <Route path={`/candidates/:guid`} element={<CandidateDetails />} />
            <Route path="/callback" element={<Loader />} />
            <Route path="/dashboard" element={<AuthGuard component={Dashboard} />} />
            <Route path={`/postings/:guid`} element={<Postings />} />
            <Route path="/postings" element={<AuthGuard component={Postings} />} />
            <Route path='/postings/add' element={<AddPostingForm employer={employer!} />} />
            <Route path='/postings/:guid/add-candidate' element={<AddCandidateForm />} />
            <Route path='/register' element={<AuthGuard component={Register} setEmployer={setEmployer} />} />

          </Routes>
        </div>
      </div>
    </>
  )
}


