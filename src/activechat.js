import React, { useState, useEffect, useRef } from 'react';
import {BsSend} from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {api_params} from './api_settings.js';
import './App.css';
import './chatresponse.css';
import { GridLoader } from 'react-spinners';



function FormContainer() {
  // State to store the list of containers
  const [containers, setContainers] = useState([]);
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestUserMessage, setLatestUserMessage] = useState(''); 

  // Add this ref
  const latestAgentMessageRef = useRef();

  useEffect(() => {

    const textarea = document.querySelector('.input_bar');
    const chatinput = document.querySelector('.chatinput');
    const chathistorymargin = document.querySelector('.chathistory');
    const submitbutton = document.querySelector('.submit');
    
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      chatinput.style.height = `${textarea.scrollHeight}px`;
      // set the margin of the chat history to the height of the chatinput
      chathistorymargin.style.marginBottom = `${textarea.clientHeight + 10}px`;
    };

    const resetHeight = () => {
      textarea.style.height = '20px';
      chatinput.style.height = textarea.style.height;
      // set the margin of the chat history to the height of the chatinput
      chathistorymargin.style.marginBottom = `${60}px`;
    };

    textarea.addEventListener('input', adjustHeight);
    textarea.addEventListener('keydown', adjustHeight);
    submitbutton.addEventListener('click', resetHeight);

    return () => {
      textarea.removeEventListener('input', adjustHeight);
      textarea.removeEventListener('keydown', adjustHeight);
      submitbutton.removeEventListener('click', adjustHeight);
    };
  }, []);

  useEffect(() => {
    const chathistory = document.querySelector('.chathistory');
    chathistory.scrollTop = chathistory.scrollHeight;
  }, [containers, value]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddContainer(event);
    }
  }
  
  useEffect(() => {
    const chathistory = document.querySelector('.chathistory');
    chathistory.scrollTop = chathistory.scrollHeight;
  }, [response]);


  async function handleRegenerateResponse() {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            "model": api_params.model,
            "temperature": api_params.temperature,
            "max_tokens": api_params.max_tokens,
            "top_p": api_params.top_p,
            "n": api_params.n,
            "presence_penalty": api_params.presence_penalty,
            "frequency_penalty": api_params.frequency_penalty,
            "stop": api_params.stop,
            "messages": [{ "role": "user", "content": latestUserMessage }],
          },
        }),
      });
      setIsSubmitting(false);
      const data = await res.json();
      setResponse(data.choices[0].message.content);
      latestAgentMessageRef.current.innerHTML = data.choices[0].message.content; // Update the agent message
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    }
  }

  // Define the handleSubmit function outside handleAddContainer  
  
  
  // Event handler for adding a new container
  async function handleAddContainer(event) {
    // Call handleSubmit with the event object
    try{
      setIsSubmitting(true);
      setLatestUserMessage(value);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            "model": api_params.model,
            "temperature": api_params.temperature,
            "max_tokens": api_params.max_tokens,
            "top_p": api_params.top_p,
            "n": api_params.n,
            "presence_penalty": api_params.presence_penalty,
            "frequency_penalty": api_params.frequency_penalty,
            "stop": api_params.stop,
            "messages": [{"role": "user", "content": value}]
          },
        }),
      });
      setIsSubmitting(false);
      const data = await res.json();
      setResponse(data.choices[0].message.content);
    const newContainer = (
      <div className="chatblock">
        <div className="usercontainer">
          <div className="useridentifier">
            <text >🧔</text>
          </div>
          <div className="usermessage">
            {value}
          </div>
        </div>
        <div className="agentcontainer">
          <div className="agentidentifier">
            <text>🤖</text>
          </div>
          <div className="agentmessage" ref={latestAgentMessageRef}>
            <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]} children={data.choices[0].message.content} />
          </div>
        </div>
      </div>
    );
   
    setValue("");
    setContainers([...containers, newContainer]);
    }
    catch(err){
      console.log(err);
      setIsSubmitting(false);
    }
  }

  // Event handler for submitting the bottom form
  function handleBottomFormSubmit(e) {
    e.preventDefault();
    // Code to handle bottom form submission
  }

  return (
    <div className="activechat">
      <div className="topbar">
        🤖 
      </div>

      {/* List of containers */}
      <div className="chathistory">
        {containers}
      </div>

      {/* Bottom form */}
      <div>
        <form onSubmit={handleBottomFormSubmit}>
          {/* Code to render bottom form */}
          <div className="chatinput">
              <textarea className="input_bar" value={value} onChange={handleChange} onKeyDown={handleEnter}/>
              <button className="submit" onClick={handleAddContainer} disabled={isSubmitting | value === ''}>
                {(isSubmitting ) ? (
                  <GridLoader className="icon" size={6} color={"#ffffff"} />
                ) : (
                  <BsSend className="icon" />
                )}
              </button>
              <button className="regenerate-btn" onClick={handleRegenerateResponse} disable={latestUserMessage === ''}>
                <TfiReload className="icon"/>
              </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

function Activechat(){
    // Buttons


    return (<FormContainer/>)
}

export default Activechat;