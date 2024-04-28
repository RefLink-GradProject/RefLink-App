import { createContext } from 'react';
import { Employer } from '../Types'

export interface AuthContextValue {
	employer: Employer | null;
	setEmployer: React.Dispatch<React.SetStateAction<Employer | null>>;
}

export const AuthContext = createContext<AuthContextValue>({
	employer: null,
	setEmployer: () => {},
	
});