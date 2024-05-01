import TextInput from "./TextInput";
import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function AddCandidateForm({ addCandidate }: Props) {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, getValues, handleSubmit } = useForm();

    async function handleAdd() {
        const candidateName: string = getValues("candidate-name");
        const candidateEmail: string = getValues("candidate-email");
        await addCandidate(candidateName, candidateEmail);

        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/postings");
        }, 3000);
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
            <div className="flex flex-col items-center justify-center animate-fade-up animate-duration-[400ms]">
                <h2 className="text-xl mb-8 text-center">Add a Candidate to Posting</h2>
                <form onSubmit={handleSubmit(handleAdd)} className="w-full md:w-3/4 lg:w-2/3">
                    <TextInput register={register} inputType="name" labelText="Name" placeholder="Candidate name" name="candidate-name" />
                    <TextInput register={register} inputType="email" labelText="Email" placeholder="Candidate email" name="candidate-email" />

                    <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={() => navigate("/postings")}>Cancel</button>
                </form>
                {showAlertAdded && (
                    <Alert alertType="alert-success" alertContent="Candidate added, email for adding referencer has been sent!" />
                )}
            </div>
        </>
    )
}

type Props = {
    addCandidate: (name: string, email: string) => Promise<void>;
}