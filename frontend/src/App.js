import React, { useState, useRef, useEffect } from 'react'; 
import './App.css';
import Announcements from "./Announcements";
import Announcement from './Announcement'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Image, Container } from '@chakra-ui/react'

import MathBG from './math.png'

const LOCAL_STORAGE_KEY = 'announcementApp.announcements'

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
  const [announcements, setAnnouncements] =  useState([])

  useEffect(() => {
    async function a () {
      const querySnapshot = await getDocs(collection(db, "announcements"));

      const announcementsRead = querySnapshot.docs.map((doc) => doc.data());

      console.log(announcementsRead)

      setAnnouncements(announcementsRead)

    }
    a()
  }, [])

  const handleSelectCategory =() => {
    var category = document.getElementById("club-categories").value; 
    if (category === "") {
    }
    for (var i = 0; i < announcements.length; i++) {
      if (announcements[i].category === category) {
      }
    }
    }

  return (
    <>
      <div className="navigation-bar">
        <a href="" id="club-list-tab">
          Club Announcement Board
        </a>
      </div>
      <div>
        <label for = "club-categories">Filter by Category:</label>
      </div>
      <select id = "club-categories" onChange={handleSelectCategory}>
        <option></option>
        <option value="academic">Academic</option>
        <option value="activism">Activism</option>
        <option value="arts">Arts</option>
        <option value="cultural">Cultural</option>
        <option value="social">Social</option>
        <option value="sports">Sports</option>
        <option value="volunteering">Volunteering</option>
        <option value="other">Other</option>
      </select>
      <Container>
        <Announcements announcements={announcements} />
      </Container>
    </>
  );
};

export default App;
