import { useState } from "react";
import Alert from "./Alert";

export default function AddPostingForm() {
    const [questionInputs, setQuestionInputs] = useState<string[]>([])
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);

    function addQuestionToInputs(question: string, i: number) {
        const newQuestionInput = [...questionInputs];
        newQuestionInput[i] = question;
        setQuestionInputs(newQuestionInput);
    }

    function addQuestionInputForm() {
        const newQuestionInput = [...questionInputs, ""]
        setQuestionInputs(newQuestionInput);
    }

    function handleConfirm() {
        // ToDo: handle confirm
        setShowAlertAdded(true);
        setTimeout(() => setShowAlertAdded(false), 2000);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-1/2">
                    <label className="form-control w-full mb-4">
                        <span className="label-text">Name</span>
                        <input type="text" className="input input-bordered input-md w-full" placeholder="Posting name" />
                    </label>

                    {/* <span className="label-text">Description</span> */}
                    <label className="form-control w-full mb-4">
                        <span className="label-text">What is your name?</span>
                        <textarea className="textarea textarea-bordered textarea-md w-full" placeholder="Write escription here for AI prompt" />
                    </label>

                    <section className="question-form">
                        <p className="label-text mb-3">Questions</p>
                        <button className='btn mb-3 mr-3' type="button" onClick={addQuestionInputForm}> + </button>
                        <button className='btn mb-3 btn-outline' type="button"> AI </button>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <input type="text" name="question" onChange={event => addQuestionToInputs(event.target.value, 0)} className="grow" placeholder="" />
                        </label>
                        {
                            questionInputs.map((question, i) =>
                                <>
                                    <label className="input input-bordered flex items-center gap-2 mb-3">
                                        <input type="text" id={question} name="question" onChange={event => addQuestionToInputs(event.target.value, i)} className="grow" placeholder="" />
                                    </label>

                                </>
                            )
                        }
                    </section>
                    <button type="submit" onClick={handleConfirm} className='btn btn-neutral btn-sm mr-2 w-20'> Confirm</button>
                </div>
            </div>
            {showAlertAdded && (
                    <Alert alertType="success" alertContent="Posting added!"/>
            )}
        </>
    );
}
