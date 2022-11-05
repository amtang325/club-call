import React, { useState, useRef, useEffect } from 'react'; 
import './App.css';
import Announcements from "./Announcements";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Image, Container } from '@chakra-ui/react'

import MathBG from './math.png'

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

  const handleSelectCategory =() => {
    var category = document.getElementById("club-categories").value; 
    console.log('I changed!', category);
  }

  return (
    <>
      <div className="navigation-bar">
        <a href="" id="club-list-tab">
          Club Announcement Board
        </a>
      </div>
      <select id = "club-categories" onChange={handleSelectCategory}>
        <option>Filter by Category</option>
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
        <Announcements clubs={clubs} />
      </Container>
    </>
  );
};

export default App;
