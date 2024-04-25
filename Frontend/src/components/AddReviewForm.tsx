import { useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { Referencer } from "../Types";
import { useNavigate } from 'react-router-dom';
import TextArea from "./TextArea";
import { referencer1 } from "../fakeData";
import { FieldValues, useForm } from "react-hook-form"

const referencer = referencer1; // for testing

export default function AddReviewForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit, getValues } = useForm();

    function handleAdd() {
        // ToDo: handle confirm
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/")
        }, 2000);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-1/2 ">
                    <h2 className="text-xl">Information about you: </h2>
                    <TextInput  register={register} name="reviewer-name" inputType="text" labelText="Name" value={referencer.name} placeholder="Your name" />
                    <TextInput register={register} name="reviewer-company" inputType="text" labelText="Company" placeholder="Company name that you worked together with the candidate" />
                    <TextInput register={register} name="reviewer-title" inputType="text" labelText="Title" placeholder="Your job title" />

                    <h2 className="text-xl">Reference for the candidate </h2>
                    {
                        referencer.responses!.map((response) =>
                            <>
                                <TextArea register={register} name="reviewer-review" labelText={response.question.content} placeholder="" />
                            </>
                        )
                    }
                    <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                </div>
            </div>


            {showAlertAdded && (
                <Alert alertType="success" alertContent="Reference has been sent!" />
            )}
        </>
    )


}


type Props = {
    referencer: Referencer;
}