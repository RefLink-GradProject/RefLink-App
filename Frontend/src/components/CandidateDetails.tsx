import { Candidate } from "../Types";


export default function CandidateDetails({candidate}: Props){
    return (
        <>
        <section id="candidate-info">
            <h1>{candidate?.name}</h1>

        </section>
        <section id="candidate-references">

        </section>
        </>
    )
}


type Props = {
    candidate: Candidate | undefined;
}