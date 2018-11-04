import React from 'react'
import * as math from 'mathjs'
/**
 * Calculator/binary converter component
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @class
 * @extends React.Component
 * @param {{}} props
 */
class Calculator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      divide: '/',
      minus: '-',
      plus: '+',
      multiply: '*',
      equals: '=',
      point: '.',
      square: '',
      mod: '%',
      ce: '',
      backspace: '',
      input: '',
      calculations: '',
      toggleState: false,
      binaryFeedback: '',
      decimalFeedback: '',
      hexFeedback: '',
      focus: true
    }
  }

  /**
   * Method to add the button value to the input state.
   *@typedef {object} MouseEvent
   * @param {MouseEvent} e
   */
  addButtonValueToInput (e) {
    this.setState({
      input: this.state.input + e.target.value
    })
  }
  /**
   * Method to watch the event's target value in case it goes over the length of 36 so that it will hide the overflow.
   * I guess it could also be done permanently through css.
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e
   */
  getScreenValue (e) {
    if (e.target.value.length > 36) { e.target.setAttribute('style', 'overflow: hidden;') }
  }
  /**
   *Method to solve what is stored on the input state variable.
   */
  handleEqualBtn () {
    if (this.state.input.length < 24) {
      this.setState({
        calculations: this.state.input,
        input: math.eval(this.state.input)
      })
    } else {
      this.setState({
        calculations: 'The result is:',
        input: math.eval(this.state.input)
      })
    }
  }
  /**
   * Method to clear all input text.
   */
  handleAllClear () {
    this.setState({
      input: '',
      calculations: '',
      binaryFeedback: '',
      decimalFeedback: '',
      hexFeedback: ''
    })
  }

  /**
   * Handler method for the backspace usability to delete the last character on the input.
   */
  handleBackSpace () {
    this.setState({
      input: this.state.input.substr(0, this.state.input.length - 1)
    })
  }

  /**
   * Setting toggle state true or false to swap between calculator and converter in the render
   */
  toggleSwitch () {
    if (!this.state.toggleState) {
      this.setState({
        toggleState: true
      })
    } else {
      if (this.state.toggleState) {
        this.setState({
          toggleState: false
        })
      }
    }
    this.handleAllClear()
  }

  /**
   * Updates the binaryFeedback state when an on change event is fired, with the event target value
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e
   */
  handleBinaryFeedback (e) {
    this.setState({
      binaryFeedback: e.target.value
    })
  }

  /**
   * Updates the decimalFeedback state when an on change event is fired, with the event target value
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e
   */
  handleDecimalFeedback (e) {
    this.setState({
      decimalFeedback: e.target.value
    })
  }

  /**
   * Updates the hexFeedback state when an on change event is fired, with the event target value
   * @typedef {object} onChangeEvent
   * @param {onChangeEvent} e
   */
  handleHexFeedback (e) {
    this.setState({
      hexFeedback: e.target.value
    })
  }
  /**
   * Method to handle binary to decimal. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct binary number and not an empty one.
   */
  handleBinaryToDecimal () { // works
    const checkBinary = new RegExp('^[0-1]*$')
    if (checkBinary.test(this.state.binaryFeedback) && this.state.binaryFeedback.length > 0) {
      this.setState({
        input: parseInt(this.state.binaryFeedback, 2) + '₁₀',
        calculations: this.state.binaryFeedback + '₂'
      })
    } else {
      window.alert('Not a binary number.')
    }
  }
  /**
   * Method to handle decimal to binary. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct decimal number and not an empty one.
   */
  handleDecimalToBinary () { // works
    const checkHex = new RegExp('^[0-9]+$')
    if (checkHex.test(this.state.decimalFeedback) && this.state.decimalFeedback.length > 0) {
      this.setState({
        input: Number(this.state.decimalFeedback).toString(2) + '₂',
        calculations: this.state.decimalFeedback + '₁₀'
      })
    } else {
      window.alert('Not a decimal number.')
    }
  }
  /**
   * Method to handle binary to hex. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct binary number and not an empty one.
   */
  handleBinaryToHex () { // works
    const checkBinary = new RegExp('^[0-1]*$')
    if (checkBinary.test(this.state.binaryFeedback) && this.state.binaryFeedback.length > 0) {
      this.setState({
        input: parseInt(this.state.binaryFeedback, 2).toString(16) + '₁₆',
        calculations: this.state.binaryFeedback + '₂'
      })
    } else {
      window.alert('Not a binary number.')
    }
  }
  /**
   * Method to handle decimal to hexadecimal. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct decimal number and not an empty one.
   */
  handleDecimaltoHex () { // works
    const checkHex = new RegExp('^[0-9]+$')
    if (checkHex.test(this.state.decimalFeedback) && this.state.decimalFeedback.length > 0) {
      this.setState({
        input: parseInt(this.state.decimalFeedback, 10).toString(16) + '₁₆',
        calculations: this.state.decimalFeedback + '₁₀'
      })
    } else {
      window.alert('Not a decimal number.')
    }
  }
  /**
   * Method to handle hexadecimal to binary. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct hex number and not an empty one.
   */
  handleHexToBinary () { // works
    const checkHex = new RegExp('^[0-9a-f]+$')
    if (checkHex.test(this.state.hexFeedback) && this.state.hexFeedback.length > 0) {
      this.setState({
        input: parseInt(this.state.hexFeedback, 16).toString(2) + '₂',
        calculations: this.state.hexFeedback + '₁₆'
      })
    } else {
      window.alert('Not a Hexadecimal number.')
    }
  }
  /**
   * Method to handle hexadecimal to decimal. Takes the input calculates it and shows along with what was calculated.
   * Also validates a correct hex number and not an empty one.
   */
  handleHexToDecimal () { // works
    const checkHex = new RegExp('^[0-9a-f]+$')
    if (checkHex.test(this.state.hexFeedback) && this.state.hexFeedback.length > 0) {
      this.setState({
        input: parseInt(this.state.hexFeedback, 16).toString(10) + '₁₀',
        calculations: this.state.hexFeedback + '₁₆'
      })
    } else {
      window.alert('Not a Hexadecimal number.')
    }
  }

  /**
   * Method to handle buttons pressed and update the input state accordingly
   * @typedef KeyBoardEvent
   * @param {KeyBoardEvent} e
   */
  handleKeyPress (e) {
    switch (e.key) {
      case 'Enter':
        this.handleEqualBtn()
        break
      case '1':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '2':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '3':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '4':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '5':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '6':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '7':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '8':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '9':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '0':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '+':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '-':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '*':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '/':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '.':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '=':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case '%':
        this.setState({
          input: this.state.input + e.key
        })
        break
      case 'Delete':
        this.handleAllClear()
        break
      case 'Backspace':
        this.handleBackSpace()
        break
    }
  }

  /**
   * Render method that either shows the calculator or the converter according to the state of the toggle
   */
  render () {
    return (
      <div className='masterContainer' id={this.props.id} draggable='true' onDragStart={this.props.dragStart} >
        <div className='calcContainer'>
          <div className='calcHeader'>
            <img id='calcImg' src='src/assets/Images/Calculator_Images/calculator.png' draggable='false' />
            <button id='closeBtn' onClick={this.props.onClose} title='Exit' /><br />
            <span id='calcToggleTitle'>Calculator   </span>
            <label className='switch'>
              <input type='checkbox' onClick={this.toggleSwitch.bind(this)} />
              <span className='slider round' />
            </label>
            <span id='converterToggleTitle'>Binary Converter</span>
          </div>
          <div className='resultScreen' onKeyDown={this.handleKeyPress.bind(this)}>
            <textarea id='calculations' value={this.state.calculations} onChange={this.getScreenValue.bind(this)} />
            <textarea id='inputAndResult' value={this.state.input} onChange={this.getScreenValue.bind(this)} /></div>
          {this.state.toggleState && <div className='convererWithin'>
            <input type='text' className='conversionHolders' id='conversionHolder1' placeholder='Binary' value={this.state.binaryFeedback} onChange={this.handleBinaryFeedback.bind(this)} />
            <button className='conversionBtns' id='b1' value={'binaryToDecimal'} onClick={this.handleBinaryToDecimal.bind(this)}>To Decimal</button>
            <br />
            <button className='conversionBtns' id='b2' value='binaryToHex' onClick={this.handleBinaryToHex.bind(this)} >To Hex</button>
            <br />
            <input type='text' className='conversionHolders' id='conversionHolder2' placeholder='Decimal' value={this.state.decimalFeedback} onChange={this.handleDecimalFeedback.bind(this)} />
            <button className='conversionBtns' id='b3' value='decimalToBinary' onClick={this.handleDecimalToBinary.bind(this)} >To Binary</button>
            <br />
            <button className='conversionBtns' id='b4' value='decimalToHex' onClick={this.handleDecimaltoHex.bind(this)}>To Hex</button>
            <br />
            <input type='text' className='conversionHolders' id='conversionHolder3' placeholder='Hex' value={this.state.hexFeedback} onChange={this.handleHexFeedback.bind(this)} />
            <button className='conversionBtns' id='b5' value='hextoBinary' onClick={this.handleHexToBinary.bind(this)}>To binary</button>
            <br />
            <button className='conversionBtns' id='b6'value='hextoDecimal' onClick={this.handleHexToDecimal.bind(this)}>To Decimal</button><br />
            <button className='clearbtn' id='clearbutton' title='Clear the forms' onClick={this.handleAllClear.bind(this)}>Clear</button><br />
          </div>}
          {!this.state.toggleState && <div className='allButtons' >
            <div className='row'>
              <button className='calcNumber' id='ac' value={this.state.ce} onClick={this.handleAllClear.bind(this)}>ac</button>
              <button className='calcNumber' id='mod' value={this.state.mod} onClick={this.addButtonValueToInput.bind(this)}>mod</button>
              <button className='calcNumber' id='backspace' value={this.state.backspace} onClick={this.handleBackSpace.bind(this)} />
              <button className='operator' id='divide' value={this.state.divide} onClick={this.addButtonValueToInput.bind(this)}>÷</button>
            </div>
            <div className='row'>
              <button className='calcNumber' value={this.state.seven} onClick={this.addButtonValueToInput.bind(this)}>7</button>
              <button className='calcNumber' value={this.state.eight} onClick={this.addButtonValueToInput.bind(this)}>8</button>
              <button className='calcNumber' value={this.state.nine} onClick={this.addButtonValueToInput.bind(this)}>9</button>
              <button className='operator' value={this.state.multiply} onClick={this.addButtonValueToInput.bind(this)}>x</button>
            </div>
            <div className='row'>
              <button className='calcNumber' value={this.state.four} onClick={this.addButtonValueToInput.bind(this)}>4</button>
              <button className='calcNumber' value={this.state.five} onClick={this.addButtonValueToInput.bind(this)}>5</button>
              <button className='calcNumber' value={this.state.six} onClick={this.addButtonValueToInput.bind(this)}>6</button>
              <button className='operator' value={this.state.minus} onClick={this.addButtonValueToInput.bind(this)}>-</button>
            </div>
            <div className='row'>
              <button className='calcNumber' value={this.state.one} onClick={this.addButtonValueToInput.bind(this)}>1</button>
              <button className='calcNumber' value={this.state.two} onClick={this.addButtonValueToInput.bind(this)}>2</button>
              <button className='calcNumber' value={this.state.three} onClick={this.addButtonValueToInput.bind(this)}>3</button>
              <button className='operator' value={this.state.plus} onClick={this.addButtonValueToInput.bind(this)}>+</button>
            </div>
            <div className='row'>
              <button className='calcNumber' id='zero' value={this.state.zero} onClick={this.addButtonValueToInput.bind(this)}>0</button>
              <button className='operator' value={this.state.point} onClick={this.addButtonValueToInput.bind(this)}>.</button>
              <button className='operator' value={this.state.equals} onClick={this.handleEqualBtn.bind(this)}>=</button>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default Calculator
