import React from 'react'
/**
 * Navigation component to start the different applications, required by App Component
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @param{{}} props
 */
const navBar = (props) => {
  return (
    <div className='navBar'>
      <button id='memoryBtn' title='Launch the memory game..' onClick={props.clickMemory} />
      <button id='chatBtn' title='Launch the chat application..' onClick={props.clickChat} />
      <button id='calcBtn' title='Launch the calculator..' onClick={props.clickCalc} />
      <button id='aboutBtn' title='About this personal web desktop..' onClick={props.clickAbout} />
    </div>
  )
}

export default navBar
