import React from 'react'
import GameContent from './GameContent'
/**
 * MemoryGame component, dynamically includes the GameContent as a child component
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @class
 * @extends React.Component
 * @param {{}} props
 */
class MemoryGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tiles: [],
      selectedRadio: '4, 4',
      selectedRadioDiff: 'medium',
      showGameOnNot: false,
      checked: true,
      a: '',
      img: '',
      turn1: '',
      turn2: '',
      lastTile: '',
      pair: 0,
      tries: 0,
      playerName: '',
      score: 0,
      tryAgain: false
    }
  }
  /**
  * Gets the value of the radio button on change and sets the state of the variable that will hold its value
  * @typedef {object} onChangeEvent
  * @param {onChangeEvent} e
  */
  radioButtonsinput (e) {
    this.setState({
      selectedRadio: e.target.value
    })
  }
  difRadioButtonsinput (e) {
    this.setState({
      selectedRadioDiff: e.target.value
    })
  }
  /**
   * Set state of showGameOrNot to true so that it will only render the game
   */
  startGame () {
    this.setState({
      showGameOnNot: true
    })
  }
  /**
   * Set state of showGameOrNot to true so that it will only render the settings
   */
  onRestart () {
    this.setState({
      showGameOnNot: false
    })
    try {
      document.getElementsByClassName('pauseResumeBtns').style.display = 'block'
    } catch (err) {
      console.log('¯\\_(ツ)_/¯')
    }
  }

  handlePlayerName (e) {
    this.setState({
      playerName: e.target.value
    })
  }
  /**
   * React's render method, here will either render the settings or the game content containers depending on
   * showGameOnNot
   */
  render () {
    return (
      <div className='masterContainer' id={this.props.id} draggable='true' onDragStart={this.props.dragStart}>
        <div className='line'>
          <img id='memorygameImg' src='src/assets/Images/Memory_Game_Images/memory.png' draggable='false' />
          <button id='closeBtn' onClick={this.props.onClose} title='Close the game' />
          <div style={{ display: 'none' }} id={this.props.settings} className='login'>
            <button id='applySettings' title='Apply new settings' onClick={this.props.connect} >Apply</button>
          </div>
        </div>{!this.state.showGameOnNot &&
        <div id='selectGame'>
          <table>
            <tbody>
              <tr>
                <td><input type='radio' name='radio'
                  onChange={this.radioButtonsinput.bind(this)}
                  value={'2, 3'}
                /><label>2 x 3</label></td>
                <td><input type='radio' name='radio'
                  onChange={this.radioButtonsinput.bind(this)}
                  value={'2, 4'} /><label>2 x 4</label></td>
                <td><input type='radio' name='radio'
                  onChange={this.radioButtonsinput.bind(this)}
                  value={'4, 4'} /><label>4 x 4</label></td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td><input type='radio' name='diff'
                  onChange={this.difRadioButtonsinput.bind(this)}
                  value={'easy'}
                /><label>Easy</label></td>
                <td><input type='radio' name='diff'
                  onChange={this.difRadioButtonsinput.bind(this)}
                  value={'medium'} /><label>Medium</label></td>
                <td><input type='radio' name='diff'
                  onChange={this.difRadioButtonsinput.bind(this)}
                  value={'hard'} /><label>Hard</label></td>
              </tr>
            </tbody>
          </table>
          <button id='submitGameSel' onClick={this.startGame.bind(this)}>Start</button>
        </div>}
        {this.state.showGameOnNot &&
        <div id='game' >
          <GameContent rowCols={this.state.selectedRadio}
            difficulty={this.state.selectedRadioDiff}
            tryAgain={this.onRestart.bind(this)} />
        </div>}
      </div>
    )
  }
}

export default MemoryGame
