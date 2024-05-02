
import { useQuery } from "react-query";
import { Loader } from "./Loader";
import { getPostings } from "../services/postingServices";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { Candidate, CandidateWithDetails, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';
import { getCandidateWithDetails } from "../services/candidateServices";

export default function Dashboard() {
    const navigate = useNavigate();

    const { isLoading, data: postings } = useQuery({
        queryKey: ['getAllPostings'],
        queryFn: getPostings
    })

    if (isLoading) {
        return <Loader />
    }

    function handlePostingClick(posting: Posting) {
        navigate(`/postings/${posting.guidId}`)
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
                    {postings!.map((posting, postingIndex) => {
                        return (
                            posting.candidates && posting.candidates.map((candidate, candidateIndex) => {
                                i++;
                                return (
                                    <tr key={`${postingIndex}`} className="h-full">
                                        <th>{i}</th>
                                        <div className="flex justify-center self-center">
                                            <td className="w-1/3">
                                                <p onClick={() => handlePostingClick(posting)} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.name}</p>
                                            </td>
                                            <td className="w-1/3">
                                                <p onClick={() => handlePostingClick(posting)} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.email}</p>
                                            </td>
                                            <td className="w-1/3" >
                                                <p onClick={() => handlePostingClick(posting)} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</p>
                                            </td>
                                        </div>
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