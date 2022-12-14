import { Link } from "react-router-dom";

import { Box, Heading, Center, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import './Home.css'

export default function Home() {
  return (
    <Center h="100vh" w="vw" style={{overflow:"hidden"}}>
      <Box w="75%">
        <Heading fontSize={["7xl", "7xl", "9xl"]} marginLeft="-0.02em">
          ClubCall
        </Heading>
        <Heading fontSize={["2xl", "2xl", "3xl"]} color="gray" marginTop="-0.8em">
          Aggregate Discord announcements. Anywhere.
        </Heading>

        <Link to="/dashboard">
          <Button colorScheme="purple" size={["md", "md", "lg"]} marginTop="1em">
            Check it out <ArrowForwardIcon />
          </Button>
        </Link>
      </Box>
    </Center>
  );
}
