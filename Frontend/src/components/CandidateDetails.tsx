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
                if (countWords(response.questionContent) < 4) {
                    const subject = response.questionContent;
                    const score = parseInt(response.responseContent);

                    if (questionScores[subject]) {
                        questionScores[subject].push(score);
                    } else {
                        questionScores[subject] = [score];
                    }
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
        <>
            <div className="lg:ml-5 lg:mr-5 xl:ml-32 xl:mr-32 mb-20 mt-14 w-full animate-fade-up animate-duration-[400ms]">
                <section className="w-full lg:flex mb-10 ">
                    <section id="candidate-info" className="mb-10 lg:w-2/5 lg:mr-3">
                        <h1 className="text-4xl">{candidate!.name}</h1>
                        <p className="text-">Email: {candidate!.email}</p>
                        <p className="text-">Referencer number: {candidate!.referencers ? candidate!.referencers.length : 0}</p>
                    </section>

                    <section id="candidate-references" className="mt-5 lg:mt-0 lg:w-3/5">
                        {/* <h2 className="text-2xl mb-3">Text References:</h2> */}
                        {candidate!.referencers && (
                            candidate!.referencers.map((referencer => {
                                return (
                                    <>
                                        <div className="collapse collapse-arrow shadow-xl">
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

                </section>
                <section id="reference-rating" className="mb-5">
                    {getCandidatesRatings().length >= 1 && (
                        <>
                            {/* <h2 className="text-2xl mb-3">Ratings:</h2> */}
                            <div className="flex justify-center">
                                <div className="w-100 h-50 flex items-center justify-center">
                                    <ResponsiveContainer width={500} height={300}>
                                        <RadarChart outerRadius={100} width={100} height={100} data={getCandidatesRatings()}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis domain={[0, 5]} />
                                            <Tooltip />
                                            <Radar name={candidate.name} dataKey="score" stroke="" fill="#16a34a" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex w-1/2">
                                    <ResponsiveContainer width={300} height={300}>
                                        <BarChart width={100} height={100} data={getCandidatesRatings()}>
                                            <YAxis domain={[0, 5]} />
                                            <XAxis dataKey="subject" />
                                            <Tooltip />
                                            {/* <Legend /> */}
                                            <Bar dataKey="score" fill="#15803d" />
                                        </BarChart>

                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>&larr; Back</button>
            </div>
        </>
    )
}


type Props = {
    candidate: CandidateWithDetails;
}

