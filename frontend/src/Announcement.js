import React from 'react'

import { Box, Image, Badge, Flex, Heading } from '@chakra-ui/react'

const badges = {
    "academic": "pink",
    "activism": "red",
    "arts": "coral",
    "cultural": "orange",
    "social": "yellow",
    "sports": "green",
    "volunteering": "teal",
    "other": "lavender"
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
              {announcement.name}
            </Heading>
          </Box>
          <Box paddingRight="1em">{announcement.text}</Box>
        </Box>
      </Flex>
    );
}