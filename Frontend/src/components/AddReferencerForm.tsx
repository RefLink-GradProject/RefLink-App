import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";

export default function AddReferencerForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);

    function handleAdd() {
        // ToDo: handle confirm
        setShowAlertAdded(true);
        setTimeout(() => setShowAlertAdded(false), 2000);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-1/2 ">
                    <TextInput inputType="name" labelText="Name" placeholder="Candidate name" />
                    <TextInput inputType="email" labelText="Email" placeholder="Candidate email" />

                    <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                </div>
            </div>
            {showAlertAdded && (
                <Alert alertType="success" alertContent="Candidate added, email for adding referencer has been sendt!" />
            )}



        </>
    )
}