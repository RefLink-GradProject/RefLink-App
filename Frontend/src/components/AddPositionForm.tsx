import { useState } from "react";

export default function AddPositionForm() {
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
        <div className="flex justify-center mt-10">
            <div className="w-1/2">
                <span className="label-text">Name</span>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <input type="text" className="grow" placeholder="Position name" />
                </label>

                <span className="label-text">Description</span>
                <label className="input input-bordered flex items-center gap-2 h-20 mb-3">
                    <input type="text" className="grow" placeholder="Write escription here for AI prompt" />
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
                                    <input type="text" name="question" onChange={event => addQuestionToInputs(event.target.value, i)} className="grow" placeholder="" />
                                </label>
                            </>
                        )
                    }
                </section>
                <button type="submit" onClick={handleConfirm} className='btn btn-neutral btn-sm mr-2 w-20'> Confirm</button>
            </div>
            {showAlertAdded && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Position added!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
