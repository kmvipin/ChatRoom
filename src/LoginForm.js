import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  visible,
  onLogin,
  onChange,
  loginFormInvalid,
  onChangeCode,
  onChangeRoomName,
}) => {
  const [sentences] = useState([
    "the Chat Now",
    "with your friends",
  ]);
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const typingSpeed = 150;

  useEffect(() => {
    if (index === sentences.length) {
      setTimeout(() => {
        setDisplay("");
        setIndex(0);
      }, 100); // wait for 2 seconds before starting from the first sentence again
      return;
    }

    if (subIndex === sentences[index].length) {
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setDisplay("");
        setSubIndex(0);
      }, 1000); // wait for 2 seconds before starting next sentence
      return;
    }

    if (subIndex < sentences[index].length) {
      setTimeout(() => {
        setDisplay((prev) => prev + sentences[index][subIndex]);
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);
    }
  }, [display, subIndex, index]);
  if (!visible) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div
        key="1"
        className="grid max-w-sm gap-4 px-4 mx-auto lg:max-w-none lg:grid-cols-2 xl:gap-8"
      >
        <div className="space-y-2 " style={{ fontFamily: "Inter" }}>
          <h1 className="text-4xl font-extrabold tracking-tighter">
            {'Join '+display}
          </h1>
          <p
            className="text-gray-500 dark:text-gray-400"
            style={{ font: "caption", fontSize: "18px" }}
          >
            Enter your name, the room name, and the room code to join the chat.
          </p>
        </div>
        <form
          id="loginForm"
          name="loginForm"
          onSubmit={(event) => {
            if (!loginFormInvalid) {
              onLogin();
            }
            event.preventDefault();
          }}
        >
          <div className="space-y-4 mt-8">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                id="name"
                placeholder="Enter your name"
                className="border-[1px] border-solid border-gray-300 p-2 rounded-md 
          hover:border-gray-500 focus:border-gray-500 outline-none"
                onChange={(event) => onChange(event.target.value)}
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="room-name" className="font-medium">
                Room Name
              </label>
              <input
                id="room-name"
                placeholder="Enter the room name"
                className="border-[1px] border-solid border-gray-300 p-2 rounded-md
           hover:border-gray-500 focus:border-gray-500 outline-none"
                onChange={(event) => onChangeRoomName(event.target.value)}
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="room-code" className="font-medium">
                Room Code
              </label>
              <input
                id="room-code"
                placeholder="Enter the room code"
                className="border-[1px] border-solid border-gray-300 p-2 rounded-md
           hover:border-gray-500 focus:border-gray-500 outline-none"
                onChange={(event) => onChangeCode(event.target.value)}
              />
            </div>
            <button
              className="w-full text-white bg-black h-10 
            rounded-md hover:bg-gray-800"
              type="submit"
              disabled={loginFormInvalid}
            >
              Join Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loginFormInvalid: PropTypes.bool,
};

export default LoginForm;
