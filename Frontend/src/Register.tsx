import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "./components/TextInput";

const Register = () => {
  const { user, isLoading, error } = useAuth0();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("posting-name", user.name);
      setValue("posting-email", user.email);
    }
  }, [user, setValue]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <>
      {user && (
        <>
          <h1 className="text-2xl text-center">Hey {user.name}!</h1>
          <div className="flex justify-center mt-10">
            <form className="w-1/2" onSubmit={handleSubmit(data => {})}>
              <TextInput register={register} name="posting-name" inputType="text" labelText="Name" placeholder="Posting name" />
              <TextInput register={register} name="posting-email" inputType="text" labelText="Email" placeholder="Posting name" />
              <TextInput register={register} name="posting-company" inputType="text" labelText="Company" placeholder="Posting name" />
              <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Register</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
