export default function TextArea({ labelText, placeholder, name }: Props) {
    return (
        <>
            <label className="form-control w-full mb-4">
                <span className="label-text">{labelText}</span>
                <textarea name={name} className="textarea textarea-bordered textarea-md w-full" placeholder={placeholder} />
            </label>

        </>
    )
}


type Props = {
    labelText: string;
    placeholder: string;
    name: string;
}