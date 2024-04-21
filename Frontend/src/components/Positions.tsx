import { Link } from "react-router-dom";

export default function Positions(){
    return (
        <>
        <Link to="/positions/add">
            <button className="btn btn-active">Add Position</button>
        </Link>
        </>
    )
}