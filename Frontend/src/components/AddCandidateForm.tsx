import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function AddCandidateForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit, getValues } = useForm();

    function handleAdd() {
        // ToDo: handle confirm, update the positions candidates
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/postings");
        }, 3000);
    }

    function handleBackClik() {
        navigate(-1);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-1/2 ">
                    <TextInput register={register} inputType="name" labelText="Name" placeholder="Candidate name" name="candidate-name"/>
                    <TextInput register={register} inputType="email" labelText="Email" placeholder="Candidate email" name="candidate-email" />

                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>Cancel</button>
                    <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                </div>
            </div>
            {showAlertAdded && (
                <Alert alertType="success" alertContent="Candidate added, email for adding referencer has been sent!" />
            )}

        </>
    )
}

