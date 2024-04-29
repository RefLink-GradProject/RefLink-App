import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { withAuthenticationRequired } from '@auth0/auth0-react';

// export const AuthenticationGuard = () => {
//     const {employer} = useAuth()
//     const navigate = useNavigate();
//     if (!employer) {
//       return (
//       // return( <div>Return to home</div> )
//       navigate("/")
//       )
//     }
//     return <Outlet />;
//   };

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        hi
      </div>
    ),
  });

  return <Component />;
};

