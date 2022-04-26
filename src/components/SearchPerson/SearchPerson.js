import React, {useState} from 'react';
import './SearchPerson.scss';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";


const clientId = "259066919231-3qr6g7039kq1ibt0r6m8tgo50rjt727c.apps.googleusercontent.com";

function SearchPerson (props) {

  const [filterText, setFilterText] = useState('')
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  
  function handlerSearch(e) {
    setFilterText (e.target.value)
    props.filter(e.target.value)
  }

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowlogoutButton(false);
};

  return (
    <div className="search-container">
      <div className="search-container-top">
        <img src='https://cdn.pixabay.com/photo/2020/04/17/07/59/cartoon-man-5053708_960_720.png' alt=""/>
          <Link to="/">
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout>
          </Link>
      </div>
      <input type="text" onChange={handlerSearch} placeholder="Search or start new chat" value={filterText}/>
    </div>
  )
} 

export default SearchPerson;
