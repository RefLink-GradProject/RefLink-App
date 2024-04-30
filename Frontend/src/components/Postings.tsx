import { Dispatch, SetStateAction, useState } from "react";
import { Candidate, CandidateWithDetails, Posting } from "../Types";
import { Link } from "react-router-dom";
import PostingTitles from "./PostingTitles";
import PostingDetails from "./PostingDetails";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getCandidateWithDetails } from "../services/candidateServices";



export default function Postings({ postings, clickedPosting, setClickedPosting, setClickedCandidate }: Props) {

    // const[nestedRatings, setNestedRatings] = useState<Rating[][]>([]);

    // // candidate's average rating for each its posting
    // async function getCandidateRatings(candidate: Candidate) {
    //     const candidateWithDetails: CandidateWithDetails = await getCandidateWithDetails(candidate.guidId);
        
    //     const questionScores: { [subject: string]: number[] } = {};

    //     // Iterate through each referencer and response to aggregate scores
    //     candidateWithDetails.referencers.forEach(referencer => {
    //         if(referencer.responses){
    //             referencer.responses!.forEach(response => {
    //                 if (countWords(response.questionContent) < 4) {
    //                     const subject = response.questionContent;
    //                     const score = parseInt(response.responseContent);
    //                     if (questionScores[subject]) {
    //                         questionScores[subject].push(score);
    //                     } else {
    //                         questionScores[subject] = [score];
    //                     }
    //                 }
    //             });
    //         }
    //     });
    //     // Calculate the average score for each question
    //     const ratings: Rating[] = [];
    //     for (const subject in questionScores) {
    //         if (questionScores.hasOwnProperty(subject)) {
    //             const scores = questionScores[subject];
    //             const averageScore = scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
    //             ratings.push({
    //                 subject: subject,
    //                 score: averageScore,
    //                 fullMark: 5
    //             });
    //         }
    //     }

    //     const newNestedRatings = [...nestedRatings];
    //     newNestedRatings.push(ratings);
    //     setNestedRatings(newNestedRatings);
    // }

    
    // function combineCandidateRatings(ratingsList: CandidateRating[][]): CandidateRating[] {
    //     const combinedRatings: CandidateRating[] = [];
    
    //     ratingsList.forEach(ratings => {
    //         ratings.forEach(rating => {
    //             const existingRatingIndex = combinedRatings.findIndex(
    //                 combinedRating => combinedRating.subject === rating.subject
    //             );
    //             if (existingRatingIndex !== -1) {
    //                 combinedRatings[existingRatingIndex] = {
    //                     ...combinedRatings[existingRatingIndex],
    //                     ...rating
    //                 };
    //             } else {
    //                 combinedRatings.push(rating);
    //             }
    //         });
    //     });
    
    //     return combinedRatings;
    // }

    // function countWords(text: string): number {
    //     const words = text.trim().split(/\s+/);
    //     return words.length;
    // }

    return (
        <>
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li className=" font-bold">Postings</li>
                </ul>
            </div>

            <div className='lg:ml-5 lg:mr-5 xl:ml-32 xl:mr-32 mb-16 mt-26 w-full h-full animate-fade-left animate-duration-[400ms]'>
                <Link to="/postings/add">
                    <button className="btn btn-success mb-3 ">+ Add Posting</button>
                </Link>
                <section id="postings" className='w-full lg:flex'>
                    <div className='lg:w-2/5 lg:mr-3'>
                        <PostingTitles postings={postings} clickedPosting={clickedPosting} setClickedPosting={setClickedPosting} />

                    </div>
                    <div className='mt-5 lg:mt-0 lg:w-3/5 animate-fade-left animate-duration-[400ms]'>
                        <PostingDetails clickedPosting={clickedPosting} setClickedCandidate={setClickedCandidate} />
                    </div>
                </section>
            </div>
        </>
    )
}


type Props = {
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
    setClickedCandidate: Dispatch<SetStateAction<CandidateWithDetails>>;
    postings: Posting[];
}

type CandidateRating = {
    subject: string;
    person1?: number;
    person2?: number;
    fullMark: number;
}

type Rating = { 
    subject: string; 
    score: number; 
    fullMark: number; 
}
