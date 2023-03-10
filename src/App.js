// Create a react component that inputs a text area message then performs a POST request to the 
// https://api.openai.com/v1/chat/completions, gets the response as choices[0].message.content in the text area below..
// The example request is curl https://api.openai.com/v1/chat/completions \  -H 'Content-Type: application/json' \  -H 'Authorization: Bearer YOUR_API_KEY' \  -d '{  "model": "gpt-3.5-turbo",  "messages": [{"role": "user", "content": "Hello!"}]}'

import React, { useState } from 'react';
import Sidebar from './sidebar';
import Activechat from './activechat';
import './App.css';

function App() {
    // const [message, setMessage] = useState('');
    // const [response, setResponse] = useState('');
    // const new_chat = (<svg className="buttons" viewBox="0 0 24 24">
    //                     <path className="icon" 
    //                         d="M9 12h3m3 0h-3m0 0V9m0 3v3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 
    //                         2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22z" />
    //                 </svg>)
                    
    // const new_folder = (<svg className="buttons" viewBox="0 0 24 24">
    //                         <path className='icon'
    //                             d="M18 6h2m2 0h-2m0 0V4m0 2v2M21.4 20H2.6a.6.6 0 01-.6-.6V11h19.4a.6.6 0 01.6.6v7.8a.6.6 0
    //                             01-.6.6zM2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H14" />
    //                     </svg>)
    
    // const menu = (<svg className="buttons" viewBox="0 0 24 24">
    //                 <path className="icon" d="M3 5h18M3 12h18M3 19h18" />
    //             </svg>)
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch('https://api.openai.com/v1/chat/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': "Bearer " + "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"
    //             },
    //         body: JSON.stringify({
    //             "model": "gpt-3.5-turbo",
    //             "messages": [{"role": "user", "content": message}]
    //         }
    //         )
    //     })
    //     .then( res => res.json() )
    //     .then( data => {
    //         setResponse(data.choices[0].message.content);
    //     })
    //     .catch(err => console.log(err));
    // }

    return (
        <div className="App">
            <Sidebar />
            <Activechat />

        </div>
    );
}

export default App;
