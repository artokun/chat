import React, { Component } from 'react'
import firebase from 'firebase'

class App extends Component {
  state = {
    message: '',
    messages: {}
  }

  componentDidMount() {
    const db = firebase.database()
    this.messagesRef = db.ref('messages')

    this.messagesRef.on('value', snapshot => {
      this.setState({
        messages: snapshot.val()
      })
    })
  }

  handleInput({ target: { value } }) {
    this.setState({ message: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.messagesRef.push({ text: this.state.message, user: 123 })
    this.setState({ message: '' })
  }

  renderMessages() {
    const { messages } = this.state
    if (messages && Object.keys(messages).length) {
      return Object.keys(messages).reduce((carry, key) => {
        carry.push(
          <li key={key}>
            {messages[key].user}: {messages[key].text}
          </li>
        )
        return carry
      }, [])
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleInput.bind(this)}
          />
          <input type="submit" />
        </form>
        <div className="results"> {this.renderMessages()}</div>
      </div>
    )
  }
}

export default App
