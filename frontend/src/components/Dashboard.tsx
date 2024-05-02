
import { useQuery } from "react-query";
import { Loader } from "./Loader";
import { getPostings } from "../services/postingServices";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { Candidate, CandidateWithDetails, Posting } from "../Types";
import { useNavigate } from 'react-router-dom';
import { getCandidateWithDetails } from "../services/candidateServices";

export default function Dashboard() {

    const { isLoading, data: postings } = useQuery({
        queryKey: ['getAllPostings'],
        queryFn: getPostings
    })

    if (isLoading) {
        return <Loader />
    }
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
                            posting.candidates && posting.candidates.map((candidate) => {
                                return (
                                    <tr key={`${postingIndex}`} className="h-16">
                                        <th>{postingIndex + 1}</th>
                                        <div className="flex">
                                            <td className="w-1/3">
                                                <Link to={`/candidates/${candidate.guidId}`} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.name}</Link>
                                            </td>
                                            <td className="w-1/3">
                                                <Link to={`/candidates/${candidate.guidId}`} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{candidate.email}</Link>
                                            </td>
                                            <td className="w-1/3" >
                                                <Link to={`/postings/${posting.guidId}`} className="hover:font-bold hover:text-green-600 hover:underline cursor-pointer">{posting.title}</Link>
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