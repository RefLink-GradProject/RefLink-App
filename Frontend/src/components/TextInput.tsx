import { FieldValues, UseFormRegister } from "../../node_modules/react-hook-form/dist";

export default function TextInput({register, inputType, labelText, placeholder, value, name}: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <input {...register(name,{ required: "This field can not be empty" })} name={name} type={inputType} value={value} className="input input-bordered input-md w-full " placeholder={placeholder} />
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