import { Link } from "react-router-dom";
import { Candidate, CandidateWithDetails, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";
import { getCandidateWithDetails } from "../services/candidateServices";



export default function PostingDetails({ clickedPosting, setClickedCandidate }: Props) {

    const navigate = useNavigate();
    async function handleClick(clickedCandidate: Candidate) {
        const candidateWithDetails = await getCandidateWithDetails(clickedCandidate.guidId!)
        setClickedCandidate(candidateWithDetails);
        navigate(`/candidates/${clickedCandidate?.guidId}`);
    }


    return (
        <>
            <section id="posting-details" className="card bg-base-100 shadow-2xl  ">
                <div className="card-body">
                    <div id="posting-details__description" className="m-3">
                        <h2 className="card-title mb-2">Description</h2>
                        <p className="text-lg">{clickedPosting.description}</p>
                        <h2></h2>
                    </div>

                    <div id="posting-details__questions" className="m-3">
                        <h2 className="card-title mb-2">Questions</h2>
                        {clickedPosting.questions?(clickedPosting.questions.map((question) => {
                            if (question.type=="0")
                            return (
                                <p className="text-lg">- {question.content}</p>
                            )
                        })):(<p></p>)}
                    </div>

                    <div id="posting-details__questions" className="m-3">
                        <h2 className="card-title mb-2">Rating questions</h2>
                        {clickedPosting.questions?(clickedPosting.questions.map((question) => {
                            if (question.type=="1")
                                return (
                                <p className="text-lg">- {question.content}</p>
                            )
                        })):(<p></p>)}
                    </div>

                    <div id="posting-details__candidates" className="m-3">
                        <div className="flex">
                            <h2 className="card-title mb-2">Candidates</h2>
                            <Link to="/candidates/add"><button className="btn btn-xs btn-neutral ml-3 self-center"> + </button></Link>
                        </div>
                        {clickedPosting.candidates ?(clickedPosting.candidates.map((candidate) => {
                            return (
                                <>
                                    <div className="flex">
                                        <h3 className="text-lg">{candidate.name}</h3>
                                        <button className="btn btn-xs btn-outline ml-3 self-center" onClick={() => handleClick(candidate)}>View details</button>
                                    </div>

                                </>
                            )
                        })):(<p></p>)}
                    </div>
                </div>
            </section>

        </>
    )
}


type Props = {
    clickedPosting: Posting;
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
}