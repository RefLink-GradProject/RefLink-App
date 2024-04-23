import { Posting } from "../Types";

export default function Candidates({ postings }: Props) {


    return (
        <>
            {postings.map((posting) => {
                return (
                    <>
                        
                            {posting.candidates.map((candidate) => {
                                return (

                                    <section className="flex">
                                    <button className="btn btn-wide block m-10 w-1/3">{candidate.name}</button>
                                    <p>__</p>
                                    <button className="btn btn-wide block m-10 w-2/3">{posting.title}</button>
                                    </section>
                                )
                            })}
                    </>
                )

            })}
        </>
    )
}

type Props = {
    postings: Posting[];
}