import { ChangeEvent, useState } from "react";
import TextInput from "./TextInput";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';
import TextArea from "./TextArea";
import { useForm } from "react-hook-form"
import { ReferencerInCandidateDetails } from "../Types";

const referencer: ReferencerInCandidateDetails = { // for testing
    name: "referencer1",
    guidId: "1001",
    responses: [
        { questionContent: "quesstion1", questionGuidId: "1", responseContent: "response1", responseGuidId: "1" },
        { questionContent: "quesstion2", questionGuidId: "2", responseContent: "response2", responseGuidId: "2" },
        { questionContent: "quesstion3", questionGuidId: "3", responseContent: "response3", responseGuidId: "3" },
    ],
    ratings: [
        { questionContent: "Work ability", questionGuidId: "1", ratingContent: 0, ratingGuidId: "1" },
        { questionContent: "Responsibility", questionGuidId: "1", ratingContent: 0, ratingGuidId: "1" },
    ]
}

export default function AddReviewForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register } = useForm();
    const initialRatingValues: number[] = referencer.ratings!.map(()=> 3);
    const [ratingValues, setRatingValues] = useState<number[]>(initialRatingValues);

    function handleAdd() {
        // ToDo: handle confirm
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/")
        }, 2000);
    }

    function handleChange (index: number, event: ChangeEvent<HTMLInputElement>) {
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
                            referencer.responses!.map((response) =>
                                <TextArea register={register} name="reviewer-review" labelText={response.questionContent} placeholder="" />
                            )
                        }
                    </section>

                    <section id="ratings">
                        <h2 className="text-xl">Rating of the candidate: </h2>
                        {
                            referencer.ratings!.map((rating, index) =>
                                <div className="mt-5 mb-5">
                                    <h3>{rating.questionContent}</h3>
                                    <input type="range" min={1} max="5" value={ratingValues[index]} className="range range-secondary" step="1" onChange={(event) => handleChange(index, event)}/>
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


