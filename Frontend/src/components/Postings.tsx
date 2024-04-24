import { Link, Route } from "react-router-dom";

import { Posting } from "../Types";
import { Dispatch, SetStateAction, useState } from "react";
import PostingDetails from "./PostingDetails";
import {useNavigate} from 'react-router-dom';

export default function Postings({ postings, setClickedPosting }: Props) {
    const navigate = useNavigate();

    function handleClick(clickedPosting: Posting) {
        setClickedPosting(clickedPosting);
        navigate(`/postings/${clickedPosting.guid}`)
    }


    return (
        <>

            <Link to="/postings/add">
                <button className="btn btn-active">Add Posting</button>
            </Link>
            <div className="">

                <section id="posting-names" className="">

                    {postings.map((posting) => {
                        return (
                            <>
                                <br />
                                <label className="cursor-pointer" onClick={() => handleClick(posting)}>
                                    {posting.title}
                                </label>
                            </>
                        )
                    })}
                </section>

                

            </div>
        </>
    )
}

type Props = {
    postings: Posting[];
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
}