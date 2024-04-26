'use client';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, YAxis, XAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { fakeCandidatesRating } from "../fakeData";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{ marginTop: "-7rem" }}>
      <h1 className="text-6xl text-center mb-8">Your help to manage the references Bla Bla Bla ...</h1>
      <div className="space-y-4">
        <button className="btn btn-lg mr-6 w-36" >Log in</button>
        <button className="btn btn-neutral btn-lg w-36" >Sign up</button>
      </div>

    <div className="text-white">
      <ResponsiveContainer width={200} height={200}>
        <BarChart width={500} height={500} data={fakeCandidatesRating}>
          <YAxis />
          <XAxis/>
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Bar dataKey="person1" type={"monotone"} fill="blue"/>
          <Bar dataKey="person2" type={"monotone"}/>
        </BarChart>
        
      </ResponsiveContainer>

    </div>

    <div className="bg-slate-100">
      <ResponsiveContainer width={500} height={500}>
      <RadarChart
      outerRadius={150}
      width={100}
      height={100}
      data={fakeCandidatesRating}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis domain={[0, 5]} />
      <Tooltip />
      <Radar
        name="Mike"
        dataKey="person1"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
        
      </ResponsiveContainer>

    </div>



    </div>
  )
}
