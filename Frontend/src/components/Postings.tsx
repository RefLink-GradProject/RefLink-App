import { Dispatch, SetStateAction } from "react";
import { CandidateWithDetails, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";


export default function Postings({ postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {

    return (
        <>
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li className=" font-bold">Postings</li>
                </ul>
            </div>

            <div className='mb-16 mt-26 w-auto h-full animate-fade-left animate-duration-[400ms]'>
                <div id="postings" className='w-full lg:flex'>
                    <div className='lg:w-2/5 lg:mr-3 flex flex-col'>
                        <div className="w-full">
                            <Link to="/postings/add">
                                <button className="btn btn-success w-full mb-3 text-lg md:text-xl">+ Add Posting</button>
                            </Link>
                        </div>
                        <div>
                            <PostingTitles postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} />
                        </div>
                    </div>
                    <div className='mt-5 lg:mt-0 lg:w-3/5 animate-fade-left animate-duration-[400ms]'>
                        <PostingDetails clickedPosting={clickedPosting} setClickedCandidate={setClickedCandidate} />
                    </div>
                </div>
            </div>
        </>
    )
}


type Props = {
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
    postings: Posting[];
}