import { FieldValues, UseFormRegister } from "react-hook-form";

export default function TextArea({register, labelText, placeholder, name }: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <textarea {...register(name, { required: "This field can not be empty" })} name={name} className="textarea textarea-bordered textarea-md w-full" placeholder={placeholder} />
            </label>

        </>
    )
}


type Props = {
    labelText: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<FieldValues>;
}