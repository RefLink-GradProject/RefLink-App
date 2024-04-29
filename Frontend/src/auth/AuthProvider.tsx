import { ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getEmployerByToken } from '../services/employerService';
import { Employer } from '../Types';
import { AuthContext } from './AuthContext';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const EmployerHasRegistration = async () => {
    try {
      const token = await getIdTokenClaims();
      const acc = await getEmployerByToken(token!);
      console.log(acc)
      setEmployer(acc);
    } catch (error) {
      console.error('Error checking registration:', error);

    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && !employer) {
    EmployerHasRegistration();
  }


  const value = {
    employer,
    setEmployer
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-dots loading-lg text-secondary'></span>
        <div> hi</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
