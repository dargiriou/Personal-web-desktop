import React, { Component } from 'react'
/**
 * Chat component, utilizes web socket
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @class
 * @extends React.Component
 * @param {{}} props
 */
class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messagesArray: [],
      username: '',
      channel: '',
      server: new window.WebSocket('ws://vhost3.lnu.se:20080/socket/'),
      settings: false,
      blacklist: false,
      blackListedUsers: [],
      mutedUserTextInput: '',
      unMutedUserTextInput: ''
    }
  }

  /**
   * When component gets mounted, parses the local storage item blacklist and adds it to a state array.
   * Then iniates the connection to the server and the appropriate methods to know when a message is received
   * or an error has happened.
   */
  componentDidMount () {
    let temp = JSON.parse(window.localStorage.getItem('Blacklist'))
    if (window.localStorage.getItem('Blacklist') != null) {
      this.setState({
        blackListedUsers: temp
      })
    }
    this.state.server.onopen = () => {
      //  console.log('connected')
    }
    this.state.server.onerror = (err) => {
      console.log(err)
    }

    this.state.server.onmessage = (response) => {
      let message = (JSON.parse(response.data))
      if (message.type !== 'heartbeat') {
        if (!this.state.blackListedUsers.includes(message.username)) {
          this.setState(prevState => ({
            messagesArray: [...prevState.messagesArray, message]
          }))
        }
      }
    }
  }

  /**
   *Method that checks if the component is updated so that it can scroll the div approprietly.
   */
  componentDidUpdate () {
    try {
      var messageList = document.getElementById('messageList')
      messageList.scrollTop = messageList.scrollHeight
    } catch (err) {
      console.log('Not the component we want to check the scroll height at!')
    }
  }

  /**
   * Method to send the message to the server. Passing and id value to check the text of the current chat.
   * @typedef {Object} KeyboardEvent
   * @param {String} eid
   * @param {KeyboardEvent} e
   */
  sendWithEnter (e) {
    console.log(e.target.id)
    if (e.key === 'Enter') {
      let text = document.getElementById(e.target.id)
      if (text.value !== '') {
        //  console.log(this.state.username)
        this.state.server.send(JSON.stringify({
          type: 'message',
          data: text.value,
          username: window.localStorage.getItem('username'),
          channel: window.localStorage.getItem('channel'),
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }))
        text.value = ''
      }
    }
  }

  /**
   * Method to send the message to the server. Passing and id value to check the text of the current chat.
   * @typedef {Object} MouseEvent
   * @param {String} eid
   * @param {MouseEvent} e
   */
  sendWithClick (eid, e) {
    console.log('id')
    console.log(eid)
    let text = document.getElementById(eid)
    if (text.value !== '') {
      //  console.log(this.state.username)
      this.state.server.send(JSON.stringify({
        type: 'message',
        data: text.value,
        username: window.localStorage.getItem('username'),
        channel: window.localStorage.getItem('channel'),
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }))
      text.value = ''
    }
  }

  /**
   * Method to set the settings state to true or false depending if we want the settings screen to show or not.
   */
  onSettings () {
    if (this.state.settings === true) {
      this.setState({
        settings: false,
        blacklist: false
      })
    } else if (this.state.settings === false) {
      this.setState({
        settings: true,
        blacklist: false
      })
    }
  }

  /**
   * Method to set the blacklist state to true or false depending if we want the blacklist screen to show or not.
   */
  openBlackList () {
    if (this.state.blacklist === true) {
      this.setState({
        blacklist: false,
        settings: false
      })
    } else if (this.state.blacklist === false) {
      this.setState({
        blacklist: true,
        settings: false
      })
    }
  }

  /**
   * Method that handles the username and channel setting as well as persistency to the local storage
   * of the browser.
   * If nothing was input the the Anonymous name will be set for the user.
   */
  handleUserAndChannel () {
    if (this.state.username != null) {
      if (!this.state.username.length <= 0) {
        window.localStorage.setItem('username', this.state.username)
        window.localStorage.setItem('channel', this.state.channel)
        this.setState({
          blacklist: false,
          settings: false
        })
      } else {
        window.localStorage.setItem('username', 'Anonymous')
        this.setState({
          blacklist: false,
          settings: false
        })
      }
    } else {
      window.localStorage.setItem('username', 'Anonymous')
      this.setState({
        blacklist: false,
        settings: false
      })
    }
  }

  /**
   * Sets the state of the username to be the value of the target of the onChange event on the text input
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e
   */
  namechangedHandler (e) {
    this.setState({ username: e.target.value })
    // console.log(e.target.value)
  }
  /**
   * Sets the state of the channel to be the value of the target of the onChange event on the text input
   * @typedef {object} onChangeEvent
   * @param {event} e
   */
  channelChangedHandler (e) {
    this.setState({ channel: e.target.value })
    console.log(e.target.value)
  }

  /**
   * Method that adds a user to the blacklist.
   */
  addUserToBlackList () {
    let promise = new Promise(resolve => {
      resolve(this.setState(previousState => ({
        blackListedUsers: [...previousState.blackListedUsers, this.state.mutedUserTextInput]
      })))
    })

    promise.then(() => window.localStorage.setItem('Blacklist', JSON.stringify(this.state.blackListedUsers)))
  }

  /**
   * Method to save the state of the target value of the mute input triggered by the onChange event
   * @typedef {object} onChangeEvent
   * @param {event} e
   */
  handleMutedUserTextInput (e) {
    this.setState({
      mutedUserTextInput: e.target.value
    })
  }

  /**
   * Method to save the state of the target value of the unmute input triggered by the onChange event
   * @typedef {object} onChangeEvent
   * @param {event} e
   */
  handleUnMutedUserTextInput (e) {
    this.setState({
      unMutedUserTextInput: e.target.value
    })
  }

  /**
   * Method that removes a user from the blacklist.
   */
  removeUserFromTheBlackList () {
    var temp = [...this.state.blackListedUsers]
    var index = temp.indexOf(this.state.unMutedUserTextInput)
    temp.splice(index, 1)
    let promise = new Promise(resolve => {
      resolve(this.setState(previousState => ({
        blackListedUsers: temp
      })))
    })

    promise.then(() => window.localStorage.setItem('Blacklist', JSON.stringify(this.state.blackListedUsers)))
  }

  /**
   * Render method to show either the blacklist screen, the actual chat or the settings screen.
   */
  render () {
    return (
      <div className='masterContainer' id={this.props.id} draggable='true' onDragStart={this.props.dragStart}>
        <div className='line'>
          <img id='chatImg' src='src/assets/Images/Chat_Images/chat.png' draggable='false' />
          <button id='blacklist' onClick={this.openBlackList.bind(this)} title='Open the blacklist' />
          <button id='closeBtn' onClick={this.props.onClose} title='Close the chat' />
          <button id='settingsBtn' onClick={this.onSettings.bind(this)} title='Change username and/or channel' />
          {this.state.blacklist && <div>
            <input type='text' id='muteUserInput' placeholder='Mute a user' onChange={this.handleMutedUserTextInput.bind(this)} />
            <button id='muteBtn' title='Mute a user' onClick={this.addUserToBlackList.bind(this)}>Mute</button>
            <input type='text' id='unMuteUserInput' placeholder='Unmute a user' onChange={this.handleUnMutedUserTextInput.bind(this)} />
            <button id='unmute' title='Unmute a user' onClick={this.removeUserFromTheBlackList.bind(this)}>Unmute</button>
            <div id='mutedUsersList'>
              {this.state.blackListedUsers.map((blackListedUser, index) =>
                <div className={blackListedUser} id={blackListedUser + index} key={index}>{blackListedUser} <br />
                </div>)}
            </div>
          </div>}
          {this.state.settings && <div className='login'>
            <input type='text' id='username' placeholder='username' onChange={this.namechangedHandler.bind(this)} />
            <input type='text' id='channel' placeholder='channel' onChange={this.channelChangedHandler.bind(this)} />
            <button id='connectBtn' title='Connect to the server..' onClick={this.handleUserAndChannel.bind(this)} >Connect</button>
          </div>}
        </div>
        <div id='messageList'>
          {this.state.messagesArray.map((message, index) =>
            <div className={message.username} id={message.username + index} key={index}>{message.username}
              <div className='messageText' id='gg' key={index}>{message.data} </div><br />
            </div>)}
        </div>
        <input className='newMessage'type='text' id={this.props.id + 2} placeholder='Enter a message' onKeyPress={this.sendWithEnter.bind(this)} />
        <button id='sendBtn' onClick={this.sendWithClick.bind(this, this.props.id + 2)}>Send</button>
      </div>
    )
  }
}
export default Chat
