import { useState } from "react";
import Alert from "./Alert";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";

export default function AddPostingForm() {
    const [questionInputs, setQuestionInputs] = useState<string[]>([])
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const { register, handleSubmit,  } = useForm();
    const navigate = useNavigate();

    function addQuestionToInputs(question: string, i: number) {
        const newQuestionInput = [...questionInputs];
        newQuestionInput[i] = question;
        setQuestionInputs(newQuestionInput);
    }

    function addQuestionInputForm() {
        const newQuestionInput = [...questionInputs, ""]
        setQuestionInputs(newQuestionInput);
    }

    function handleAdd(add: FieldValues) {
        // ToDo: handle confirm
        // const postingName = getValues("posting-name");
        // const postingDescrip = getValues("posting-description");
        // questionInputs.forEach((_, i) => {
        //     const postingQuestion = getValues(`posting-questions.${i}`);
        //     console.log(`posting-questions.${i}:`, postingQuestion);
        // });
        console.log(add);
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/postings");
        }, 2000);
    }

    function handleBackClik() {
        navigate(-1);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <form className="w-1/2" onSubmit={handleSubmit(data => { handleAdd(data) })}>
                    <TextInput register={register} name="posting-name" inputType="text" labelText="Name" placeholder="Posting name" />
                    <TextArea register={register} name="posting-description" labelText="Description" placeholder="Write description here for AI prompt" />

                    <section className="question-form">
                        <p className="label-text mb-3">Questions</p>
                        <button className='btn mb-3 mr-3' type="button" onClick={addQuestionInputForm}> + </button>
                        <button className='btn mb-3 btn-outline' type="button"> AI </button>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <input type="text" name="question" onChange={event => addQuestionToInputs(event.target.value, 0)} className="grow" placeholder="" />
                        </label>
                        {
                            questionInputs.map((question, i) =>
                                <label key={i} className={"input input-bordered flex items-center gap-2 mb-3 " + {question}} >
                                    <input
                                        {...register(`posting-questions.${i}`)} // Register each input with a unique name using array notation
                                        type="text"
                                        id={`question-${i}`}
                                        name={`question-${i}`}
                                        onChange={event => addQuestionToInputs(event.target.value, i)}
                                        className="grow"
                                        placeholder=""
                                    />
                                </label>
                                
                            )
                        }

                    </section>
                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>Cancel</button>
                    <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                </form>
            </div>
            {showAlertAdded && (
                <Alert alertType="success" alertContent="Posting added!" />
            )}
        </>
    );
}



