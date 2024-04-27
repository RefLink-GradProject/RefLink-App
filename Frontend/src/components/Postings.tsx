import { Dispatch, SetStateAction } from "react";
import { CandidateWithDetails, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";


export default function Postings({postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {
    
    return (
        <>
            <div className='lg:ml-5 lg:mr-5 xl:ml-32 xl:mr-32 mb-20 w-full'>
                <Link to="/postings/add">
                    <button className="btn btn-success mb-3 ">+ Add Posting</button>
                </Link>
                <section id="postings" className='w-full lg:flex'>
                    <div className='lg:w-2/5 lg:mr-3'>
                        <PostingTitles postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} />

                    </div>
                    <div className='mt-5 lg:mt-0 lg:w-3/5'>
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