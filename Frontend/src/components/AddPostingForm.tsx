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
    const response = await fetch("http://localhost:5136/api/postings", {
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
    const response = await fetch("http://localhost:5136/api/questions", {
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

    setShowAlertAdded(true);
    setTimeout(() => {
      setShowAlertAdded(false);
      queryClient.invalidateQueries({ queryKey: ['getAllPostings'] })
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
                      className='btn btn-square'
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
                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185" />
                        </svg>}
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
                <label htmlFor={`rating.${question}`}
                  className={`btn btn-sm mb-2 mr-2 ${clickedButtons[i] ? 'btn-success' : ''} `}>{question}
                  <input {...register(`rating.${question}`)} type="checkbox" id={`rating.${question}`} className={`peer/${i} hidden`} onClick={() => handleClick(i) } />
                </label></>
            ))}
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