import { Dispatch, SetStateAction } from "react";
import { CandidateWithDetails, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";


export default function Postings({postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {
    
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
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails >>;
    postings: Posting[];
}