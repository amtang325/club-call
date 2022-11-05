import React, { useState, useRef, useEffect } from 'react'; 
import './App.css';
import Club from './Club';
import ClubList from "./ClubList";

const LOCAL_STORAGE_KEY = 'clubApp.clubs'

function App() {
  const [clubs, setClubs] =  useState([{'id': 1, 'name': 'Cybersecurity Club', 'message': 'Meeting today in Room 314'}, {'id': 2, 'name': 'Computer Team', 'message': 'Meeting today in Room 328. There will be candy!'}])
  const clubNameRef = useRef()

  return (
    <>
      <div class="navigation-bar">
        <a href="" id = "club-list-tab">Announcement Board</a>
      </div>
      <label>Category</label>
      <div>
      <select class="select">
        <input type = "checkbox"></input>
        <option value="1"><input type = "checkbox"></input>Academic</option>
        <input type = "checkbox"></input>
        <option value="2">Sport</option>
      </select>
      </div>
      <ClubList clubs={clubs} />
    </>
  )
}

export default App;
