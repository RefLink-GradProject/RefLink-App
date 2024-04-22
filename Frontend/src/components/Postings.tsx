import { Link } from "react-router-dom";

export default function Postings(){
    return (
        <>
        <Link to="/postings/add">
            <button className="btn btn-active">Add Posting</button>
        </Link>
        </>
    )
}