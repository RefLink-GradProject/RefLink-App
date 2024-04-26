import { useQuery } from "react-query";
import { useParams } from "react-router-dom";


export default function AddReviewForm() {
    const { guid } = useParams();
    console.log("guid", guid);

    const { isLoading, error, data } = useQuery({
        queryKey: ['getReferencerByGuid'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5136/api/referencers/${guid}`, {
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

    return (
        <>
            Hello
        </>
    )


}
