import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { Referencer } from "../Types";
import { useNavigate } from 'react-router-dom';

export default function AddReferencerForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const [referencerInputs, setReferencerInputs] = useState<Referencer[]>([]);

    const navigate = useNavigate();

    function handleAdd() {
        // ToDo: handle confirm
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/")
        }, 2000);
    }

    function addReferencerToInputs(referencer: Referencer, i: number) {
        const newReferencerInputs = [...referencerInputs];
        newReferencerInputs[i] = referencer;
        setReferencerInputs(newReferencerInputs);
    }

    function addReferencerInputForm() {
        const newReferencerInputs = [...referencerInputs, { name: "", email: "" }]
        setReferencerInputs(newReferencerInputs);
    }

    return (
        <>
            <h2>Add your referencer details here: </h2>
            <button className='btn mb-3 mr-3' type="button" onClick={addReferencerInputForm}> + </button>
            <div className="flex justify-center mt-10">
                <div className="w-full flex">
                    <div className="w-1/2">
                        <TextInput name="referencer-name" inputType="name" labelText="Name" placeholder="Candidate name" />
                    </div>
                    <div className="w-1/2">

                        <TextInput name="referencer-emial" inputType="email" labelText="Email" placeholder="Candidate email" />
                    </div>
                </div>
            </div>
            {referencerInputs.map((input, i) =>
                <>
                    <div className="flex justify-center mt-10">
                        <div className="w-full flex">
                            <div className="w-1/2">
                                <TextInput name="referencer-name" inputType="name" labelText="Name" placeholder="Candidate name" />
                            </div>
                            <div className="w-1/2">
                                <TextInput name="referencer-emial" inputType="email" labelText="Email" placeholder="Candidate email" />
                            </div>
                        </div>
                    </div>

                </>
            )}


            <div className="fixed bottom-20 right-20 mb-4 mr-4"> {/* Fixed position at bottom right */}
                <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm w-20'> Add</button>
            </div>


            {showAlertAdded && (
                <Alert alertType="success" alertContent="Your reference has been send!" />
            )}



        </>
    )
}