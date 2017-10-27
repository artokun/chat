import React, { Component } from 'react'
import firebase from 'firebase'
const provider = new firebase.auth.GoogleAuthProvider()

class App extends Component {
  state = {
    message: '',
    messages: {},
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.setState({ user })
      }
      this.setState({ user: false })
    })

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
    this.messagesRef.push({
      text: this.state.message,
      user: this.state.user.displayName || 'anon'
    })
    this.setState({ message: '' })
  }

  handleAuth() {
    if (this.state.user) {
      return firebase.auth().signOut()
    }
    firebase.auth().signInWithPopup(provider)
  }

  handleClear() {
    firebase
      .database()
      .ref('messages')
      .set([])
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
        <button onClick={this.handleAuth.bind(this)}>
          {this.state.user ? 'Sign Out' : 'Sign In'}
        </button>
        <button onClick={this.handleClear.bind(this)}>Clear Chat</button>
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
