import { Dispatch, SetStateAction } from "react";
import { Candidate, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";
import { getPostings } from "../services/postingServices";
import { useMutation, useQuery, useQueryClient } from "react-query";


export default function Postings({ postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {
    // const queryClient = useQueryClient();
    // const query = useQuery({queryKey: ['getPostings'], queryFn: getPostings});
    // const backendPostings: Posting[] = await getPostings();
    // const mutation = useMutation({
    //     // mutationFn: ,
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: ['getdogs'] })
    //     }
    //   })

    // if (query.isLoading) return (<p>Loading...</p>)
    // if (query.error) return (<p>Something went wrong.</p>)
    
    return (
        <>
            <div className='lg:ml-5 lg:mr-5 xl:ml-32 xl:mr-32  mt-20 mb-20'>
                <Link to="/postings/add">
                    <button className="btn btn-neutral">Add Posting</button>
                </Link>
                <section id="postings" className='w-full lg:flex'>
                    <div className='mr-5 lg:w-1/3 '>
                        <PostingTitles postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} />

                    </div>
                    <div className='mt-5 lg:mt-0 lg:w-2/3'>

                        <PostingDetails clickedPosting={clickedPosting} setClickedCandidate={setClickedCandidate} />
                    </div>
                </section>
            </div>
        </>
    )
}


type Props = {
    postings: Posting[];
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
    setClickedCandidate: Dispatch<SetStateAction<Candidate | undefined>>;

}