import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../node_modules/react-hook-form/dist";
import TextInput from "./components/TextInput";
import { Loader } from "./components/Loader";
import { getEmployerByToken, postEmployerByToken } from "./services/employerService";
import { Employer } from "./Types";
import { useState } from "react";


type Props = {
  employer : Employer | null;
  setEmployer : (arg : Employer | null) => void;
}

const Register = ( {setEmployer, employer} : Props ) => {

  const { user, isLoading, error, getIdTokenClaims, isAuthenticated} = useAuth0();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isLoading2, setIsLoading2] = useState(true)

  if (isLoading) {
    return (
      <Loader />
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  async function isUser() {
      if (isAuthenticated && !employer) {
        const token = await getIdTokenClaims();
        let acc = await getEmployerByToken(token!);
        if(acc){
          setEmployer(acc);
          navigate("/")
        }
      }
    }
  isUser().then(() => setIsLoading2(false))

  if (isLoading2) {
    return (
      <Loader />
    );
  }

  const onSubmit = async (data : FormData) => {
    try {
      const token = await getIdTokenClaims()
      console.log(token!.__raw)
      const acc = await postEmployerByToken(token!, data)
      if (acc) {  
        console.log(acc)
        setEmployer(acc)
        return navigate("/postings");
      }
    } catch (error) {
      console.log("failed creating user")
    }
  };


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
