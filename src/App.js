import React, {Component} from 'react';
import LoginForm from './LoginForm.js';
import Header from "./Header";
import Chat from "./Chat";
import SockJsClient from 'react-stomp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            messageText: '',
            userName: null,
            uniqueCode : null,
            roomName : null,
            messages: [

        ],
            loginFormInvalid: true,
        }
    }

    base_uri = process.env.REACT_APP_BASE_API;

    handleLogin = () => {
        if (this.state.userName && this.state.uniqueCode && this.state.roomName) {
            localStorage.setItem('userName',this.state.userName);
            this.setState({loggedIn: true});
            this.clientRef.sendMessage(`/app/chat.addUser`,
                JSON.stringify({sender: this.state.userName, roomName : this.state.roomName, roomCode : this.state.uniqueCode}));
        } else {
            this.setState({loginFormInvalid: true})
        }
    };

    handleLogout = () => {
        this.setState({
            loggedIn: false,
            messages: []
        });
        this.clientRef.disconnect();
        this.clientRef.connect();
    }

    handleMessageSend = () => {
        if (this.state.userName) {
            this.clientRef.sendMessage(`/app/chat.sendMessage`,
                JSON.stringify({sender: this.state.userName, content: this.state.messageText, type: 'CHAT',
                 roomName : this.state.roomName, roomCode: this.state.uniqueCode}));
            this.setState({messageText: ''});
        }
    }

    handleChange = (name,value)  => {
        this.setState({
            [name]: value,
        });
    };

    handleChangeUserName = (value) => {
        this.setState({
            userName: value,
            loginFormInvalid: value.length < 3,
        });
    }

    handleMessageReceived = msg => {
        this.setState({messages: this.state.messages.concat(msg)});
    }

    handleChangeCode = code =>{
        this.setState({
            uniqueCode: code,
        });
    }

    handleChangeRoomName = name =>{
        this.setState({
            roomName : name,
        })
    }

    render() {
        const visibleLoginForm = !this.state.loggedIn;
        const visibleLogout = this.state.loggedIn;

        return (
            <div className="h-screen">
                <SockJsClient url={`${this.base_uri}/ws`} topics={[`/topic/${this.state.roomName}/${this.state.uniqueCode}`]}
                              onMessage={(msg) => this.handleMessageReceived(msg)}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
                <Header onLogout={() => this.handleLogout()} showLogout={visibleLogout}></Header>
                <LoginForm visible={visibleLoginForm}
                           loginFornInvalid={this.state.loginFormInvalid}
                           onLogin={() => this.handleLogin()}
                           onChange={(value) => {this.handleChangeUserName(value)}}
                           onChangeRoomName={(name) => {this.handleChangeRoomName(name)}}
                           onChangeCode={(code)=> this.handleChangeCode(code)}> </LoginForm>
                <Chat visible={!visibleLoginForm}
                      messages={this.state.messages}
                      messageText={this.state.messageText}
                      onChange={(value) => this.handleChange('messageText',value)}
                      onSendMessage={() => this.handleMessageSend()}></Chat>
            </div>
        );
    }

}

export default App;