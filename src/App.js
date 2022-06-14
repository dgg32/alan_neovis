/*
import React, { useEffect, useRef } from "react";
import { NeoVisComponent } from "./component/NeoVis";
function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <NeoVisComponent />
    </div>
  );
}
export default App;
*/

import "./App.css";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
// import DoctorAI from "./component/DoctorAI_gpt3";
import React, { useEffect, useRef } from "react";
import "./Alan.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { NeoVisComponent } from "./component/NeoVis";

const ENABLE_THEME = true;

const theme_red = {
  background: "#f5f8fb",
  fontFamily: "Tahoma",
  headerBgColor: "#DC143C",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#DC143C",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const theme = ENABLE_THEME ? theme_red : "";

const steps = [
  {
    id: "bot-welcome",
    message: "Welcome to Doctor AI, how can I help?",
    trigger: "search",
  },
  {
    id: "search",
    user: true,
    placeholder: "Type your question here...",
    trigger: "bot-response",
  },
  // {
  //   id: "bot-response",
  //   // component: <DoctorAI />,
  //   waitAction: true,
  //   asMessage: true,
  //   trigger: "user",
  // },
  {
    id: "bot-response",
    component: <NeoVisComponent />,
    waitAction: true,
    asMessage: true,
    trigger: "search",
  },
  {
    id: "not-bye",
    message: "Thank you. Have a great day!",
    end: true,
  },
];

function App() {
  const alanBtnContainer = useRef();
  var chatbotObject = null;
  var viz = {};
  let chatbot = (
    <ChatBot
      steps={steps}
      ref={(node) => (chatbotObject = node)}
      headerTitle="Doctor.ai"
      botAvatar="doctor.ai_trans.png"
      userAvatar="user.png"
      recognitionEnable={true}
      width="1200px"
      height="1200px"
      speechSynthesis={{ enable: false, lang: "en" }}
    />
  );

  useEffect(() => {
    alanBtn({
      key:
        "eca4f2336bb5d49d0fca2b0c9257c0252e956eca572e1d8b807a3e2338fdd0dc/prod",
      rootEl: alanBtnContainer.current,
      onCommand: (commandData) => {
        console.log(
          "----------------------------------------------------",
          "commandData",
          commandData
        );
        if (commandData.command === "neo4j-query") {
          chatbotObject.onRecognitionChange(commandData.data);
          chatbotObject.onRecognitionEnd();
        }
      },
    });
  }, [chatbot]);

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      {theme !== "" ? (
        <ThemeProvider theme={theme}> {chatbot} </ThemeProvider>
      ) : (
        chatbot
      )}

      <div ref={alanBtnContainer}></div>
    </div>
  );
}

export default App;
