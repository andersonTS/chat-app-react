import React, { useState, useEffect } from 'react';
import Person from '../Person/Person';
import './PersonList.scss';
import SearchPerson from '../SearchPerson/SearchPerson'

const PersonList = (props) => {

  const [searchValue, setSearchValue] = useState('')




  function filterPersonList(text) {
    setSearchValue(text)
  }

  return (
    <div className="person-list">
      <SearchPerson filter={filterPersonList}/>
      <h1>Chats</h1>
      {
        props.data
          .filter(person => person.firstName.toLowerCase().includes(searchValue.toLowerCase()))
          .map((person) => {
            return (
              <Person key={person.id}
                person={person}
                chooseId={props.chooseId}
              />
            )
          }
        )
      }
    </div>
  )
}


export default PersonList;
