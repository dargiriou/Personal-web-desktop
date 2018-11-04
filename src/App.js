import React from 'react'
import './assets/css/App.css'
import Navigation from './components/Navigation'
import Chat from './components/Chat'
import MemoryGame from './components/MemoryGame'
import Calculator from './components/Calculator'
import About from './components/About'
import uuid1 from 'uuid'

/**
 * The main application in whitch most of the components will load
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @class
 * @extends React.Component
 * @param {{}} props
 */
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chat: '',
      memory: '',
      chatWindows: [],
      memoryWindows: [],
      calcWindows: [],
      topPos: 50,
      leftPos: 50
    }
  }

  /**
   * Adds the MemoryGame component to the memoryWindows array to be shown on render,
   * with a custom uid for each component added
   * and sets the username to be used as the one that exist in local storage
   */
  openMemoryApp () {
    let id = uuid1()
    let newArray = <MemoryGame id={id}
      dragStart={this.onDragStart.bind(this)}
      dragOver={this.onDragDrop.bind(this)}
      onClose={this.closeCurrentAppWindow.bind(this, id)} />
    this.setState({
      username: window.localStorage.getItem(window.localStorage.length - 1),
      memoryWindows: [...this.state.memoryWindows, newArray]
    })
  }

  /**
   * Sets the state of the localmessage to be the value of the target even on each change
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e - The onChange event of message input text
   */
  messagechangedHandler (e) {
    this.setState({ localmessage: e.target.value })
  }
  getNewWindowPos () {
    return {
      top: this.state.topPos - 5,
      left: this.state.leftPos + 5
    }
  }
  /**
   * Adds the chat component on the chatwindows array to be shown on render,
   * with a custom uid for each component added
   */
  openChatApp () {
    let id = uuid1()
    let newArray = <Chat id={id} loginId={id + 1} onClose={this.closeCurrentAppWindow.bind(this, id)}
      style={this.getNewWindowPos.bind(this)}
      dragStart={this.onDragStart.bind(this)}
      dragOver={this.onDragDrop.bind(this)} />
    this.setState({
      username: window.localStorage.getItem(window.localStorage.length - 1),
      chatWindows: [...this.state.chatWindows, newArray]
    })
  }
  /**
   * Just starts the about window without adding it to any array, therefore only one can be opened each time
   */
  openAbout () {
    let id = uuid1()
    let newArray = <About id={id}
      dragStart={this.onDragStart.bind(this)}
      dragOver={this.onDragDrop.bind(this)}
      onClose={this.closeCurrentAppWindow.bind(this, id)} />
    this.setState({
      calcWindows: [...this.state.calcWindows, newArray]
    })
  }

  /**
   * Adds the Calculator component on the calcWindows array to be shown on render,
   * with a custom uid for each component added
   */
  openCalcApp () {
    let id = uuid1()
    let newArray = <Calculator id={id}
      dragStart={this.onDragStart.bind(this)}
      dragOver={this.onDragDrop.bind(this)}
      onClose={this.closeCurrentAppWindow.bind(this, id)} />
    this.setState({
      calcWindows: [...this.state.calcWindows, newArray]
    })
  }
  /**
   * Closes the current window that the close button was pressed at dependeing on the id of that window,
   * by doing a filter on the chatWindows array to chose the correct one to close
  * @typedef {object} MouseEvent
  * @param {String} eid
  * @param {MouseEvent} e
  */
  closeCurrentAppWindow (eid, e) {
    var items = document.body.getElementsByTagName('*')
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === eid) {
        document.getElementById(eid).remove()
      }
    }
    this.setState({
      windowsArray: this.state.chatWindows.filter(chat => {
        return chat.props.eid !== eid
      })
    })
  }

  /**
   * On drag drop prevent its default action since its not handled
   * @typedef {object} DragEvent
   * @param {DragEvent} e
   */
  onDragDrop (e) { e.preventDefault() }

  /**
   * When the dragging starts, it gets the computed style and sets the data transfer data to that of the position of the window when the dragging starts
   * then sets the id in the data transfer as well, then removes the window and adds it again on the mainWindowContainer <div>
   * @typedef {object} DragEvent
   * @param {DragEvent} e
   */
  onDragStart (e) {
    let style = window.getComputedStyle(e.target, null)
    e.dataTransfer.setData('text', (parseInt(style.getPropertyValue('left')) - e.clientX) + ',' + (parseInt(style.getPropertyValue('top')) - e.clientY))
    e.dataTransfer.setData('id', e.target.id)
    e.target.remove()
    document.querySelector('div.mainWindowContainer').appendChild(e.target)
  }
  /**
   * React's build in component method to know when the component gets mounted. Here used to get the coordinates of the window and set the style to those
   * x,y positions. If the target's class name is 'navbar' a fixed position is set so that it wont overlap the navigation component.
   */
  componentDidMount () {
    document.body.ondragover = (e) => e.preventDefault()
    document.body.ondrop = (e) => {
      let xyPositions = e.dataTransfer.getData('text').split(',')
      let appContainer = document.getElementById(e.dataTransfer.getData('id'))
      appContainer.style.left = (e.clientX + parseInt(xyPositions[0])) + 'px'
      appContainer.style.top = (e.clientY + parseInt(xyPositions[1])) + 'px'
      if (e.target.className === 'navBar') {
        appContainer.style.left = '90px'
        appContainer.style.top = (e.clientY + parseInt(xyPositions[1])) + 'px'
      }
    }
  }

  /**
   * Mutation event that lets us know if something entered the DOM. Degrades the performance therefore a mutation observer would be more wise.
   * Although since its a small project this was chosen.
   * It listens for changes in DOM and if the ID of the target element is the same as the username then it changes the style of the text and if its not
   * it changes it again. This is so that the local user text should stay on the right while the rest on the left
   *
   * @typedef {object} DOMNodeInsertedEvent
   * @param {DOMNodeInsertedEvent} e
   */
  OnNodeInserted (e) {
    try {
      if (e.target.className === window.localStorage.getItem('username')) {
        document.getElementById(e.target.id).setAttribute('style',
          document.getElementById(e.target.id).getAttribute('style') + ';text-align: right; padding-right: 10px; color:khaki; font-weight: bold;')
      } else {
        document.getElementById(e.target.id).setAttribute('style',
          document.getElementById(e.target.id).getAttribute('style') + ';text-align: left;  color:chartreuse; font-weight: bold;')
      }
    } catch (err) {
      console.log('Chat text not there yet...')
    }
  }

  /**
   * React method and the only one that is required to exist in a class component.
   * Renders windows that have been submitted to their window arrays after it maps them and adds them on a new <div>
   */
  render () {
    document.querySelector('#root').addEventListener('DOMNodeInserted', this.OnNodeInserted, false)
    let windowsChat = this.state.chatWindows.length > 0 ? this.state.chatWindows.map((chat, index) =>
      <div key={index}>{chat}</div>) : null
    let windowsMemory = this.state.memoryWindows.length > 0 ? this.state.memoryWindows.map((memory, index) =>
      <div key={index}>{memory}</div>) : null
    let windowsCalc = this.state.calcWindows.length > 0 ? this.state.calcWindows.map((calc, index) =>
      <div key={index}>{calc}</div>) : null
    return (
      <div className='App'>
        <Navigation clickMemory={this.openMemoryApp.bind(this)}
          clickChat={this.openChatApp.bind(this)}
          clickCalc={this.openCalcApp.bind(this)}
          clickAbout={this.openAbout.bind(this)} />
        <div className='mainWindowContainer'>
          {windowsChat}
          {windowsMemory}
          {windowsCalc}
        </div>
      </div>
    )
  }
}
export default App
