import React from "react";
import {IoSendSharp } from 'react-icons/io5';
import { BsChatRightText  } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import { TextField } from "@mui/material";

const Chat = ({
  visible,
  onSendMessage,
  onChange,
  messages,
  messageText,
}) => {
  const userName = localStorage.getItem("userName");

  const contentContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when dynamic content changes
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (msg) => {
    const isCurrentUser = userName === msg.sender;
    if (msg.type === "JOIN") {
      return (
        <div key={msg.timeStamp} className="flex justify-center m-5">
          <div className="flex">
          <div className="px-4">
            <BsChatRightText size={30} />
          </div>
          <div>{msg.sender} logged in</div>
          </div>
        </div>
      );
    } else if (msg.type === "CHAT") {
      return (
        <div className="mx-4 my-4 flex flex-col">
            {msg.sender !== userName && <label className="mr-1 font-thin font-sans text-end" >{msg.sender}</label>}
            <div
              key={msg.timeStamp}
              className="my-2 flex"
              style={{ justifyContent: isCurrentUser ? "left" : "right" }}
            >
            <div className="p-2 flex-none max-w-[47%] break-words
            rounded-[10px] whitespace-pre-line" 
            style={{borderBottomRightRadius : isCurrentUser ? "0" : "10px",
            borderBottomLeftRadius: isCurrentUser ? "10px" : "0",
            backgroundColor: (isCurrentUser ? "rgb(134 239 172)" : "white")}} >{msg.content}</div>
          </div>
        </div>
      );
    } else if (msg.type === "LEAVE") {
      return (
        <div key={msg.timeStamp} className="flex justify-center m-5">
          <div className="flex">
              <div className="px-4">
                <BsChatRightText  size={30}/>
              </div>
            <div>{msg.sender} left chat</div>
          </div>
        </div>
      );
    }
  };

  const handleChangeText = (event) =>{
    if (event.key === 'Enter' && !event.shiftKey && !isMobile()) {
      event.preventDefault();
      onSendMessage();
    }
    else{
      onChange(event.target.value);
    }
  }

  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  return (
    <div style={{ display: visible ? "block" : "none" }} className="h-[90%] bg-slate-100 border-[1px] relative">
        <div ref={contentContainerRef} 
        className="absolute h-[77%] w-full overflow-y-scroll"
        id="messages-box"
        >
            {messages.map((msg, index) => (
              <div key={index}>{formatMessage(msg)}</div>
            ))}
        </div>
        <div className="h-full">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="h-full"
          >
            <div className="h-full py-10 mx-5 flex flex-col justify-end">
              <div className="flex justify-between relative">
              <div className="w-full">
                <TextField placeholder="Enter Text Here..."
                   multiline
                   maxRows={2}
                   fullWidth
                   autoFocus
                   value={messageText}
                   id="message-box"
                   sx={{paddingRight:'4rem'}}
                   onChange={handleChangeText}
                   onKeyDown={handleChangeText}
                />
                
              </div>
              <div className="absolute float-right right-1 bottom-1">
                <div className="cursor-pointer px-2 py-2" onClick={() => {
                    onSendMessage();
                  }}>
                  <IoSendSharp size={30}/> 
                </div>
              </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Chat;
