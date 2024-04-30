import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "./components/TextInput";
import { Loader } from "./components/Loader";
import { postEmployerByToken } from "./services/employerService";

type CreateEmployer = {
  name: string;
  email: string; 
  company: string;
}

const Register = () => {
  const { user, isLoading, error, getIdTokenClaims } = useAuth0();
  const { register, setValue, reset, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]); 

  const onSubmit = async (data : FormData) => {
    try {
      const token = await getIdTokenClaims()
      console.log(token!.__raw)
      const response = await postEmployerByToken(token!, data)
      if (response) {  
        return navigate("/postings");
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  if (isLoading) {
    <Loader/>
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <>
      {user && (
        <>
          <h1 className="text-2xl text-center">Hey {user!.name}!</h1>
          <div className="flex justify-center mt-10">
            <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
              <TextInput register={register} name="name" value={user!.name} inputType="text" labelText="Name" placeholder="Posting name" />
              <TextInput register={register} name="email" inputType="text"  value={user!.email} labelText="Email" placeholder="Posting name" />
              <TextInput register={register} name="company" inputType="text" labelText="Company" placeholder="Posting name" />
              <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Register</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
