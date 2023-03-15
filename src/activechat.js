import React, { useState, useEffect } from 'react';
import {BsSend} from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import './chatresponse.css';


function FormContainer() {
  // State to store the list of containers
  const [containers, setContainers] = useState([]);
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');

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
      chathistorymargin.style.marginBottom = `${48}px`;
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


  // Define the handleSubmit function outside handleAddContainer  
  
  
  // Event handler for adding a new container
  async function handleAddContainer(event) {
    // Call handleSubmit with the event object
    try{

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + "API-KEY"
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": value}]
        })
      });
      const data = await res.json();
      setResponse(data.choices[0].message.content);
      console.log(data);
      console.log(response);
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
          <div className="agentmessage">
            <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]} children={data.choices[0].message.content} />
            {/* <text>{data.choices[0].message.content}</text> */}
          </div>
        </div>
      </div>
    );
   
    setValue("");
    setContainers([...containers, newContainer]);
    }
    catch(err){
      console.log(err);
    }
  }

  // Event handler for submitting the bottom form
  function handleBottomFormSubmit(e) {
    e.preventDefault();
    // Code to handle bottom form submission
  }

  return (
    <div className="activechat">
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
              <button className="submit" onClick={handleAddContainer} ><BsSend className="icon"/></button>
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