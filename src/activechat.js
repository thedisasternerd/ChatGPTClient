import React, { useState, useEffect } from 'react';
import {BsSend} from 'react-icons/bs';
import './App.css';


function FormContainer() {
  // State to store the list of containers
  const [containers, setContainers] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const textarea = document.querySelector('.input_bar');
    const chatinput = document.querySelector('.chatinput');
    const chathistorymargin = document.querySelector('.chathistory');
    
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      // chatinput.style.height = 'auto';
      chatinput.style.height = `${textarea.scrollHeight}px`;
      // set the margin of the chat history to the height of the chatinput
      chathistorymargin.style.marginBottom = `${textarea.clientHeight + 10}px`;
      
    };

    textarea.addEventListener('input', adjustHeight);
    textarea.addEventListener('keydown', adjustHeight);

    return () => {
      textarea.removeEventListener('input', adjustHeight);
      textarea.removeEventListener('keydown', adjustHeight);
    };
  }, []);

  useEffect(() => {
    const chathistory = document.querySelector('.chathistory');
    chathistory.scrollTop = chathistory.scrollHeight;
  }, [containers, value]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  // Event handler for adding a new container
  function handleAddContainer() {
    const newContainer = (<div className="chatblock">
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
                                  <text className="message">{value}</text>
                                </div>
                              </div>
                          </div>
                          );
    setValue("");
    setContainers([...containers, newContainer]);
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
              <textarea className="input_bar" value={value} onChange={handleChange}/>
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