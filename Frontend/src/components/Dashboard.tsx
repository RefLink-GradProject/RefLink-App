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
    let i = 0;
    return (
        <table className="table animate-fade-left animate-duration-[400ms]">
            <thead>
                <tr>
                    <th></th>
                    <th>Candidate</th>
                    <th>Emial</th>
                    <th>Posting</th>
                    {/* <th>Number of referencer</th>
                    <th>Number of references</th> */}
                </tr>
            </thead>
            <tbody>
                {postings.map((posting, postingIndex) => {
                    return (
                        posting.candidates && posting.candidates.map((candidate) => {
                            i++;
                            return (
                                <tr key={`${postingIndex}`} className="bg-base-200">
                                    <th>{i}</th>
                                    <td className="">
                                        <a onClick={() => handleCandidateClick(candidate)} className="">{candidate.name}</a>
                                    </td>
                                    <td>
                                        <p>{candidate.email}</p>
                                    </td>
                                    <td>
                                        <p onClick={() => handlePostingClick(posting)} className="">{posting.title}</p>
                                    </td>
                                    {/* <td>
                                        <p>1</p>
                                    </td>
                                    <td>
                                        <p>1</p>
                                    </td> */}
                                </tr>
                            )
                        })
                    )
                })}
            </tbody>
        </table>
    );

}

type Props = {
    postings: Posting[];
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
}