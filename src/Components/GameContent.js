
import React from 'react'
/**
 * GameContent component, provides features required from MemoryGame component
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @class
 * @extends React.Component
 * @param {{}} props
 */
export default class MemoryGameComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rows: '',
      cols: '',
      tiles: [],
      images: [
        './src/assets/Images/Memory_Game_Images/1.png',
        './src/assets/Images/Memory_Game_Images/2.png',
        './src/assets/Images/Memory_Game_Images/3.png',
        './src/assets/Images/Memory_Game_Images/4.png',
        './src/assets/Images/Memory_Game_Images/5.png',
        './src/assets/Images/Memory_Game_Images/6.png',
        './src/assets/Images/Memory_Game_Images/7.png',
        './src/assets/Images/Memory_Game_Images/8.png'
      ],
      matched: [],
      openImg1: './src/assets/Images/Memory_Game_Images/0.png',
      openImg2: './src/assets/Images/Memory_Game_Images/0.png',
      setClickingONorOff: this.imageClicked.bind(this),
      disabled: false,
      gameOver: false,
      seconds: '',
      tries: 0,
      pause: true,
      resume: false,
      win: false,
      showPausedScreen: false,
      countImagesFound: 0
    }
  }
  /**
   * When component is mounted, checks for the difficulty prop passed from the MemoryGame component to se the appropriate
   * amount of seconds as a different difficulty as well as creating the correct amount of columns and rows of images also
   * passed as a prop from the MemoryGame component.
   */
  componentDidMount () {
    switch (this.props.difficulty) {
      case 'easy':
        this.setState({ seconds: 50 })
        break
      case 'medium':
        this.setState({ seconds: 20 })
        break
      case 'hard':
        this.setState({ seconds: 10 })
        break
    }

    this.countDown()
    let arr = this.splitRowsCols.bind(this)(this.props.rowCols)
    let promise = new Promise(resolve => {
      resolve(this.setState({ tiles: this.getPictureArray(arr[0], arr[1]) }))
    })
    promise.then(() => this.matchArrayToImageArray.bind(this)(this.state.tiles, this.state.images))
  }

  /**
   * Clearing interval on unmounting of the component.
   */
  componentWillUnmount () {
    clearInterval(this.interval)
  }

  /**
   * Countdown method for the game according to the state of the seconds.
   */
  countDown () {
    this.interval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds - 1
      })
      if (this.state.seconds <= 0) {
        clearInterval(this.interval)
        this.gameOver()
      }
    }, 1000)
  }

  /**
   * Method to 'pause' the game by just clearing the interval and showing the pause game screen set in render.
   */
  pauseGame () {
    clearInterval(this.interval)
    this.setState({
      pause: false,
      resume: true
    })
  }

  /**
   * Method to resume the game by restarting the countdown with the state of the seconds that was saved at the moment of
   * the pause game.
   */
  resumeGame () {
    this.countDown()
    this.setState({
      pause: true,
      resume: false
    })
  }

  /**
   * Method to show the gameover screen as set in the render by setting the state of the gameOver to true, also hiding the pause and resume
   * buttons.
   */
  gameOver () {
    this.setState({
      gameOver: true,
      pause: false
    })
    try {
      document.getElementsByClassName('pauseResumeBtns').style.display = 'none'
    } catch (err) {
      console.log('¯\\_(ツ)_/¯')
    }
  }

  /**
   *Separating the rowCols prop to actual rows and columns.
   * @param {String} rowsCols
   */
  splitRowsCols (rowsCols) {
    let temp = rowsCols.split(',')
    this.setState({
      rows: temp[0],
      cols: temp[1]
    })
    return temp
  }

  /**
   * Creating an array to match the images to the appropriate position.
   * @param {Object[]} tiles
   * @param {Object[]} images
   */
  matchArrayToImageArray (tiles, images) {
    let arrMatched = []
    if (tiles.length > 0) {
      tiles.forEach((tile, index) => {
        arrMatched[index] = images[tile - 1]
      })
      this.setState({
        matched: arrMatched
      })
    }
  }

  /**
   *  "Suffling" the picture array.
   * @param {number} rows
   * @param {number} cols
   * @returns {Object[]}
   */
  getPictureArray (rows, cols) {
    var i
    var arr = []
    for (i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }
    for (var y = arr.length - 1; y > 0; y--) {
      var j = Math.floor(Math.random() * (y + 1))
      var temp = arr[y]
      arr[y] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  /**
   * Method to check if we have turned enough images to win the game.
   * Setting the win state to true if we have turned enough pairs so that the win screen created at render can be seen.
   */
  checkIfGameWon () {
    if (this.state.countImagesFound === this.state.rows * this.state.cols) {
      clearInterval(this.interval)
      this.setState({
        win: true,
        pause: false,
        resume: false
      })
    }
  }

  /**
   * Method to show each image at the posistion when clicked to compare and see if image pairs are found. If not then it will return the source of the image to
   * the default one. If a pair is found their class name will be changed so that they will not be affected when the default source will be assigned again to hide them.
   * @typedef MouseEvent
   * @param {MouseEvent} e
   */
  imageClicked (e) {
    e.target.focus()
    let src = './src/assets/Images/Memory_Game_Images/0.png'
    if (this.state.openImg2 !== src) {
      return
    }
    if (e.target.getAttribute('src') === src) {
      if (this.state.openImg1 === src || this.state.openImg2 === src) {
        e.target.src = this.state.matched[e.target.id]
        if (this.state.openImg1 === src) {
          this.setState({
            openImg1: this.state.matched[e.target.id]
          })
        } else if (this.state.openImg2 === src) {
          let promise = new Promise(resolve => {
            resolve(this.setState({ openImg2: this.state.matched[e.target.id] }))
          })
          promise.then(() => {
            if (this.state.openImg1 === this.state.openImg2) {
              console.log(this.state.openImg1)
              console.log(this.state.openImg2)
              this.setState({
                countImagesFound: this.state.countImagesFound + 2,
                seconds: this.state.seconds + 5 })
              this.checkIfGameWon()
              var items = document.body.getElementsByClassName('image')
              for (let i = 0; i < items.length; i++) {
                if (items[i].src.includes(this.state.openImg1.substring(1))) { // here lies the bug deep within its hole, its smarter than me! I cannot kill it!
                  items[i].className = 'imgFound'
                }
              }
              this.setState({
                openImg1: src,
                openImg2: src
              })
            } else {
              this.setState({
                openImg1: src,
                openImg2: src,
                tries: this.state.tries + 1
              })
              items = document.body.getElementsByClassName('image')
              items = document.body.getElementsByClassName('image')
              // setting timeout before turning the images to default so that they can be seen for an appropriate amount of time.
              setTimeout(() => {
                for (let i = 0; i < items.length; i++) {
                  items[i].src = src
                }
              }, 300)
            }
            return null
          })
        }
      }
    }
  }

  /**
   * Method to show each image at the posistion when the 'Enter' button is pressed to compare and see if image pairs are found. If not then it will return the source of the image to
   * the default one. If a pair is found their class name will be changed so that they will not be affected when the default source will be assigned again to hide them.
   * @typedef KeyBoardEvent
   * @param {KeyBoardEvent} e
   */
  imagePressed (e) {
    e.focus()
    let src = './src/assets/Images/Memory_Game_Images/0.png'
    if (this.state.openImg2 !== src) {
      return
    }
    if (e.getAttribute('src') === src) {
      if (this.state.openImg1 === src || this.state.openImg2 === src) {
        e.src = this.state.matched[e.id]
        if (this.state.openImg1 === src) {
          this.setState({
            openImg1: this.state.matched[e.id]
          })
        } else if (this.state.openImg2 === src) {
          let promise = new Promise(resolve => {
            resolve(this.setState({ openImg2: this.state.matched[e.id] }))
          })
          promise.then(() => {
            if (this.state.openImg1 === this.state.openImg2) {
              this.checkIfGameWon()
              this.setState({
                seconds: this.state.seconds + 5
              })
              var items = document.body.getElementsByClassName('image')
              for (let i = 0; i < items.length; i++) {
                if (items[i].src.includes(this.state.openImg1.substring(1))) {
                  items[i].className = 'imgFound'
                }
              }
              this.setState({
                openImg1: src,
                openImg2: src
              })
            } else {
              this.setState({
                openImg1: src,
                openImg2: src
              })
              items = document.body.getElementsByClassName('image')
              items = document.body.getElementsByClassName('image')
              setTimeout(() => {
                for (let i = 0; i < items.length; i++) {
                  items[i].src = src
                }
              }, 300)
            }
            return null
          })
        }
      }
    }
  }

  /**
   * Method to move through the images only by using the keyboard arrow keys and the 'Enter' Key. Try catch is used in case we try to move out of bounds.
   * @typedef KeyBoardEvent
   * @param {KeyBoardEvent} e
   */
  handleKeyPress (e) {
    let target = e.target
    try {
      switch (e.key) {
        case 'ArrowRight':
          if (e.target.nextElementSibling != null) {
            target.nextElementSibling.focus()
          }
          break
        case 'ArrowLeft':
          if (e.target.previousElementSibling != null) {
            target = target.previousElementSibling
            target.focus()
          }
          break
        case 'ArrowUp':
          for (let i = 0; i < this.state.cols; i++) {
            target = target.previousElementSibling
          }
          target.focus()
          break
        case 'ArrowDown':
          for (let i = 0; i < this.state.cols; i++) {
            target = target.nextElementSibling
          }
          target.focus()
          break
        case 'Enter':
          this.imagePressed(target.firstChild)
          target.focus()
          break
      }
    } catch (err) {
      console.log('Out of bounds!')
    }
  }

  /**
   * Render method to create the images as well as all the "screens" used in the game (pause, gameover, resume, starting screen)
   * Boolean states are used to show the appropriate "screen"
   */
  render () {
    let defaultImages = null
    /* if (this.state.matched.length > 0) {
      images = this.state.matched.map((img, index) => {
        console.log(img)
      }) */
    if (this.state.matched.length > 0) {
      defaultImages = this.state.matched.map((elem, index) => {
        return <a className='atag' href='#' tabIndex={index} id={'a' + index} key={index} draggable='false'>
          <img disabled={this.state.disabled} className='image' draggable='false' id={index} key={index} src={'./src/assets/Images/Memory_Game_Images/0.png'}
            onClick={this.imageClicked.bind(this)} />
        </a>
      })
    }
    return (
      <div id='game' draggable='false' onKeyDown={this.handleKeyPress.bind(this)}>
        {!this.state.gameOver && <div draggable='false' className='flexContainer'>{defaultImages}</div>}
        {this.state.gameOver && <div><img id='gameOverImg' draggable='false' src='src/assets/Images/Memory_Game_Images/gameover.png' />
        </div>}
        <div id='infoContainer' draggable='false'>
          <span>Time left: <span> {this.state.seconds}'' </span></span><br />
          <span>Tries: <span> {this.state.tries} </span></span>
          {this.state.pause && <button id='pause' className='pauseResumeBtns' draggable='false' onClick={this.pauseGame.bind(this)} />}
          {this.state.resume && <div id='pausedDiv' draggable='false'><img id='pausedImg' src='src/assets/Images/Memory_Game_Images/gamepaused.png' draggable='false' /></div>}
          {this.state.win && <div id='winDiv' draggable='false'><img id='winImg' src='src/assets/Images/Memory_Game_Images/youwin.png' draggable='false' /></div>}
          {this.state.resume && <button id='resume' draggable='false' className='pauseResumeBtns' onClick={this.resumeGame.bind(this)} />}
          <button id='tryAgain' draggable='false' onClick={this.props.tryAgain}>Try again!</button>
        </div></div>
    )
  }
}
