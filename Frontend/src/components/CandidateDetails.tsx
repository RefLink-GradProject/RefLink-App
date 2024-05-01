import { useQuery } from "react-query";
import { Loader } from "./Loader";
import { getCandidateWithDetails } from "../services/candidateServices";
import { useNavigate, useParams } from "react-router-dom";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CandidateDetails() {
    const { guid } = useParams();
    const navigate = useNavigate();

    const { isLoading, data: candidate } = useQuery({
        queryKey: ['getCandidateDetails'],
        queryFn: () => getCandidateWithDetails(guid),
        onSuccess: (data) => {
            console.log("Success", data);
        }
    })

    if (isLoading) {
        return <Loader />
    }
    function getCandidatesRatings() {
        const questionScores: { [subject: string]: number[] } = {};

        // Iterate through each referencer and response to aggregate scores
        candidate!.referencers.forEach(referencer => {
            referencer.responses.forEach(response => {
                if (response.type == 1) {
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

    function handleBackClick() {
        navigate(-1);
    }

    return (
        <>
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/postings">Postings</a></li>
                    <li className="text-black font-bold">Candidate details</li>
                </ul>
            </div>

            <div className="lg:ml-5 lg:mr-5 xl:ml-32 xl:mr-32 mb-20 mt-14 w-full animate-fade-up animate-duration-[400ms]">
                <section className="w-full lg:flex mb-10 ">
                    <section id="candidate-info" className="mb-10 lg:w-2/5 lg:mr-3">
                        <h1 className="text-4xl">{candidate!.name}</h1>
                        <p className="text-">Email: {candidate!.email}</p>
                        <p className="text-">Referencer number: {candidate!.referencers ? candidate!.referencers.length : 0}</p>
                    </section>

                    <section id="candidate-references" className="mt-5 lg:mt-0 lg:w-2/5">
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
                                                            {response.type == 1 && (
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
                                            <Radar name={candidate!.name} dataKey="score" stroke="" fill="#16a34a" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClick}>&larr; Back</button>
            </div>
        </>
    )
}