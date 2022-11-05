import React from 'react'

import { Box, Image, Badge, Flex, Heading } from '@chakra-ui/react'


//   <div className="club">
//     <h1 className="club-name">
//       <img
//         style={{ borderRadius: "50%", height: 50, width: 50 }}
//         src={club.icon}
//         alt=""
//       />
//       {club.name}
//     </h1>
//     <p className="message">{club.text}</p>
//     <button id="add-club"> + </button>
//   </div>

const badges = {
    "academic": "teal",
    "sports": "green",
    "other": "pink"
}

export default function Club({ club }) {
    return (
      <Flex
        maxW="lg"
        borderWidth="1px"
        borderRadius="7px"
        overflow="hidden"
        style={{ backgroundColor: "rgb(188, 188, 252)" }}
        flexDirection="row"
        gap="0.5em"
        height="100px"
      >
        <Box>
          <Image src={club.icon} style={{ height: '100px' }} />
        </Box>
        <Box>
          <Box>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={badges[club.type] || "gray"}
            >
              {club.type}
            </Badge>
            <Heading
              as="h5"
              size="sm"
            >
              {club.name}
            </Heading>
          </Box>
          <Box>{club.text}</Box>
        </Box>
      </Flex>
    );
}