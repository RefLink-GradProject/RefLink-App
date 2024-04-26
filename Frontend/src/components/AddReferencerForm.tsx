import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import { useQuery } from 'react-query';

export default function AddReferencerForm() {
    const { guid } = useParams();
    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "referencers"
    });


    if (fields.length === 0) {
        append({
            name: "",
            email: "",
        });
    }

    const navigate = useNavigate();


    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5136/api/candidates/${guid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
        }
    });


    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message


    async function submitForm(data) {
        console.log("submitForm")
        console.log(data);
    }



    function handleBackClick() {
        navigate(-1);
    }


    console.log(guid);

    return (
        <>
            <>
                <h1 className="text-xl">Hi {data.name}.</h1>
                <p>Let's add some referencers.</p>
                <div className="container-md mx-auto mt-10">
                    <form className="w-1/2" onSubmit={handleSubmit(submitForm)}>

                        <fieldset className="border border-slate-150 rounded-sm p-3 mb-5">
                            <legend className="text-sm text-slate-500 mb-2">Add referencers</legend>

                            {
                                fields.map((referencer, i) =>
                                    <>
                                        <div className='mb-5' key={`${referencer}${i}`}>

                                            <div className="flex gap-3">
                                                <TextInput register={register} name={`referencers[${i}].name`} inputType="text" labelText={`Full name`} placeholder="John Doe" />
                                                <TextInput register={register} name={`referencers[${i}].email`} inputType="text" labelText={`Email address`} placeholder="john.doe@example.com" />
                                            </div>

                                            <div className="flex gap-3">
                                                <button className='btn btn-square' type="button" onClick={() => append({ name: "", email: "" })}>
                                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" /> </svg>
                                                </button>
                                                <button className='btn btn-square' type="button" onClick={() => remove(i)}>
                                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </fieldset>

                        <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Submit</button>
                        <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20" onClick={handleBackClick}>Cancel</button>
                    </form>
                </div>

            </>
        </>
    )
}