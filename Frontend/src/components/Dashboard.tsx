import { Dispatch, SetStateAction } from "react";
import { Candidate, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ postings, setClickedCandidate, setClickedPosting }: Props) {
    const navigate = useNavigate();

    function handleCandidateClick(candidate: Candidate) {
        setClickedCandidate(candidate);
        navigate(`/candidates/${candidate?.guidId}`)
    }

    function handlePostingClick(clickedPosting: Posting) {
        setClickedPosting(clickedPosting);
        navigate(`/postings/${clickedPosting.guidId}`)
    }

    return (
        <>
            {postings.map((posting) => {
                return (
                    <>
                        {posting.candidates? (posting.candidates.map((candidate) => {
                            return (

                                <section className="flex">
                                    <button onClick={() => handleCandidateClick(candidate)} className="btn btn-wide block m-10 w-1/3">{candidate.name}</button>
                                    <p>__</p>
                                    <button onClick={() => handlePostingClick(posting)} className="btn btn-wide block m-10 w-2/3">{posting.title}</button>
                                </section>
                            )
                        })):(<p></p>)}
                    </>
                )

            })}
        </>
    )
}

type Props = {
    postings: Posting[];
    setClickedCandidate: Dispatch<SetStateAction<Candidate>>;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
}