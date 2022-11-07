import React from 'react'

import { Box, Image, Badge, Flex, Heading } from '@chakra-ui/react'

const badges = {
    "academic": "pink",
    "activism": "red",
    "arts": "orange",
    "cultural": "purple",
    "social": "yellow",
    "sports": "green",
    "volunteering": "teal",
    "other": "blue"
}

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time =  month + ' ' + date + ' ' + year + ' ' + hour + ':' + min
  return time;
}

export default function Announcement({ announcement }) {

    return (
      <Flex
        borderWidth="1px"
        borderRadius="7px"
        overflow="hidden"
        style={{
          backgroundColor: "rgba(214, 214, 255, 0.9)",
          marginTop: "1.5em",
        }}
        flexDirection="row"
        gap="0.5em"
        height="100px"
      >
        <Box>
          <Image src={announcement.icon} style={{ height: "100px" }} />
        </Box>
        <Box>
          <Box>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={badges[announcement.type] || "gray"}
            >
              {announcement.type}
            </Badge>
            <Heading as="h5" size="sm" marginTop="0.4em">
              {announcement.name} &bull; {timeConverter(announcement.time)}
            </Heading>
          </Box>
          <Box paddingRight="1em">{announcement.text}</Box>
        </Box>
      </Flex>
    );
}