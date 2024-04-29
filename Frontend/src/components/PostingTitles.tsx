import React, { useState, useEffect } from "react";
import { Posting } from "../Types";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';

export default function PostingTitles({ postings, clickedPosting, setClickedPosting }: Props) {
    const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(postings.length).fill(false));
    const navigate = useNavigate();

    useEffect(() => {
        // Find the index of the clicked posting in the postings array
        const index = postings.findIndex(post => post.guidId === clickedPosting.guidId);
        // If the clicked posting is found, update clickedButtons array to reflect it
        if (index !== -1) {
            const newClickedButtons = Array(postings.length).fill(false);
            newClickedButtons[index] = true;
            setClickedButtons(newClickedButtons);
        }
    }, [clickedPosting, postings]);

    function handleClick(clickedPosting: Posting, index: number) {
        setClickedPosting(clickedPosting);
        navigate(`/postings/${clickedPosting.guidId}`);

        const newClickedButtons = Array(postings.length).fill(false);
        newClickedButtons[index] = true;
        setClickedButtons(newClickedButtons);
    }

    return (
        <div className="">
            <section id="posting-names" className="">
                {postings.map((posting, index) => (
                    <div key={posting.guidId}>
                        <button
                            className={`btn btn-ghost btn-wide w-full text-lg md:text-xl ${clickedButtons[index] ? 'bg-neutral-300' : ''}`}
                            onClick={() => handleClick(posting, index)}
                        >
                            {/* {console.log(posting.title)} */}
                            {posting.title}
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

type Props = {
    postings: Posting[];
    clickedPosting: Posting;
    setClickedPosting: Dispatch<SetStateAction<Posting>>;
};
