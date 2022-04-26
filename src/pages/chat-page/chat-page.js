import React, { useState, useEffect } from 'react';
import './chat-page.scss';
import PersonList from '../../components/PersonList/PersonList'
import Chat from '../../components/Chat/Chat'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


function ChatPage() {
  const conversationInfo = [
    {
      id: 1,
      img: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664__340.jpg',
      firstName: 'Alice',
      secondName: 'Freeman',
      message: [
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([16, 6, 2017]),
            time: '4:00 AM',
            milliseconds: 1497560400000,
            text: 'You are the worst'
          },
          {
            id: uuidv4(),
            incoming: false,
            data: formatDate([12, 6, 2017]),
            time: '4:05 AM',
            milliseconds: 1497560400000,
            text: 'Why?'
          }
        ]
    },
    {
      id: 2,
      img: 'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_960_720.jpg',
      firstName: 'Josefina',
      secondName: '',
      message: [
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([18, 2, 2017]),
            time: '4:00 AM',
            milliseconds: 1497560400000,
            text: 'Quickly come to the meeting room 1B, we have a big server issue.'
          },
          {
            id: uuidv4(),
            incoming: false,
            data: formatDate([18, 2, 2017]),
            time: '4:10 AM',
            milliseconds: 1497560400000,
            text: 'We are losing money! Quick!'
          },
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([18, 2, 2017]),
            time: '4:05 AM',
            milliseconds: 1497560400000,
            text: "I'm having breackfest right now, can't you wait for 10 minutes?"
          }
        ]
    },
    {
      id: 3,
      img: 'https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189__340.jpg',
      firstName: 'Velazquez',
      secondName: '',
      message: [
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([22, 5, 2017]),
            time: '4:10 AM',
            milliseconds: 1497560400000,
            text: 'We are losing money! Quick!'
          },
          {
            id: uuidv4(),
            incoming: false,
            data: formatDate([22, 5, 2017]),
            time: '4:05 AM',
            milliseconds: 1497560400000,
            text: "I'm having breackfest right now, can't you wait for 10 minutes?"
          },
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([22, 5, 2017]),
            time: '4:00 AM',
            milliseconds: 1497560400000,
            text: 'Quickly come to the meeting room 1B, we have a big server issue.'
          }
      ]
    },
    {
      id: 4,
      img: 'https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_960_720.jpg',
      firstName: 'Barrera',
      secondName: '',
      message: [
          {
            id: uuidv4(),
            incoming: true,
            data: formatDate([19, 2, 2017]),
            time: '4:10 AM',
            milliseconds: 1497560400000,
            text: 'Hi, how are you?'
          },
          {
            id: uuidv4(),
            incoming: false,
            data: formatDate([19, 2, 2017]),
            time: '4:15 AM',
            milliseconds: 1497560400000,
            text: 'Good, thanks, you?'
          }
        ]
    }
  ]
  const [chatInfo, setChatInfo] = useState(conversationInfo)
  const [chatId, setChatId] = useState(conversationInfo[0].id)
  const [allPersonMessage, setAllPersonMessage] = useState('')
  const [sortData, setSortData] = useState(chatInfo)


  function formatDate(arr) {
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthArray[arr[1]]} ${arr[0]}, ${arr[2]}`
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  

  function handlerId(id){
    setChatId(id)
  }

  async function getMessage () {
    const API = 'https://api.chucknorris.io/jokes/random'

    try {
      return await axios.get(API)
        .then((response) => response.data.value)
        .catch((error) => console.log(error))
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    setChatInfo(conversationInfo)
    let data = []
    for(let i = 0; i < localStorage.length; i++) {
      chatInfo.map(person => {
        if (person.id === +localStorage.key(i) ) {
          return person.message = JSON.parse(localStorage.getItem(localStorage.key(i)))
        }
      })
      data.push({id: +localStorage.key(i), message: JSON.parse(localStorage.getItem(localStorage.key(i)))})
      setAllPersonMessage(data)
    }
  }, [])

  useEffect(() => {
    sortArray(sortData)
    setChatInfo(sortData)
  });

  function sortArray(arr) {
    arr.sort(function(a, b){
      return (b.message[b.message.length - 1].milliseconds) - a.message[a.message.length - 1].milliseconds 
    })
  }

  
  const addedToChat = (text, incoming) => {
    chatInfo.map(
      person => {
        if(person.id === chatId){
          return person.message.push({
            id: uuidv4(),
            incoming: incoming,
            data: formatDate(new Date().toLocaleDateString().split('.').map(element => +element)),
            time: formatAMPM(new Date()),
            milliseconds: Date.now(),
            text: text
          })
        }
      }
    )
    chatInfo.map(person => {
      setAllPersonMessage(person.message)
      return localStorage.setItem(person.id, JSON.stringify(person.message))
    })
    sortArray(sortData)
    setChatInfo(sortData)
  }


  async function outcomingMessageHandler(text, id) {
    addedToChat(text, false)

    // Post answer
    const newChuckNorrisMsg = await getMessage()

    setTimeout(() => {
      addedToChat(newChuckNorrisMsg, true)
      
      chatInfo.map(
        person => {
          if(person.id === id)
            setAllPersonMessage(person.message)
        }
      )
    }, 15000)


    

  }

  return (
    <div className="chat-page-container">
      <div className="person-list-container">
        <PersonList chooseId={handlerId} data={chatInfo}/>
      </div>
      <div className="chat-container">
        <Chat
          chat={chatInfo.filter(chat => {
            return chat.id === chatId
          })}
          addOutcomingMessage={outcomingMessageHandler}
        />
      </div>
    </div>
  );
}


export default ChatPage;
