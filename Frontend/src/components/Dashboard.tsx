import { Dispatch, SetStateAction, useState } from "react";
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
        <>
        <div className="text-sm breadcrumbs mb-10">
        <ul>
            <li><a href="/">Home</a></li> 
            <li className="font-bold">Dashboard</li>
        </ul>
        </div>

            <table className="table animate-fade-left animate-duration-[400ms]">
                <thead> 
                    <tr>
                        <th></th>
                        <div className="flex text-base">
                            <th className="w-1/3">Candidate</th>
                            <th className="w-1/3">Email</th>
                            <th className="w-1/3">Posting</th>

                        </div>
                    </tr>
                </thead>
                <tbody >
                    {postings.map((posting, postingIndex) => {
                        return (
                            posting.candidates && posting.candidates.map((candidate) => {
                                i++;
                                return (
                                    <tr key={`${postingIndex}`} className="h-full">
                                        <th>{i}</th>
                                        <div className="flex">
                                            <td className="w-1/3">
                                                <p onClick={() => handleCandidateClick(candidate)} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer"> {candidate.name}</p>
                                            </td>
                                            <td className="w-1/3">
                                                <p onClick={() => handleCandidateClick(candidate)}  className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.email}</p>
                                            </td>
                                            <td className="w-1/3" >
                                                <p onClick={() => handlePostingClick(posting)} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</p>
                                            </td>

                                        </div>
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
        </>
    );

}

type Props = {
    postings: Posting[];
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
}