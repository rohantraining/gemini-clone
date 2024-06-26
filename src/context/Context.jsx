import { createContext, useState } from "react";
import run from "../config/gemini";

//creating context hook
export const Context = createContext();

//creating contextProvider function passing parameter props
const ContextProvider = (props) => {
  //taking input from user
  // creating state variables and setter functions
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //generating response with typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  //logic for new chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false); //then result screen will be hidden, greet screen and card section is visible 

  }

  // creating function onSent
  const onSent = async (prompt) => {
    setResultData(""); // clear previous response, so that previous response will be removed from state variable
    setLoading(true); // show loading animation on screen
    setShowResult(true);

    let response;

    //agar prompt defined hain toh response aayega
    // agar prompt undefined hain toh prev prompts ke input dikhayega
    if(prompt != undefined){


        response = await run(prompt)
        setRecentPrompt(prompt)
    }else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response = await run(input)

    }

    // Remove all leading '#' characters
    let cleanResponse = response.replace(/^#+\s?/gm, "");

    //replace ** with bold tag
    let responseArray = cleanResponse.split("**");

    let newResponse = ""; //for removing undefined in the start of each prompt

    // Process responseArray to add bold tags
    for (let i = 0; i < responseArray.length; i++) {
      // when index is 0 or even
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        // wrap in <b> tags
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // Replace '*' with <br> tags for new lines
    let newResponse2 = newResponse.split("*").join("<br>");

    //space means another word used space to split the string
    let newResponseArray = newResponse2.split(" "); // Declare newResponseArray here
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    
    setLoading(false); // hide loading animation
    setInput(""); // clear input field
  };

  // Example usage
  // onSent("what is react js")

  // creating variable contextValue and passing object{}
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
