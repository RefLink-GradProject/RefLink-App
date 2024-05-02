
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


    function getCandidatesRatingsFromOneReviewer(referencer: ReferencerInCandidateDetails) {
        const questionScores: { [subject: string]: number[] } = {};
        // Iterate through each referencer and response to aggregate scores

        referencer.responses.forEach((response: ResponseWithQuestionContent) => {
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


    function handleBackClick() {
        navigate(-1);
    }


    function getNumberOfCompletedRefs(candidate: CandidateWithDetails) {
        const referencers = candidate.referencers;
        let completeRefs = 0;
        referencers.forEach(referencer => {
            if(referencer.responses.length != 0) {
                completeRefs +=1;
            }
        });
        return "" + completeRefs + "/" + referencers.length;
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

            <div className="mb-16 mt-26 w-auto h-full flex flex-row animate-fade-up animate-duration-[400ms]">
                <section className="w-full lg:flex flex-col lg:w-2/5 mb-10 ">
                    <section id="candidate-info" className="mb-10 ml-5 lg:mr-3">
                        <h1 className="text-4xl">{candidate!.name}</h1>
                        <p className="text-">Email: {candidate!.email}</p>
                        <p className="text-">Number of completed references: {completeMessage}</p>
                    </section>

                    <section id="reference-rating" className="mb-5 mr-3">
                        {getCandidatesRatings().length >= 1 && (
                            <>
                                {/* <div className="flex justify-center"> */}
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
                                {/* </div> */}
                            </>
                        )}
                    </section>
                </section>

                <section id="candidate-references" className="mt-5 lg:mt-0 lg:w-3/5">
                    {/* <h2 className="text-2xl mb-3">Text References:</h2> */}
                    {candidate!.referencers && (
                        candidate!.referencers.map((referencer => {
                            return (
                                <>
                                    <details className="collapse collapse-arrow shadow-xl">
                                        {/* <input type="radio" name="my-accordion-2" /> */}
                                        <summary className="collapse-title text-xl font-medium">Reference from {referencer.name}</summary>
                                        <div className="collapse-content">
                                            {referencer.responses.length == 0 &&
                                            (
                                                <p>{referencer.name} has not provided feedback yet.</p>
                                            )}

                                            {referencer.responses!.map((response) => {
                                                return (
                                                    <>
                                                        {response.type == 0 && (
                                                            <>
                                                                <div className="pb-6">
                                                                    <h4 className="text-xl pb-1">{response.questionContent}</h4>
                                                                    <p className="text-sm">{response.responseContent}</p>
                                                                </div>
                                                            </>
                                                        )
                                                        }

                                                    </>
                                                )
                                            })}

                                            {referencer.responses.length > 0 && (
                                            <div className="flex justify-center pr-20 pt-6">
                                                <ResponsiveContainer width={300} height={300}>
                                                    <BarChart width={100} height={100} data={getCandidatesRatingsFromOneReviewer(referencer)}>
                                                        <YAxis domain={[0, 5]} />
                                                        <XAxis dataKey="subject" />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="score" fill="#15803d" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>)}
                                        </div>
                                    </details>
                                </>
                            )
                        }))

                    )}
                </section>
            </div>
            <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>&larr; Back</button>
        </>
    )
}