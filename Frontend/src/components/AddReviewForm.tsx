import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "./TextInput";
import { Question } from "../Types";
import { getReferencerWithQuestions, postRatingResponse, postResponse } from "../services/responseServices";
import { ChangeEvent, useState } from "react";
import Alert from "./Alert";


export default function AddReviewForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const [ratingValues, setRatingValues] = useState<number[]>(Array(20).fill(3));
    const { guid } = useParams();
    // console.log("guid", guid);
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();

    function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        const newValue = Number(event.target.value);
        setRatingValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        });
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['getReferencerByGuid'],
        queryFn: async () => getReferencerWithQuestions(guid!)
    });

    const responseMutation = useMutation({
        mutationFn: postResponse,
        onSuccess: async (data) => {
            // console.log("Success", data);
            return data;
        },
    })

    async function submitForm(filedData: FieldValues) {
        // console.log("submitForm", data)
        for (const response of filedData.responses) {
            // console.log(response)
            const payload = {
                content: Object.values(response)[0],
                questionGuid: Object.keys(response)[0]
            }
            // console.log(payload);
            responseMutation.mutate(payload);
        }
        for(let i=0; i<ratingValues.length; i++){
            const ratingValue = ratingValues[i].toString();
            if( data!.questions[i] != null){
                const ratingQuestionGuid = data!.questions[i].guidId;
                await postRatingResponse(ratingValue, ratingQuestionGuid)
            }
        }
        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/");
        }, 3000);
    }

    function handleBackClick() {
        navigate(-1);
    }

    if (isLoading) {
        return (
            <>
                <div className="h-full w-full flex justify-center">
                    <span className="mx-auto loading loading-spinner loading-lg"></span>
                </div>
            </>
        )
    }


    function countWords(text: string): number {
        const words = text.trim().split(/\s+/);
        return words.length;
    }
    
    if (error) return 'An error has occurred.'

    return (
        <>
            <h2>Hello {data!.referencer.name}!</h2>
            <p>We appreciate you providing your honest reference.</p>
            {/* {console.log(data)} */}

            <form className="w-1/2" onSubmit={handleSubmit(submitForm)}>

                <fieldset id="questions-text" className="border border-slate-150 rounded-sm p-3 mb-5">
                    <legend className="text-sm text-slate-500 mb-2">Add your response</legend>
                    {data!.questions.map((question: Question, i: number) => {
                        const wordCount = countWords(question.content);
                        return (
                            <>
                                {wordCount >= 4 && (
                                    <div key={question.guidId}>
                                        <TextInput
                                            register={register}
                                            name={`responses[${i}].${question.guidId}`}
                                            inputType="text"
                                            labelText={question.content}
                                            placeholder="Type your response"
                                        />
                                    </div>
                                )}
                            </>
                        );
                    })}
                </fieldset>


                <fieldset id="questions-rating" className="border border-slate-150 rounded-sm p-3 mb-5">
                    <legend className="text-sm text-slate-500 mb-2">Add your ratings</legend>
                    {data!.questions.map((question: Question, i: number) => {
                        const wordCount = countWords(question.content);
                        return (
                            <>
                                {wordCount < 3 && (
                               <div className="mt-5 mb-5" key={question.guidId}>
                               <h3>{question.content}</h3>
                               <input  type="range" min={1} max="5" value={ratingValues[i]} className="range range-success" step="1" onChange={(event) => handleChange(i, event)} />
                               <div className="w-full flex justify-between text-xs px-2">
                                   <span>1</span>
                                   <span>2</span>
                                   <span>3</span>
                                   <span>4</span>
                                   <span>5</span>
                               </div>
                           </div>
                                )}
                            </>
                        );
                    })}
                </fieldset>



                <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Submit</button>
                <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20" onClick={handleBackClick}>Cancel</button>
            </form>
            {showAlertAdded && (
                <Alert alertType="success" alertContent="Referencer has been sent!" />
            )}
        </>
    )


}
