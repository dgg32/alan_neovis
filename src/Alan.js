import React, { useEffect, useRef } from 'react';
import './Alan.css';
import alanBtn from "@alan-ai/alan-sdk-web";

function Alan() {
  const alanBtnContainer = useRef();
  const logoEl = useRef();

  useEffect(() => {
    alanBtn({
      key: '4d292cf043b0a2ea4d0bf347580da6fd2e956eca572e1d8b807a3e2338fdd0dc/prod',
      rootEl: alanBtnContainer.current,
      onCommand: (commandData) => {
        //console.log("commandData", commandData);
        // if (commandData.command === 'command-example') {
        //   if (logoEl.current) {
        //       logoEl.current.style.transform = 'rotate(180deg)';
        //   }
        // }
      },
      onEvent: function (e) {
        switch (e.name) {
          case "recognized":
            console.info('Interim results:', e.text);
            break;
          case "parsed":
            console.info('Final result:', e.text);
            break;
          case "text":
            console.info('Alan reponse:', e.text);
            break;
          default:
            console.info('Unknown event');
        }
      }
    });
  }, []);

  return <div className="Alan">
    <header className="App-header">
      <ul>
        <li>Say: "Hi!"</li>
        <li>Say: "Execute command"</li>
      </ul>
    </header>
    <div ref={alanBtnContainer}></div>
  </div>;
}

export default Alan;
