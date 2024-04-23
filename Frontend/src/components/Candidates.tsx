import { Dispatch, SetStateAction } from "react";
import { Candidate, Posting } from "../Types";
import {useNavigate} from 'react-router-dom';

export default function Candidates({ postings, setClickedCandidate: setClikedCandidate}: Props) {
    const navigate = useNavigate();

    function handleCandidateClick(candidate: Candidate){
        setClikedCandidate(candidate);
        navigate(`/candidates/${candidate?.guid}`)
    }

    return (
        <>
            {postings.map((posting) => {
                return (
                    <>
                        
                            {posting.candidates.map((candidate) => {
                                return (

                                    <section className="flex">
                                    <button onClick={() => handleCandidateClick(candidate)} className="btn btn-wide block m-10 w-1/3">{candidate.name}</button>
                                    <p>__</p>
                                    <button className="btn btn-wide block m-10 w-2/3">{posting.title}</button>
                                    </section>
                                )
                            })}
                    </>
                )

            })}
        </>
    )
}

type Props = {
    postings: Posting[];
    setClickedCandidate: Dispatch<SetStateAction<Candidate | undefined>>;
}