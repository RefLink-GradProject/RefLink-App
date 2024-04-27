import { CandidateWithDetails } from "../Types";
import { useNavigate } from 'react-router-dom';
'use client';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, YAxis, XAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { fakeCandidatesRating } from "../fakeData";

export default function CandidateDetails({ candidate }: Props) {
    const navigate = useNavigate();
    function getCandidatesRatings() {
        const questionScores: { [subject: string]: number[] } = {};

        // Iterate through each referencer and response to aggregate scores
        candidate.referencers.forEach(referencer => {
            referencer.responses.forEach(response => {
                const subject = response.questionContent;
                const score = parseInt(response.responseContent);

                if (questionScores[subject]) {
                    questionScores[subject].push(score);
                } else {
                    questionScores[subject] = [score];
                }
            });
        });

        // Calculate the average score for each question
        const ratings: { subject: string; score: number; fullMark: number; }[] = [];
        for (const subject in questionScores) {
            if (questionScores.hasOwnProperty(subject)) {
                const scores = questionScores[subject];
                const averageScore = scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
                ratings.push({
                    subject: subject,
                    score: averageScore,
                    fullMark: 5
                });
            }
        }

        return ratings;
    }
    console.table(getCandidatesRatings());
    console.table(fakeCandidatesRating);

    function handleBackClik() {
        navigate(-1);
    }

    function countWords(text: string): number {
        const words = text.trim().split(/\s+/);
        return words.length;
    }


    return (
        <div className="m-10">
            <section id="candidate-info">
                <h1 className="text-4xl">{candidate!.name}</h1>
                <h2 className="text-xl">Email: {candidate!.email}</h2>
                <h2 className="text-xl">Referencer number: {candidate!.referencers ? candidate!.referencers.length : 0}</h2>
            </section>

            <section id="candidate-references">
                {candidate!.referencers && (
                    candidate!.referencers.map((referencer => {
                        return (
                            <>
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="my-accordion-2" defaultChecked />
                                    <div className="collapse-title text-xl font-medium">
                                        Reference from {referencer.name}
                                    </div>
                                    <div className="collapse-content">
                                        {referencer.responses!.map((response) => {
                                            return (
                                                <>
                                                    {countWords(response.questionContent) >= 4 && (
                                                        <>
                                                            <p className="text-2xl">{response.questionContent}</p>
                                                            <p>{response.responseContent}</p>
                                                        </>
                                                    )
                                                    }

                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    }))

                )}

            </section>
            <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>&larr; Back</button>
        </div>
    )
}


type Props = {
    candidate: CandidateWithDetails;
}

