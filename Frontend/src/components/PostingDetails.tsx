import { Link } from "react-router-dom";
import { Candidate, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";



export default function PostingDetails({ clickedPosting, setClickedCandidate }: Props) {

    const navigate = useNavigate();
    function handleClick(clickedCandidate: Candidate) {
        setClickedCandidate(clickedCandidate);
        navigate(`/candidates/${clickedCandidate?.guidId}`);
    }


    return (
        <>
            <section id="posting-details" className="card  bg-base-100 shadow-xl ">
                <div className="card-body">
                    <div id="posting-details__description" className="m-3">
                        <h2 className="card-title mb-2">Description</h2>
                        <p className="text-lg">{clickedPosting.description}</p>
                        <h2></h2>
                    </div>

                    <div id="posting-details__questions" className="m-3">
                        <h2 className="card-title mb-2">Questions</h2>
                        {clickedPosting.questions.map((question) => {
                            return (
                                <p className="m-1 text-lg">- {question.content}</p>
                            )
                        })}
                    </div>

                    <div id="posting-details__candidates" className="m-3">
                        <div className="flex">
                            <h2 className="card-title mb-2">Candidates</h2>
                            <Link to="/candidates/add"><button className="btn btn-xs btn-neutral ml-3"> + </button></Link>
                        </div>
                        {clickedPosting.candidates.map((candidate) => {
                            return (
                                <>
                                    <div className="flex m-1">
                                        <h3 className="text-lg">{candidate.name}</h3>
                                        <button className="btn btn-xs btn-outline ml-3" onClick={() => handleClick(candidate)}>View</button>
                                    </div>

                                </>
                            )
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}


type Props = {
    clickedPosting: Posting;
    setClickedCandidate: Dispatch<SetStateAction<Candidate | undefined>>;
}