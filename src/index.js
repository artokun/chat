import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

var config = {
  apiKey: 'AIzaSyA1YkKkLxEfVEE7VFUJTOEVGYXqXHnU19U',
  authDomain: 'chat-39558.firebaseapp.com',
  databaseURL: 'https://chat-39558.firebaseio.com',
  projectId: 'chat-39558',
  storageBucket: '',
  messagingSenderId: '108576255852'
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
