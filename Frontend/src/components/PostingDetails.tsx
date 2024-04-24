import { Link } from "react-router-dom";
import { Candidate, Posting } from "../Types";
import {useNavigate} from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";



export default function PostingDetails({clickedPosting, setClickedCandidate}: Props){

    const navigate = useNavigate();
    function handleClick(clickedCandidate: Candidate){
        setClickedCandidate(clickedCandidate);
        navigate(`/dashboard/${clickedCandidate?.guid}`);
    }
    

    return (
        <>
                        <section id="posting-details" className="card  bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <div id="posting-details__description">
                            <h2 className="card-title">Description</h2>
                            <p>{clickedPosting.description}</p>
                        </div>

                        <div id="posting-details__questions">
                            <h2 className="card-title">Questions</h2>
                            {clickedPosting.questions.map((question) => {
                                return (
                                    <p>- {question.content}</p>
                                )
                            })}
                        </div>

                        <div id="posting-details__candidates">
                            <h2 className="card-title">Candidates</h2>
                            <Link to="/dashborad/add"><button className="btn">+</button></Link>
                            {clickedPosting.candidates.map((candidate) => {
                                return (
                                    <>
                                        <p>{candidate.name}</p>
                                            <button className="btn btn-xs" onClick={() => handleClick(candidate)}>View Details</button>

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