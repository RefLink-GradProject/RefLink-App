import { ChangeEvent, useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';
import TextArea from "./TextArea";
import { FieldValues, useForm } from "react-hook-form"
import { ReferencerInCandidateDetails, ReferencerWithQuestions } from "../Types";
import { postResponse } from "../services/responseServices";



export default function AddReviewForm({ referencer }: Props) {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register } = useForm();
    const initialRatingValues: number[] = referencer.questions!.map(() => 3);
    const [ratingValues, setRatingValues] = useState<number[]>(initialRatingValues);

    async function handleAdd(data: FieldValues) {
        const responses = Object.entries(data)
            .filter(([key]) => key.startsWith("review"))
            .map(([key, value]) => ({
                content: value,
                questionGuid: referencer.questions![parseInt(key.slice(6))].guidId
            }));

        await Promise.all(responses.map(response => postResponse(response.content, response.questionGuid)));
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            // navigate("/");
        }, 2000);
    }


    function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        const newValue = Number(event.target.value);
        setRatingValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        });
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-1/2 ">
                    <section id="referencer-info">
                        <h2 className="text-xl">Information about you: </h2>
                        <TextInput register={register} name="reviewer-name" inputType="text" labelText="Name" value={referencer.name} placeholder="Your name" />
                        <TextInput register={register} name="reviewer-company" inputType="text" labelText="Company" placeholder="Company name that you worked together with the candidate" />
                        <TextInput register={register} name="reviewer-title" inputType="text" labelText="Title" placeholder="Your job title" />
                    </section>

                    <section id="references">
                        <h2 className="text-xl">Reference for the candidate: </h2>
                        {
                            referencer.questions!.map((question, i) =>
                                <TextArea register={register} name={`review${i}`} labelText={question.content} placeholder="" />
                            )
                        }
                    </section>

                    <section id="ratings">
                        <h2 className="text-xl">Rating of the candidate: </h2>
                        {
                            referencer.ratingQuestions!.map((question, index) =>
                                <div className="mt-5 mb-5">
                                    <h3>{question.content}</h3>
                                    <input type="range" min={1} max="5" value={ratingValues[index]} className="range range-secondary" step="1" onChange={(event) => handleChange(index, event)} />
                                    <div className="w-full flex justify-between text-xs px-2">
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                    </div>
                                </div>
                            )
                        }

                    </section>
                    <button type="submit" onClick={handleAdd} className='btn btn-neutral btn-sm mr-2 w-20 mb-10'> Add</button>
                </div>
            </div>


            {showAlertAdded && (
                <Alert alertType="success" alertContent="Reference has been sent!" />
            )}
        </>
    )


}


type Props = {
    referencer: ReferencerWithQuestions;
}