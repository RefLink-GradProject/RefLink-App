import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "./TextInput";


export default function AddReviewForm() {
    const { guid } = useParams();
    console.log("guid", guid);
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();

    const { isLoading, error, data } = useQuery({
        queryKey: ['getReferencerByGuid'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5136/api/referencers/${guid}/questions`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        }
    });

    const responseMutation = useMutation({
        mutationFn: postResponse,
        onSuccess: async (data) => {
            console.log("Success", data);
            return data;
        },
    })

    async function postResponse(data: FieldValues) {
        const response = await fetch("http://localhost:5136/api/responses", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const responseJson = await response.json();
        return responseJson;
    }

    async function submitForm(data: FieldValues) {
        console.log("submitForm", data)

        for (const response of data.responses) {
            console.log(response)
            const payload = {
                content: Object.values(response)[0],
                questionGuid: Object.keys(response)[0]
            }

            console.log(payload);

            responseMutation.mutate(payload);
        }
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
        <>
            <h2>Hello {data.referencer.name}!</h2>
            <p>We appreciate you providing your honest reference.</p>
            {console.log(data)}

            <form className="w-1/2" onSubmit={handleSubmit(submitForm)}>

                <fieldset className="border border-slate-150 rounded-sm p-3 mb-5">
                    <legend className="text-sm text-slate-500 mb-2">Add your response</legend>
                    {
                        data.questions.map((question, i) =>
                            <>
                                <div key={question.guidId}>
                                    <TextInput register={register} name={`responses[${i}].${question.guidId}`} inputType="text" labelText={question.content} placeholder="Type your response" />
                                </div>
                            </>
                        )
                    }
                </fieldset>
                <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Submit</button>
                <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20" onClick={handleBackClick}>Cancel</button>
            </form>
        </>
    )


}
