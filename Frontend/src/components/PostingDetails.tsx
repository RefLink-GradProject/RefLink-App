import { Link } from "react-router-dom";
import { Posting } from "../Types";



export default function PostingDetails({posting: clickedPosting}: Props){


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
                            <Link to="/candidates/add"><button className="btn">+</button></Link>
                            {clickedPosting.candidates.map((candidate) => {
                                return (
                                    <>
                                        <p>{candidate.name}</p>
                                        <Link to={"/candidates/" + candidate.guid}>
                                            <button className="btn btn-xs">Check</button>
                                        </Link>

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
    posting: Posting;
}