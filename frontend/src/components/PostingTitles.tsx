import React, { useState, useEffect } from "react";
import { Posting } from "../Types";
import { Link, useNavigate } from 'react-router-dom';

export default function PostingTitles({ postings }: Props) {
    const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(postings.length).fill(false));

    function handleClick(index: number) {
        const newClickedButtons = Array(postings.length).fill(false);
        newClickedButtons[index] = true;
        setClickedButtons(newClickedButtons);
    }

    return (
        <>
            <ul className="menu bg-base-200 w-56 rounded-box">
                {postings.map((posting, index) => (
                    <button
                        className={`btn btn-ghost btn-wide w-auto text-lg md:text-xl ${clickedButtons[index] ? 'bg-neutral-300' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <Link to={`/postings/${posting.guidId}`} >{posting.title}</Link>
                    </button>
                ))}
            </ul>
        </>

    );
}

type Props = {
    postings: Posting[];
};
