import React, { useState, useEffect } from "react";

import Announcements from "./Announcements";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import { Box, Heading } from "@chakra-ui/react";

import { Link } from 'react-router-dom'

import Select from "react-select";
import makeAnimated from "react-select/animated";

import './Dashboard.css'

const firebaseConfig = {
  apiKey: "AIzaSyBIfhZqi02ojiVSPNUkw3dsAeAuo59Kw88",
  authDomain: "club-call.firebaseapp.com",
  projectId: "club-call",
  storageBucket: "club-call.appspot.com",
  messagingSenderId: "965696944593",
  appId: "1:965696944593:web:29f5ead47b484a585808f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const options = [
  { label: "Academic", value: "academic" },
  { label: "Activism", value: "activism" },
  { label: "Arts", value: "arts" },
  { label: "Cultural", value: "cultural" },
  { label: "Social", value: "social" },
  { label: "Sports", value: "sports" },
  { label: "Volunteering", value: "volunteering" },
  { label: "Other", value: "other" },
];

const animatedComponents = makeAnimated();

function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsToDisplay, setAnnouncementsToDisplay] = useState([]);
  const [tags, setTags] = useState(options);

  useEffect(() => {
    async function a() {
      const q = query(collection(db, "announcements"), orderBy("time", "desc"), limit(100));
      const querySnapshot = await getDocs(q);

      const announcementsRead = querySnapshot.docs.map((doc) => doc.data());

      // console.log(announcementsRead);

      setAnnouncements(announcementsRead);
    }
    a();
  }, []);

  useEffect(() => {
    let selected = announcements.filter((e) => {
        console.log(tags);
        for (let val of tags) {
          // console.log(val);
          if (val.value === e.type) return true;
        }

        return false;
      }
    )

    setAnnouncementsToDisplay(selected);
  }, [announcements, tags]);

  return (
    <>
      {/* <div className="navigation-bar">
        <a href="" id="club-list-tab">
          Club Announcement Board
        </a>
      </div> */}
      {/* <div>
        <label htmlFor="club-categories">Filter by Category:</label>
      </div>
      <select id="club-categories" onChange={handleSelectCategory}>
        <option></option>
        <option value="academic">Academic</option>
        <option value="activism">Activism</option>
        <option value="arts">Arts</option>
        <option value="cultural">Cultural</option>
        <option value="social">Social</option>
        <option value="sports">Sports</option>
        <option value="volunteering">Volunteering</option>
        <option value="other">Other</option>
      </select> */}

      <Box width="75%" margin="auto">
        <Box>
          <Heading size="4xl">
            <Link to="/">ClubCall</Link>
          </Heading>
        </Box>
        <Box>
          <Heading size="md" marginTop="1.5em">
            Filter by Category:
          </Heading>
          <Box marginTop="0.5em">
            <Select
              options={options}
              value={tags}
              onChange={setTags}
              components={animatedComponents}
              isMulti
            />
          </Box>
        </Box>
        <Box marginTop="2em">
          <Announcements announcements={announcementsToDisplay} />
        </Box>
        <Box h="30px"></Box>
      </Box>
    </>
  );
}

export default Dashboard;
