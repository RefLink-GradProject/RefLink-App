
export default function TextInput({ inputType, labelText, placeholder }: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <input type={inputType} className="input input-bordered input-md w-full" placeholder={placeholder} />
            </label>
        </>
    )
}


type Props = {
    inputType: string;
    labelText: string;
    placeholder: string;
}