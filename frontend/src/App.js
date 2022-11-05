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
        <a href="" id = "club-list-tab">Club List</a>
        <a href="" id = "my-schedule-tab">My Schedule</a>
      </div>
      <ClubList clubs={clubs} />
    </>
  )
}

export default App;
