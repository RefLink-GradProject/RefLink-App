import { CandidateWithDetails } from "../Types";
import { useNavigate } from 'react-router-dom';

export default function CandidateDetails({ candidate }: Props) {
    const navigate = useNavigate();

    function handleBackClik() {
        navigate(-1);
    }

    return (
        <div className="m-10">
            <section id="candidate-info">
                <h1 className="text-4xl">{candidate!.name}</h1>
                <h2 className="text-xl">Email: {candidate!.email}</h2>
                <h2 className="text-xl">Referencer number: {candidate!.referencers ? candidate!.referencers.length : 0}</h2>
            </section>

            <section id="candidate-references">
                {candidate!.referencers ? (
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
                                                    <p className="text-2xl">{response.questionContent}</p>
                                                    <p>{response.responseContent}</p>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    }))
                ) : (
                    <p></p>
                )}

            </section>

            <section id="candidate-graf">

            </section>

            <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={handleBackClik}>&larr; Back</button>
        </div>
    )
}


type Props = {
    candidate: CandidateWithDetails;
}