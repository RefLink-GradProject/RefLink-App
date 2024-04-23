import { Link } from "react-router-dom";

import { Posting } from "../Types";

export default function Postings({ postings }: Props) {

    function handleClick(){

    }


    return (
        <>
            <Link to="/postings/add">
                <button className="btn btn-active">Add Posting</button>
            </Link>
            {postings.map((posting) => {
                return (
                    <>
                    <br />
                    <label className="cursor-pointer" onClick={handleClick}>
                        {posting.title}
                    </label>
                    </>
                )
            })}
        </>
    )
}

type Props = {
    postings: Posting[];
}