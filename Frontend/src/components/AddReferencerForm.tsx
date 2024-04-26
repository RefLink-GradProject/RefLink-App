import { useParams } from 'react-router-dom';

export default function AddReferencerForm() {
    const { guid } = useParams();
    console.log(guid);

    return (
        <>

        </>
    )
}