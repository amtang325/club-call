import React, { useState, useRef, useEffect } from "react";

import Announcements from "./Announcements";
import Announcement from "./Announcement";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Image, Container, Box, Flex } from "@chakra-ui/react";

import MathBG from "./math.png";

import { MultiSelect } from "react-multi-select-component";

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

function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsToDisplay, setAnnouncementsToDisplay] = useState([]);
  const [tags, setTags] = useState(options);

  useEffect(() => {
    async function a() {
      const querySnapshot = await getDocs(collection(db, "announcements"));

      const announcementsRead = querySnapshot.docs.map((doc) => doc.data());

      console.log(announcementsRead);

      setAnnouncements(announcementsRead);
    }
    a();
  }, []);

  useEffect(() => {
    console.log(tags);
    setAnnouncementsToDisplay(
      announcements.filter((e) => {
        console.log(tags);
        for (let val of tags) {
          console.log(val);
          if (val.value == e.type) return true;
        }

        return false;
      })
    );
  }, [announcements, tags]);

  const handleSelectCategory = () => {
    // var category = document.getElementById("club-categories").value;
    // if (category === "") {
    // }
    // for (var i = 0; i < announcements.length; i++) {
    //   if (announcements[i].category === category) {
    //   }
    // }
  };

  return (
    <>
      <div className="navigation-bar">
        <a href="" id="club-list-tab">
          Club Announcement Board
        </a>
      </div>
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
        <Flex justifyContent="space-around">
          <Box width="70%">
            <Announcements announcements={announcementsToDisplay} />
          </Box>
          <Box width="30%">
            <MultiSelect
              options={options}
              value={tags}
              onChange={setTags}
              labelledBy="Filter by Category:"
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Dashboard;
