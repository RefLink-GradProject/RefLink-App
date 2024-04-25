import { useState } from "react";
import { Posting } from "../Types";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';


export default function PostingTitles({ postings, setClickedPosting }: Props) {
    const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(postings.length).fill(false));
    const navigate = useNavigate();

    useState(() => {
        const newClickedButtons = [...clickedButtons];
        newClickedButtons[0] = true;
        setClickedButtons(newClickedButtons);
    });

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
                        <br />
                        <button
                            className={`btn btn-ghost text-xl ${clickedButtons[index] ? 'bg-neutral-200' : ''}`}
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
    setClickedPosting: Dispatch<SetStateAction<Posting | undefined>>;
};
