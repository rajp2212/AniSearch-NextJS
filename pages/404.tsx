import { Box, Heading, Image, Text} from '@chakra-ui/react';
import { NextPage } from 'next'
import Link from 'next/link'
import Nav from '../components/nav/nav';
import gif from '../images/404.gif'

const FourOhFour:NextPage = () => {
  return (
      <div>
          <Nav/>
          <Box
            display={"flex"}
            justifyContent={"center"}
            background="#191919"
            flexDirection="column"    
            alignItems={"center"}
            height={'100vh'}
          >
              <Image src={gif.src} alt='not found'/>
              <Heading color={"white"} >
                  <Link href={"/"}>Couldnt find what you were looking for</Link>
              </Heading>
               <Text color={"white"} textDecor="underline">
                    <Link href={"/"}>Go back to the homepage-&gt;</Link>
               </Text>
          </Box>
      </div>
  )
}


export default FourOhFour;