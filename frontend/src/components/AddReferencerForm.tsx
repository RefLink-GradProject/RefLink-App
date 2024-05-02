import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import { useMutation, useQuery } from 'react-query';
import { ReferencerRequest } from '../Types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Alert from './Alert';

export default function AddReferencerForm() {
    // useEffect(() => {
    //     setIsCleanNavbar(true);

    //     return () => {
    //         setIsCleanNavbar(false); // This will be executed when leaving the page
    //     };
    // }, [setIsCleanNavbar]);
    const [showAlertSubmitted, setShowAlertSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();
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

    const { isLoading, error, data } = useQuery({
        queryKey: ['getCandidateByGuid'],
        queryFn: async () => {
            const response = await fetch(`https://reflink.azurewebsites.net/api/candidates/${guid}`, {
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

    const referencerMutation = useMutation({
        mutationFn: postReferencer,
        onSuccess: async (data) => {
            return data;
        },
    })

    async function postReferencer(data: FieldValues) {
        const response = await fetch(`https://reflink.azurewebsites.net/api/referencers`, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const responseJson = await response.json();
        setShowAlertSubmitted(true);

        setTimeout(() => {
            setShowAlertSubmitted(false);
            navigate("/");
        }, 2000);

        return responseJson;
    }

    async function submitForm(data: FieldValues) {
        for (const referencer of data.referencers) {

            const payload: ReferencerRequest = {
                candidateGuid: guid!,
                name: referencer.name,
                email: referencer.email
            }

            await referencerMutation.mutateAsync(payload);
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
        <div className='flex flex-col items-center justify-center'>
            <h1 className="text-xl text-center">Hi, {data.name}!</h1>
            <p className='mb-8 '>Let's add some referencers.</p>

                <form className="w-full md:w-3/4 lg:w-2/3" onSubmit={handleSubmit(submitForm)}>

                    <fieldset className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
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
                                            <button className='btn btn-square btn-xs' type="button" onClick={() => append({ name: "", email: "" })}>
                                                <svg className="w-6 h-6 text-gray-800 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" /> </svg>
                                            </button>
                                            <button className='btn btn-square btn-xs' type="button" onClick={() => remove(i)}>
                                                <svg className="w-6 h-6 text-gray-800 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                {showAlertSubmitted && (
                <Alert alertType="alert-success" alertContent="Referencers Submitted!" />
            )}

        </div>
    )
}


type Props = {
    setIsCleanNavbar: Dispatch<SetStateAction<boolean>>;
}