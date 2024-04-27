'use client';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, YAxis, XAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { fakeCandidatesRating } from "../fakeData";

export default function ChartsDraft() {
    return (
        <>
            <div className="text-white">
                <ResponsiveContainer width={500} height={200}>
                    <BarChart width={500} height={500} data={fakeCandidatesRating}>
                        <YAxis domain={[0, 5]} />
                        <XAxis dataKey="subject" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="person1" type={"monotone"} fill="#929AAB" />
                        <Bar dataKey="person2" type={"monotone"} fill="#393E46" />
                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="bg-slate-100">
                <ResponsiveContainer width={500} height={500}>
                    <RadarChart outerRadius={150} width={100} height={100} data={fakeCandidatesRating}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 5]} />
                        <Tooltip />
                        <Radar name="Mike" dataKey="person1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>

            </div>
        </>






    )
}
