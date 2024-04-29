import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const RegistrationGuard = () => {
    const {employer} = useAuth()
    const navigate = useNavigate();
    if (!employer) {
      navigate("/register")
    }
    return <Outlet />;
  };

