import { Link } from "react-router-dom";

import { Box, Heading, Center, Container, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'


export default function Home() {
  return (
    <Center h="100vh" w="100vw">
      <Box w="75%">
        <Heading fontSize="9xl" marginLeft="-0.02em">
          ClubCall
        </Heading>
        <Heading fontSize="3xl" color="gray" marginTop="-0.8em">
          Aggregate Discord announcements. Anywhere.
        </Heading>

        <Link to="/dashboard">
          <Button colorScheme="purple" size="lg" marginTop="1em">
            Check it out <ArrowForwardIcon />
          </Button>
        </Link>
      </Box>
    </Center>
  );
}
