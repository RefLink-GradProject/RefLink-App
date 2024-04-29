import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function AddCandidateForm({ addCandidate }: Props) {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, getValues } = useForm();

    function handleAdd() {
        const candidateName: string = getValues("candidate-name");
        const candidateEmail: string = getValues("candidate-email");
        addCandidate(candidateName, candidateEmail);

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
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/postings">Postings</a></li>
                    <li className=" font-bold">Add candidate</li>
                </ul>
            </div>

            <div className="flex justify-center mt-10">
                <div className="w-1/2 ">
                    <TextInput register={register} inputType="name" labelText="Name" placeholder="Candidate name" name="candidate-name" />
                    <TextInput register={register} inputType="email" labelText="Email" placeholder="Candidate email" name="candidate-email" />

                    <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>Cancel</button>
                </div>
            </div>
            {showAlertAdded && (
                <Alert alertType="alert-success" alertContent="Candidate added, email for adding referencer has been sent!" />
            )}

        </>
    )
}

type Props = {
    addCandidate: (name: string, email: string) => void;
}