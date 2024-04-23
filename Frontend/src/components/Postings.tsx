import { Link } from "react-router-dom";

import { Posting } from "../Types";
import { useState } from "react";

export default function Postings({ postings }: Props) {
    const [clickedPosting, setClickedPosting] = useState<Posting>(postings[0]);

    function handleClick() {

    }


    return (
        <>

            <Link to="/postings/add">
                <button className="btn btn-active">Add Posting</button>
            </Link>
            <div className="">

                <section id="posting-names" className="">

                    {postings.map((posting) => {
                        return (
                            <>
                                <br />
                                <label className="cursor-pointer" onClick={handleClick}>
                                    {posting.title}
                                </label>
                            </>
                        )
                    })}
                </section>

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
                                        <button className="btn btn-xs">Check</button>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

type Props = {
    postings: Posting[];
}