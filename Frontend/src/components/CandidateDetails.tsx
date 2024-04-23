import { Candidate } from "../Types";


export default function CandidateDetails({ candidate }: Props) {
    return (
        <div className="m-10">

            <section id="candidate-info">
                <h1 className="text-4xl">{candidate?.name}</h1>
                <h2 className="text-xl">Id: {candidate?.guid}</h2>
                <h2 className="text-xl">Email: {candidate?.email}</h2>
                <h2 className="text-xl">Referencer number: {candidate?.referencers.length}</h2>
            </section>

            <section id="candidate-references">
                
            </section>
        </div>
    )
}


type Props = {
    candidate: Candidate | undefined;
}