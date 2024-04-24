import { Dispatch, SetStateAction } from "react";
import { Candidate, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";


export default function Postings({ postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {
    return (
        <>
            <div className='ml-36 mr-36 mt-20 mb-20'>
                <Link to="/postings/add">
                    <button className="btn btn-neutral">Add Posting</button>
                </Link>
                <section id="postings" className='w-full flex'>
                    <div className='w-1/2'>
                        <PostingTitles postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} />

                    </div>
                    <div className='w-1/2'>

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