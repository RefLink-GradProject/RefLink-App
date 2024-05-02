import { useState } from "react";
import Alert from "./Alert";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";
import {
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Employer, PostingRequest, QuestionRequest } from "../Types";
import { useMutation, useQueryClient } from "react-query";
import { getAIAnswer } from "../services/aiServices";


const ratingQuestions = [
  "Adaptability",
  "Collaboration",
  "Creativity",
  "Detail-oriented",
  "Learning Agility",
  "Work Efficiency",
  "Time Management",
];

export default function AddPostingForm({ employer }: Props) {
  const queryClient = useQueryClient()
  const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
  const { register, handleSubmit, control, getValues, setValue } = useForm();
  const [isFetching, setIsFetching] = useState<fetchingType[]>(Array(1).fill({ questionNumber: 0, status: false }));
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(ratingQuestions.length).fill(false));
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const navigate = useNavigate();

  // Add default value for the first question field.
  // Otherwise no field will be mapped out at start
  if (fields.length === 0) {
    append({ content: "" });
  }

  const postMutation = useMutation({
    mutationFn: postPosting,
    onSuccess: async (data) => {
      return data;
    },
  });

  const questionMutation = useMutation({
    mutationFn: postQuestions,
    onSuccess: async (data) => {
      console.log("We have successfully posted a question");
      return data;
    },
  });

  async function postPosting(data: PostingRequest) {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/postings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async function postQuestions(data: QuestionRequest) {
    console.log("postQuestion", data);
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async function handleAdd(data: FieldValues) {
    console.log("handleAdd data", data);
    console.log("Employer: ", employer.guidId);

    const postingData: PostingRequest = {
      title: data.postingTitle,
      description: data.postingDescription,
      employerGuid: employer.guidId,
    };

    const postingResponse = await postMutation.mutateAsync(postingData);
    const postingGuid = postingResponse.guidId;

    const questions = data.questions;

    console.log("questions", questions);

    for (const question of questions) {
      console.log("question", question.content);
      const questionsData: QuestionRequest = {
        postingGuid: postingGuid,
        type: 0,
        content: question.content,
      };

      console.log("Here is a questionRequest: ", questionsData);

      const questionResponse = await questionMutation.mutateAsync(questionsData);
      console.log(questionResponse.json);
    }

    for (const [key, value] of Object.entries(data.rating)) {
      if (value) {
        const ratingQuestionData: QuestionRequest = {
          postingGuid: postingGuid,
          type: 1,
          content: key,
        }
        console.log("ratingQuestionData:", ratingQuestionData);
        const ratingQuestionResponse = await questionMutation.mutateAsync(ratingQuestionData);
        console.log(ratingQuestionResponse.json);
      }

    }

    queryClient.invalidateQueries({ queryKey: ['getAllPostings', 'getOnePosting'] })

    setShowAlertAdded(true);
    setTimeout(() => {
      setShowAlertAdded(false);
      navigate("/postings");
    }, 2000);
  }


  function handleBackClick() {
    navigate(-1);
  }

  function handleClick(index: number) {
    const newClickedButtons = [...clickedButtons];
    newClickedButtons[index] = !clickedButtons[index]
    setClickedButtons(newClickedButtons);
  }

  async function handleAiRequest(currentInput: string) {
    try {
      if (currentInput === "") {
        currentInput = "";
      }

      const jobDescription = getValues("postingDescription");

      const result = await getAIAnswer(`Job description: ${jobDescription}. Current input (may be empty): ${currentInput}`);
      return result;
      // await new Promise(resolve => setTimeout(resolve, 2000));
      // return "Uncomment line above"

    } catch (error) {
      console.log("Error handleAiRequest", error)
    } finally {
      // setFetching(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl mb-8 text-center">Add a Posting</h2>
        <form
          className="w-full md:w-3/4 lg:w-2/3"
          onSubmit={handleSubmit(handleAdd)}
        >
          <fieldset className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
            <legend className="text-sm text-slate-500 mb-2">
              Posting details
            </legend>
            <TextInput
              register={register}
              name="postingTitle"
              inputType="text"
              labelText="Name"
              placeholder="Posting name"
            />

            <label className="form-control w-full mb-4">
              <TextArea
                register={register}
                labelText="Please add the job description"
                name={`postingDescription`}
                placeholder="Enter the job description"
              />
            </label>
          </fieldset>

          <fieldset className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg">
            <legend className="text-sm text-slate-500 mb-2">
              Add text questions
            </legend>

            {fields.map((question, i) => (
              <>
                <div key={`${question}${i}`} className="mb-5">
                  <TextArea register={register} name={`questions[${i}].content`} labelText={`Add a question`} placeholder="Add a question" />
                  <div className="flex gap-3">
                    <button className='btn btn-square' type="button" onClick={() => {
                      if (getValues(`questions[${i}].content`).length > 0) {
                        append({ content: "" });
                        setIsFetching([...isFetching, { questionNumber: i, status: false }])
                      }
                    }
                    }>
                      <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" /> </svg>
                    </button>
                    <button className='btn btn-square' type="button" onClick={() => {
                      if (fields.length > 1) {
                        remove(i)
                      }
                    }
                    }>
                      <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                      </svg>
                    </button>
                    <button
                      className='btn btn-square p-1'
                      type="button"
                      onClick={async () => {
                        let fetchingStatus: fetchingType[] = isFetching.map((status, idx) => {
                          if (idx == i) {
                            return { questionNumber: idx, status: true }
                          } else {
                            return { questionNumber: idx, status: false }
                          }
                        })
                        setIsFetching(fetchingStatus);

                        const currentValue = getValues(`questions[${i}].content`);
                        const newValue = await handleAiRequest(currentValue);
                        setValue(`questions[${i}].content`, `${newValue}`, { shouldValidate: true })

                        fetchingStatus = isFetching.map((status, idx) => {
                          if (idx == i) {
                            return { questionNumber: idx, status: false }
                          } else {
                            return { questionNumber: idx, status: false }
                          }
                        })
                        setIsFetching(fetchingStatus);
                      }} >
                      {!isFetching[i].status &&
                        <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <style>
                              {`
                              .cls-1, .cls-2 {
                                fill: none;
                                stroke: #353535;
                                stroke-width: 2px;
                              }
                  
                              .cls-1 {
                                stroke-miterlimit: 10;
                              }
                  
                              .cls-2 {
                                stroke-linecap: round;
                                stroke-linejoin: round;
                              }
                            `}
                            </style>
                          </defs>
                          <title />
                          <path className="cls-1" d="M30.10633,48V45.25532a2.21277,2.21277,0,0,1,2.21277-2.21277h6.10938a2.3921,2.3921,0,0,0,2.32663-2.4654v.04534c.00015-.05884.00025-3.157.0003-3.26864a1.83426,1.83426,0,0,1,.45829-1.145A2.91174,2.91174,0,0,0,41.926,34.283l-.00671-.667a1.01577,1.01577,0,0,1,.651-.95246h1.06717a1.36279,1.36279,0,0,0,1.051-.45576,1.30383,1.30383,0,0,0,.18991-1.39467,67.03163,67.03163,0,0,1-3.03774-7.51068,4.76727,4.76727,0,0,1-.217-1.506l-.00116-4.99479a14.51307,14.51307,0,0,0-.55236-3.96247l-.00629-.02213a13.959,13.959,0,0,0-3.13693-5.70178q-.47888-.51632-1.00575-1.00351c-.22028-.21208-.44471-.42091-.67748-.62277A18.30309,18.30309,0,0,0,24.19349,1a19.61682,19.61682,0,0,0-12.538,4.489A17.555,17.555,0,0,0,7.7101,27.17965C9.94456,31.506,11.69423,38.6214,12.1396,46v2" />
                          <line className="cls-2" x1="27.91667" x2="31.41667" y1="12" y2="12" />
                          <line className="cls-2" x1="27.91667" x2="31.41667" y1="26" y2="26" />
                          <line className="cls-2" x1="29.66667" x2="29.66667" y1="12" y2="26" />
                          <g>
                            <polyline className="cls-2" points="23.992 26 19.904 12 19.226 12 15.159 26" />
                            <line className="cls-2" x1="16.85387" x2="22.27596" y1="21.13313" y2="21.13313" />
                          </g>
                        </svg>
                      }
                      {isFetching[i].status && <span className="loading loading-spinner loading-md"></span>}
                    </button>
                  </div>
                </div >
              </>
            ))}
          </fieldset>

          <fieldset
            id="rating-question-tags"
            className="border border-slate-150 rounded-sm p-3 mb-9 shadow-lg"
          >
            <legend className="text-sm text-slate-500 mb-2">
              Rating questions
            </legend>
            {ratingQuestions.map((question, i) => (
              <>
                <label htmlFor={`rating.${question}`} className={`btn btn-sm mb-2 mr-2 ${clickedButtons[i] ? 'btn-success' : ''} `}>{question}
                  <input {...register(`rating.${question}`)} type="checkbox" id={`rating.${question}`} className={`peer/${i} hidden`} onClick={() => handleClick(i)} />
                </label>
              </>
            ))}
            {clickedButtons.filter(Boolean).length < 3 && (
              <p className="error-message text-red-600 text-sm" id="invalid-helper">Please select at least 3 options</p>
            )}
          </fieldset>

          <button type="submit" className="btn btn-neutral btn-sm mr-2 w-20">
            {" "}
            Submit
          </button>
          <button
            className="btn bth-neutral btn-outline btn-sm mr-2 w-20"
            onClick={handleBackClick}
          >
            Cancel
          </button>
        </form>
      </div >
      {showAlertAdded && (
        <Alert alertType="alert-success" alertContent="Posting added!" />
      )
      }
    </>
  );
}

type Props = {
  employer: Employer;
}

type fetchingType = {
  questionNumber: number,
  status: boolean
}