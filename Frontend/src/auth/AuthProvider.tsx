import { ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getEmployerByToken } from '../services/employerService';
import { Employer } from '../Types';
import { AuthContext } from './AuthContext';
import React from 'react';

interface AuthProviderProps {
	children: ReactNode;
}

// Provider component to wrap your application and provide the context
const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const EmployerHasRegistration = async () => {
      if (isAuthenticated) {
        try {
          const token = await getIdTokenClaims();
          const acc = await getEmployerByToken(token!); 
          setEmployer(acc);
        } catch (error) {
          console.error('Error checking registration:', error);
          // handle invalid token
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    EmployerHasRegistration();
  }, [isAuthenticated, getIdTokenClaims]);

  // Value to be provided by the context
  const value = {
    employer,
    setEmployer
  };

  if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<span className='loading loading-dots loading-lg text-secondary'></span>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};

export default AuthProvider;
