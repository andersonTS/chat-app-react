import React from 'react';
import './Person.scss';

function Person(props) {
  const { firstName, secondName, img, id, message} = props.person
  

  let lastMessageText = message[message.length - 1].text
  let lastMessageData = message[message.length - 1].data
  if(lastMessageText.length > 30){
      lastMessageText = lastMessageText.slice(0, 30) + '...'
    }


  const handelClick = () => {
    props.chooseId(id)
  }

  return (
    <div onClick={handelClick} className="person-container">
      <div>
        <img src={img} alt=""/>
        <div className="chat-info">
          <span><b>{firstName} {secondName}</b></span>
          <span>{lastMessageText}</span>
        </div>
      </div>
      <span className="data"><b>{lastMessageData}</b></span>
    </div>
  )
};


export default Person;
