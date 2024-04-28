import { Dispatch, SetStateAction } from "react";
import { Candidate, CandidateWithDetails, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';
import { getCandidateWithDetails } from "../services/candidateServices";

export default function Dashboard({ postings, setClickedCandidate, setClickedPosting }: Props) {
    const navigate = useNavigate();

    async function handleCandidateClick(clickedCandidate: Candidate) {
        const candidateWithDetails: CandidateWithDetails = await getCandidateWithDetails(clickedCandidate.guidId!)
        setClickedCandidate(candidateWithDetails);
        navigate(`/candidates/${clickedCandidate!.guidId}`)
    }

    function handlePostingClick(clickedPosting: Posting) {
        setClickedPosting(clickedPosting);
        navigate(`/postings/${clickedPosting.guidId}`)
    }

    return (
        <div className="animate-fade-left animate-duration-[400ms]">
            {postings.map((posting) => {
                return (
                    <>
                        {posting.candidates ? (
                            posting.candidates.map((candidate) => {
                                return (
                                    <section className="flex">
                                        <button onClick={() => handleCandidateClick(candidate)} className="btn btn-wide block m-10 w-1/3">{candidate.name}</button>
                                        <p>__</p>
                                        <button onClick={() => handlePostingClick(posting)} className="btn btn-wide block m-10 w-2/3">{posting.title}</button>
                                    </section>
                                )
                            })
                        ) : (
                            <p></p>
                        )}
                    </>
                )
            })}
        </div>
    )
}

type Props = {
    postings: Posting[];
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
}