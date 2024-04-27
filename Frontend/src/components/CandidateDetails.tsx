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
            <section id="candidate-info" className="mb-10">
                <h1 className="text-4xl">{candidate!.name}</h1>
                <p className="text-">Email: {candidate!.email}</p>
                <p className="text-">Referencer number: {candidate!.referencers ? candidate!.referencers.length : 0}</p>
            </section>

            <section id="candidate-references">
                <section id="referenc-texts" className="mb-5">
                    <h2 className="text-2xl mb-3">Text References:</h2>
                    {candidate!.referencers && (
                        candidate!.referencers.map((referencer => {
                            return (
                                <>
                                    <div className="collapse collapse-arrow bg-base-200">
                                        <input type="radio" name="my-accordion-2" defaultChecked />
                                        <div className="collapse-title text-xl font-medium">
                                            <h3 className="text-2xl">Reference from {referencer.name}</h3>
                                        </div>
                                        <div className="collapse-content">
                                            {referencer.responses!.map((response) => {
                                                return (
                                                    <>
                                                        {countWords(response.questionContent) >= 4 && (
                                                            <>
                                                                <h4 className="text-xl">{response.questionContent}</h4>
                                                                <p className="text-sm">{response.responseContent}</p>
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

                <section id="reference-rating" className="mb-5">
    {candidate!.referencers && (
        <>
            <h2 className="text-2xl mb-3">Ratings:</h2>
            <div className="flex justify-center">
                <div className="bg-slate-100 w-100 h-50 flex items-center justify-center">
                    <ResponsiveContainer width={500} height={300}>
                        <RadarChart outerRadius={100} width={100} height={100} data={getCandidatesRatings()}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis domain={[0, 5]} />
                            <Tooltip />
                            <Radar name="Mike" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )}
</section>


            </section>
            <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>&larr; Back</button>
        </div>
    )
}


type Props = {
    candidate: CandidateWithDetails;
}

