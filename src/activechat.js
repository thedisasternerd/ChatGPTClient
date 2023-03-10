import React, { useState, useEffect } from 'react';
import './App.css';

function TextArea() {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      const textarea = document.querySelector('.input_bar');
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + 'px';
    }, [value]);
  
    function handleChange(event) {
      setValue(event.target.value);
    }
  
    return (
      <textarea
        className="input_bar"
        value={value}
        onChange={handleChange}
      />
    );
  }

function Activechat(){
    // Buttons


    return (<div className="activechat">
                <div className="chatinput">
                    <TextArea className="input_bar" placeholder="Type your message here"/>
                </div>
            </div>)
}

export default Activechat;