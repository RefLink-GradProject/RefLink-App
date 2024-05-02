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
  const [employer, setEmployer] = useState<Employer | null>(null)

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


