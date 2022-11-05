import React, { useState, useRef, useEffect } from 'react'; 
import './App.css';
import Club from './Club';
import ClubList from "./ClubList";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const LOCAL_STORAGE_KEY = 'clubApp.clubs'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIfhZqi02ojiVSPNUkw3dsAeAuo59Kw88",
  authDomain: "club-call.firebaseapp.com",
  projectId: "club-call",
  storageBucket: "club-call.appspot.com",
  messagingSenderId: "965696944593",
  appId: "1:965696944593:web:29f5ead47b484a585808f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [clubs, setClubs] =  useState([])

  useEffect(() => {
    async function a () {
      const querySnapshot = await getDocs(collection(db, "announcements"));

      const clubsRead = querySnapshot.docs.map((doc) => doc.data());

      console.log(clubsRead)

      setClubs(clubsRead)

    }
    a()
  }, [])

  return (
    <>
      <div className="navigation-bar">
        <a href="" id = "club-list-tab">Club List</a>
        <a href="" id = "my-schedule-tab">My Schedule</a>
      </div>
      <ClubList clubs={clubs} />
    </>
  )
}

export default App;
