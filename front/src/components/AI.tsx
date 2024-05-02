import React, { useState } from 'react';
import { getAIAnswer } from '../services/aiServices';
import { useForm } from 'react-hook-form';

function App() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
    const [fetching, setFetching] = useState(false);

  async function handleAiRequest(inputText: string){
    console.log("input text: " + inputText)
    try{
        setFetching(true)
        const result = await getAIAnswer(inputText);
        console.log(result);
        setGeneratedText(result);
    }catch(error){

    }finally{
        setFetching(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something..."
        className='input input-bordered w-full max-w-xs'
      />
      <button disabled={fetching} className={"btn btn-square btn-xs " + `${fetching?'btn-base': 'btn-outline'}`} onClick={() => handleAiRequest(inputText)}>{fetching? "fetching...": "Fetch"}</button>
      <div>
        <textarea
          value={generatedText}
          readOnly
          placeholder="Generated text will appear here..."
          className='textarea textarea-bordered'
        />
      </div>
    </div>
  );
}

export default App;
