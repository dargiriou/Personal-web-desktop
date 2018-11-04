import React from 'react'

/**
 * About the pwd component
 * @version 1.0
 * @author [Dimitrios Argyriou] (https://github.com/1dv525/da222kf-examination-3)
 * @param {{}} props
 */
const About = (props) => {
  return (
    <div className='masterContainer' id={props.id} draggable='true' onDragStart={props.dragStart}>
      <img id='aboutImg' src='src/assets/Images/About_Images/about.png' draggable='false' />
      <button id='closeBtn' draggable='false' onClick={props.onClose} title='Exit' />
      <div id='logo' draggable='false' ><img src='src/assets/Images/Main_Images/logo.png' draggable='false' /></div>
      <textarea draggable='false' id='about-text'>This is a personal web desktop application created for 'Examination-3' of 1DV525-Introduction to web programming. It features three
      applications, a chat application utilizing web-sockets, a memory game and a calculator/ binary-hex converter. This assignment was created with React and was developed by
      Dimitrios Argyriou (da222kf@student.lnu.se).</textarea>
    </div>
  )
}

export default About
