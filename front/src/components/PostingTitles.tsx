import React, { useState, useEffect } from "react";
import { Posting } from "../Types";
import { Link, useNavigate } from 'react-router-dom';

export default function PostingTitles({ postings }: Props) {

    console.log("postings", postings)

    // TODO: Add active state class

    return (
        <>
            <ul className="menu bg-base-200 w-56 rounded-box">
                {postings.map((posting) => (
                    <li><Link to={`/postings/${posting.guidId}`} >{posting.title}</Link></li>
                ))}
            </ul>
        </>

    );
}

type Props = {
    postings: Posting[];
};
