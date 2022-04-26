import React, {useState, useEffect} from 'react';
import './Chat.scss';


function Chat(props) {
  const [outcomingMessage, setOutgoingMessage] = useState('')

  function handleMessage(e) {
    setOutgoingMessage(e.target.value)
  }

  function handleUpdate(e) {
    e.preventDefault()
    props.addOutcomingMessage(outcomingMessage, props.chat[0].id)
    setOutgoingMessage('')
  }

  useEffect(() => {
    
  })

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={props.chat[0].img} alt=""/>
        <span>{props.chat[0].firstName}</span>
      </div>
      <div className="chat-boby">
      {
        props.chat[0].message
          .map(message => message.incoming ?
            // <div className="incoming"><img src={props.chat[0].img} alt=""/><div className="incoming-message">{message.text}<br/><div>{message.time}</div></div></div>
            <div key={message.id}>
              <div className="incoming">
                <img src={props.chat[0].img} alt=""/><div className="incoming-message">{message.text}</div>
              </div>
              <div className="message-time-incomig">
                {message.time}
              </div>
            </div>
              :
            <div key={message.id}>
                <div className="outcoming">
                  <div className="outcoming-message">{message.text}</div><img src='https://cdn.pixabay.com/photo/2020/04/17/07/59/cartoon-man-5053708_960_720.png' alt=""/>
                </div>
                <div className="message-time-outcoming">
                  {message.time}
                </div>
            </div>
          )
      }
      </div>
      <form className="chat-footer" onSubmit={handleUpdate}>
        <input onChange={handleMessage} type="text" placeholder="Type your message" value={outcomingMessage}/>
        <input type="submit" hidden></input>
      </form>
    </div>
  )
}


export default Chat;
