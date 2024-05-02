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
            <div className="">
                <section id="posting-names" className="">
                    {postings.map((posting, index) => (
                        <div key={posting.guidId}>
                            <button
                                className={`btn btn-ghost btn-wide w-auto text-lg md:text-xl ${clickedButtons[index] ? 'bg-neutral-300' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <Link to={`/postings/${posting.guidId}`} >{posting.title}</Link>
                            </button>
                        </div>
                    ))}
                </section>
            </div>
        </>

    );
}

type Props = {
    postings: Posting[];
};
