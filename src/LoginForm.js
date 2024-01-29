import React, {Component} from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ visible, onLogin, onChange, loginFormInvalid, onChangeCode, onChangeRoomName }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="animate-fadeIn h-[89%] overflow-auto">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 shadow-md w-96 mx-10">
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
            <div className="mb-6">
              <h1 className="my-2">Type Your Name</h1>
              <input
                autoFocus
                id="name"
                type="text"
                placeholder="Name"
                autoComplete="off"
                className="border rounded-md p-2 w-full outline-none"
                onChange={(event) => onChange(event.target.value)}
              />
              <h1 className="my-2">Enter Room Name</h1>
              <input
                autoFocus
                id="room"
                type="text"
                placeholder="Room Name"
                autoComplete="off"
                className="border rounded-md p-2 w-full outline-none"
                onChange={(event) => onChangeRoomName(event.target.value)}
              />
              <h1 className="my-2">Enter Room Code</h1>
              <input
                autoFocus
                id="code"
                type="text"
                placeholder="Room Code"
                autoComplete="off"
                className="border rounded-md p-2 w-full outline-none"
                onChange={(event) => onChangeCode(event.target.value)}
              />
            </div>
            <div className="flex justify-center text-center">
              <button
                disabled={loginFormInvalid}
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
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
