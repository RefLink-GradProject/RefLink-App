import { FieldValues, UseFormRegister } from "react-hook-form";

export default function TextInput({register, inputType, labelText, placeholder, value, name}: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <input {...register(name)} name={name} type={inputType} value={value} className="input input-bordered input-md w-full" placeholder={placeholder} />
            </label>
        </>
    )
}


type Props = {
    inputType: string;
    labelText: string;
    placeholder: string;
    value?: string;
    name: string;
    register: UseFormRegister<FieldValues>;
}