import { useState } from "react";
import Alert from "./Alert";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { PostingRequest } from "../Types";
import { useMutation } from "react-query";

export default function AddPostingForm() {
    const [questionInputs, setQuestionInputs] = useState<string[]>([""])
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const { register, handleSubmit, } = useForm();
    const navigate = useNavigate();

    function addQuestionInputForm() {
        const newQuestionInput = [...questionInputs, ""]
        setQuestionInputs(newQuestionInput);
    }

    const postMutation = useMutation({
        mutationFn: postPosting,
        onSuccess: async (data) => {
            return data;
        },
    })

    const questionMutation = useMutation({
        mutationFn: postQuestions,
        onSuccess: () => {
            console.log("We have successfully posted a question");
        },
    })

    async function postPosting(data: PostingRequest) {
        const response = await fetch("http://localhost:5136/api/postings", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return await response.json(); // I KNOW THIS CONTAINS THE DATA
    }

    async function postQuestions(data, guid) {
        console.log("postQuestion", data);
    }

    async function handleAdd(data: FieldValues) {
        console.log(data);

        const postingData: PostingRequest = {
            title: data.postingTitle,
            description: data.postingDescription,
            employerGuid: "c8b46f7d-2c6a-4b9e-9428-00cdb2c1f9a1" // TODO: get from backend
        }

        const questionsData = Array.from(Object.values(Object.fromEntries(Object.entries(data).slice(2, Object.keys(data).length))))

        const postingResponse = await postMutation.mutateAsync(postingData);
        const postingGuid = postingResponse.guidId

        const questionResponse = await questionMutation.mutateAsync(questionsData, postingGuid);



        // if success then show this
        setShowAlertAdded(true);

        // setTimeout(() => {
        //     setShowAlertAdded(false);
        //     navigate("/postings");
        // }, 2000);



    }

    function handleBackClik() {
        navigate(-1);
    }

    return (
        <>
            <h1>Add posting</h1>
            <div className="container-md mx-auto mt-10">
                <form className="w-1/2" onSubmit={handleSubmit(handleAdd)}>
                    <fieldset className="border border-slate-150 rounded-sm p-3 mb-5">
                        <legend className="text-sm text-slate-500 mb-2">Posting details</legend>
                        <TextInput register={register} name="postingTitle" inputType="text" labelText="Name" placeholder="Posting name" />
                        <TextArea register={register} name="postingDescription" labelText="Description" placeholder="Write description here for AI prompt" />
                    </fieldset>


                    <fieldset className="border border-slate-150 rounded-sm p-3 mb-5">
                        <legend className="text-sm text-slate-500 mb-2">Questions</legend>

                        {/* <label className="input input-bordered flex items-center gap-2 mb-3">
                            <input type="text" name="question" onChange={event => addQuestionToInputs(event.target.value, 0)} className="grow" placeholder="" />
                        </label> */}
                        {
                            questionInputs.map((question, i) =>
                                <>
                                    <TextInput register={register} name={`question-${i}`} inputType="text" labelText={`question-${i}`} placeholder="Add a question" />
                                    <button className='btn mb-3 mr-3' type="button" onClick={addQuestionInputForm}> + </button>
                                    <button className='btn mb-3 btn-outline' type="button"> AI </button>
                                </>
                                // <label key={i} className={"input input-bordered flex items-center gap-2 mb-3 " + { question }} >
                                //     <input
                                //         {...register(`posting-questions.${i}`)} // Register each input with a unique name using array notation
                                //         type="text"
                                //         id={`question-${i}`}
                                //         name={`question-${i}`}
                                //         onChange={event => addQuestionToInputs(event.target.value, i)}
                                //         className="grow"
                                //         placeholder=""
                                //     />
                                // </label>

                            )
                        }
                    </fieldset>

                    <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Submit</button>
                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20" onClick={handleBackClik}>Cancel</button>
                </form>
            </div>
            {showAlertAdded && (
                <Alert alertType="success" alertContent="Posting added!" />
            )}
        </>
    );
}



