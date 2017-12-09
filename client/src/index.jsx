import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
let socket = io('localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: 'Alan',
      userNameInput: '',
      input: '',
      messages: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSetUser = this.handleSetUser.bind(this);
  }

  componentDidMount() {
    socket.on('newMessage', (data) => {
      this.setState({
        messages: [data].concat(this.state.messages)
      });
    });
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSend() {
    socket.emit('sent', {
      user: this.state.user,
      body: this.state.input
    });
    this.setState({
      input: ''
    });
  }

  handleUserChange(event) {
    this.setState({
      userNameInput: event.target.value
    });
  }

  handleSetUser() {
    this.setState({
      user: this.state.userNameInput,
      userNameInput: ''
    });
  }



  render () {
    return (
    <div>
      <h1>Hi {this.state.user}, Welcome to Entelo Chat Room!</h1>
      <input value={this.state.userNameInput} onChange={this.handleUserChange} />
      <button type="button" onClick={this.handleSetUser}>Set New User Name</button>
      <br/>
      <input value={this.state.input} onChange={this.handleInputChange} />
      <button type="button" onClick={this.handleSend}>Send</button>
      <Messages messages={this.state.messages} />
    </div>
    );
  }
}

var Message = (props) => {
  return (
    <div>
      <div>{props.message.user} : </div>
      <div>{props.message.body}</div>
      <br/>
    </div>
  );
}

var Messages = (props) => {
  return (
    <div>
      {props.messages.map((message, i) => {
        return <Message message={message} key={i}/>
      })}
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));