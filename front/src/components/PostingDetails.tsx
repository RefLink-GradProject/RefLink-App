import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Posting } from "../Types";

export default function PostingDetails({ postings }: Params) {
    console.log("Prop data", postings);
    const { guid } = useParams();

    console.log("guid:", guid);
    const [postingDetails, setPostingDetails] = useState<Posting>(postings[0])

    useEffect(() => {
        if (guid) {
            const posting = postings.find(posting => posting.guidId == guid);
            setPostingDetails(posting!);
            console.log("posting:", posting);
        }
    }, [postings, guid])

    return (
        <>
            <section id="posting-details" className="card bg-base-100 shadow-2xl  ">
                <div className="card-body p-1">
                    <div id="posting-details__description" className="m-3">
                        <h2 className="card-title mb-2">Description</h2>
                        <p className="text-lg">{postingDetails!.description}</p>
                        <h2></h2>
                    </div>

                    <div id="posting-details__questions" className="m-3">
                        <h2 className="card-title mb-2">Questions</h2>

                        {postingDetails!.questions ? (postingDetails!.questions.map((question) => {
                            if (question.type == "0")
                                return (
                                    <p className="text-lg">- {question.content}</p>
                                )
                        })) : (<p></p>)}
                    </div>

                    <div id="posting-details__questions" className="m-3 flex flex-col">
                        <h2 className="card-title mb-4">Rating questions</h2>
                        <div className="flex flex-wrap">
                        {postingDetails!.questions ? (postingDetails!.questions.map((question) => {
                            if (question.type == "1")
                                return (
                                    <a className={`mb-2 mr-2 bg-neutral-200 outline-neutral-200 p-2 mb-10 rounded-sm`}>{question.content}</a>
                                // <p className="text-lg">- {question.content}</p>
                                )
                        })) : (<p></p>)}
                        </div>
                    </div>

                    <div id="posting-details__candidates" className="m-3">
                        <div className="flex">
                            <h2 className="card-title mb-2">Candidates</h2>
                            <Link to={`/postings/${guid}/add-candidate`}><button className="btn btn-xs btn-neutral ml-3 self-center"> + </button></Link>
                        </div>

                        {postingDetails!.candidates ? (postingDetails!.candidates.map((candidate) => {

                            return (
                                <>
                                    <div className="flex">
                                        <h3 className="text-lg">{candidate.name}</h3>
                                        <Link to={`/candidates/${candidate.guidId}`} className="btn btn-xs btn-outline ml-3 self-center">View details</Link>
                                    </div>
                                </>
                            )
                        })) : (<p></p>)}
                    </div>
                </div>
            </section>
        </>
    )
}

type Params = {
    postings: Posting[];
}