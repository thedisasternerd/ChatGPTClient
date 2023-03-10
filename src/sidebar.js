import React, { useState } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {BsFolderPlus} from 'react-icons/bs';
import {GrSettingsOption} from 'react-icons/gr';
import {FaBars} from 'react-icons/fa';
import './App.css';


function Sidebar(){
    // Buttons

    return (<div className="sidemenu">
                <div className="topbar">
                    <button className="collapse_bars"> <FaBars className="icon"/> </button>
                   <input className="search_bar" type="text" placeholder="Search"/>
                </div>
                <div className="menuitems">
                    <button className="new_chat"> 
                        <AiOutlinePlus className="icon"/> 
                        <span class="button-text">New Chat</span>
                    </button>
                    <button className="new_folder"> <BsFolderPlus className="icon"/> </button>
                    <button className="settings"> <GrSettingsOption className="icon"/> </button>
                </div>
            </div>)
}

export default Sidebar;