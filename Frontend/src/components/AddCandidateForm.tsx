import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';

export default function AddCandidateForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();

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
                    <TextInput inputType="name" labelText="Name" placeholder="Candidate name" />
                    <TextInput inputType="email" labelText="Email" placeholder="Candidate email" />

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

