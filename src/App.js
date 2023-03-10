// Create a react component that inputs a text area message then performs a POST request to the 
// https://api.openai.com/v1/chat/completions, gets the response as choices[0].message.content in the text area below..
// The example request is curl https://api.openai.com/v1/chat/completions \  -H 'Content-Type: application/json' \  -H 'Authorization: Bearer YOUR_API_KEY' \  -d '{  "model": "gpt-3.5-turbo",  "messages": [{"role": "user", "content": "Hello!"}]}'

// import React, { useState } from 'react';
// import Sidebar from './sidebar';
import Activechat from './activechat';
import './App.css';

function App() {
    return (
        <div className="App">
            {/* <Sidebar /> */}
            <Activechat />

        </div>
    );
}

export default App;
