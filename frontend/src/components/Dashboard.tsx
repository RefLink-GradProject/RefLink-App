
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

            <table className="table animate-fade-left animate-duration-[400ms] hidden md:block">
                <thead>
                    <tr>
                        <th className="w-1/3">Candidate</th>
                        <th className="w-1/3">Email</th>
                        <th className="w-1/3">Posting</th>
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
                                        <div className="flex justify-center items-center">
                                            <td className="w-1/3">
                                                <Link to={`/candidates/${candidate.guidId}`}>
                                                <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.name}</span>
                                                </Link>
                                            </td>
                                            <td className="w-1/3">
                                            <Link to={`/candidates/${candidate.guidId}`}>
                                                <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.email}</span>
                                                </Link>
                                            </td>
                                            <td className="w-1/3" >
                                            <Link to={`/postings/${posting.guidId}`}>
                                                <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</span>
                                                </Link>
                                            </td>
                                        </div>
                                    </tr>
                                )
                            })
                        )
                    })}
                </tbody>
            </table>

            <table className="table animate-fade-left animate-duration-[400ms] md:hidden">
                <thead>
                    <tr>
                        <th className="w-1/2">Candidate</th>
                        <th className="w-1/2">Posting</th>
                    </tr>
                </thead>
                <tbody >
                    {postings!.map((posting, postingIndex) => {
                        return (
                            posting.candidates && posting.candidates.map((candidate, candidateIndex) => {
                                i++;
                                return (
                                    <tr key={`${postingIndex}`} className="h-full">
                                        <div className="flex justify-center items-center">
                                            <td className="w-1/2">
                                                <Link to={`/candidates/${candidate.guidId}`}>
                                                <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.name}</span>
                                                </Link>
                                            </td>
                                            <td className="w-1/2" >
                                            <Link to={`/postings/${posting.guidId}`}>
                                                <span className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</span>
                                                </Link>
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