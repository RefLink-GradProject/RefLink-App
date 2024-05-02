import { FieldValues, useForm } from "../../node_modules/react-hook-form/dist";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "./TextInput";
import { Question } from "../Types";
import { getReferencerWithQuestions, postResponse } from "../services/responseServices";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Alert from "./Alert";


export default function AddReviewForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const [ratingValues, setRatingValues] = useState<number[]>(Array(20).fill(3));
    const { guid } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

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
            console.log("Success", data);
            return data;
        },
    })

    async function submitForm(data: FieldValues) {
        console.log(data);

        for (const [key, value] of Object.entries(data.responses)) {
            const payload = {
                content: value,
                questionGuid: key,
                referencerGuid: guid
            }
            console.log("payload", payload);
            responseMutation.mutate(payload);
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

    if (error) return 'An error has occurred.'

    return (
        <div className="flex flex-col items-center justify-center">

            <div className="mb-8 text-center">
                <h2 className="text-xl">Hello {data!.referencer.name}!</h2>
                <p className="">We appreciate you providing your honest reference.</p>
            </div>

            {/* {console.log(data)} */}

            <form className="w-full md:w-3/4 lg:w-2/3" onSubmit={handleSubmit(submitForm)}>

                <fieldset id="questions-text" className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
                    <legend className="text-sm text-slate-500 mb-2">Add your response</legend>
                    {data!.questions.map((question: Question) => {
                        return (
                            <>
                                {question.type == "0" && (
                                    <div key={question.guidId}>
                                        <TextInput
                                            register={register}
                                            name={`responses.${question.guidId}`}
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


                <fieldset id="questions-rating" className="border border-slate-150 rounded-sm p-3 mb-3 shadow-lg">
                    <legend className="text-sm text-slate-500 mb-2">Add your ratings</legend>
                    {data!.questions.map((question: Question, i: number) => {
                        return (
                            <>
                                {question.type == "1" && (
                                    <div className="mt-5 mb-5" key={question.guidId}>
                                        <h3>{question.content}</h3>
                                        <input
                                            type="range"
                                            {...register(`responses.${question.guidId}`)}
                                            onChange={(event) => handleChange(i, event)}
                                            value={ratingValues[i]}
                                            min="1"
                                            max="5"
                                            step="1"
                                            className="range range-success"
                                        />
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
                <p className="text-xs mb-10">* Your reference will remain anonymous to the candidate, only visible to our HR team. Therefore, feel free to provide honest feedback.</p>

                <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Submit</button>
                <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20" onClick={handleBackClick}>Cancel</button>
            </form>
            {showAlertAdded && (
                <Alert alertType="alert-success" alertContent="Thank you! Your reference has been submitted." />
            )}
        </div>
    )
}