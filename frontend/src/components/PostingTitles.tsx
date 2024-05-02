import React, { useState, useEffect } from "react";
import { Posting } from "../Types";
import { Link, useNavigate } from 'react-router-dom';

export default function PostingTitles({ postings }: Props) {
    const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(postings.length).fill(false));
    const navigate = useNavigate();

    function handleClick(posting: Posting, index: number) {
        navigate(`/postings/${posting.guidId}`);

        const newClickedButtons = Array(postings.length).fill(false);
        newClickedButtons[index] = true;
        setClickedButtons(newClickedButtons);
    }

    return (
        <>
            <div className="">
                <section id="posting-names" className="">
                    {postings.map((posting, index) => (
                        <div key={posting.guidId} className={`flex justify-center `}>
                            <button
                                className={`btn btn-ghost btn-wide w-full text-lg md:text-xl ${clickedButtons[index] ? 'bg-neutral-300' : ''} hover:bg-neutral-300`}
                                onClick={() => handleClick(posting, index)}
                            >{posting.title}</button>
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
