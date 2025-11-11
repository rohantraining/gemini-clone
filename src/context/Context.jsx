import { createContext, useState } from "react";
import PropTypes from 'prop-types';

//creating context hook
export const Context = createContext();

//creating contextProvider function passing parameter props
const ContextProvider = ({ children }) => {
  //taking input from user
  // creating state variables and setter functions
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //generating response with typing effect
  // const delayPara = (index, nextWord) => {
  //   setTimeout(function () {
  //     setResultData((prev) => prev + nextWord);
  //   }, 75 * index);
  // };

  //logic for new chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false); //then result screen will be hidden, greet screen and card section is visible 

  }

  // creating function onSent
//   const fetchResponse = async (promptText) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/gemini", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: promptText }),
//     });
//     const data = await res.json();
//     return data.result;
//   } catch (err) {
//     console.error("Error fetching response:", err);
//     return "Something went wrong.";
//   }
// };

const onSent = async (prompt) => {
  const userInput = prompt ?? input; // Use prompt if defined, else input
  if (!userInput.trim()) return; // Prevent empty input

  setResultData("");
  setLoading(true);
  setShowResult(true);

  setPrevPrompts((prev) => {
  if (!prev.includes(userInput)) {
    return [...prev, userInput];
  }
  return prev;
});
setRecentPrompt(userInput);

  try {
    // Call backend instead of frontend gemini.js
    const res = await fetch("http://localhost:5000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json();
    let responseText = data.result ?? "Sorry, no response";

    // Clean response: remove leading '#' and replace '**' with <b> tags
    let cleanResponse = responseText.replace(/^#+\s?/gm, "");
    let parts = cleanResponse.split("**");
    let formatted = parts
      .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
      .join("");
    formatted = formatted.split("*").join("<br>");

    // Typing effect
    const words = formatted.split(" ");
    words.forEach((word, i) =>
      setTimeout(() => {
        setResultData((prev) => prev + word + " ");
        if (i === words.length - 1) setLoading(false); // hide loader after last word
      }, 75 * i)
    );

  } catch (err) {
    console.error("Error fetching Gemini:", err);
    setResultData("Error: could not get response");
    setLoading(false);
  }

  setInput(""); // clear input after sending
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
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
};

// PropTypes validation
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
