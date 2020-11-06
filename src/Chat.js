import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert,InsertEmoticon,SearchOutlined } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic"
import React,{useState} from 'react';
import axios from './axios';
import "./Chat.css";
function Chat({ messages }) {

    const[input,setInput]= useState("");

    const sendMessage = async(e) =>{
        e.preventDefault();
        await axios.post("/messages/new",{
            message:input,
            name:"DEMO APP",
            timestamp:"Just now",
            received:false,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>

                <div className="chat__headerInfo">
                <h3>User name</h3>
                    <p>Last Seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined/></IconButton>
                    <IconButton><AttachFile/></IconButton>
                    <IconButton><MoreVert/></IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    {message.message}
                    <span className="chat__timeStamp">{message.timestamp}
                    </span>
                    </p>))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input}
                    onChange={(e)=> setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text"/>
                    <button onClick={sendMessage}
                    type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
}
export default Chat;
