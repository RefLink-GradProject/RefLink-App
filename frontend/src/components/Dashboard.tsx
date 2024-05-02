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

    let i = 0;
    return (
        <>
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li className="font-bold">Dashboard</li>
                </ul>
            </div>

            <div className="table-container">
                <table className="table animate-fade-left animate-duration-[400ms]">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Candidate</th>
                            <th>Email</th>
                            <th>Posting</th>
                        </tr>
                    </thead>
                    <tbody >
                        {postings!.map((posting, postingIndex) => {
                            return (
                                posting.candidates && posting.candidates.map((candidate, candidateIndex) => {
                                    i++;
                                    return (
                                        <tr key={`${postingIndex}`} className="h-full">
                                            <td>{i}</td>
                                            <td>
                                                <Link to={`/candidates/${candidate.guidId}`}>
                                                    <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.name}</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/candidates/${candidate.guidId}`}>
                                                    <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.email}</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/postings/${posting.guidId}`}>
                                                    <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
