
export default function TextInput({ inputType, labelText, placeholder, value, name: inputName }: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <input name={inputName} type={inputType} value={value} className="input input-bordered input-md w-full" placeholder={placeholder} />
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
}