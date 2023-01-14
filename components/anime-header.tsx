import {
    Box,
    Tag,
    Image,
    Heading,
    Divider,
    Flex,
    Button,
    Text
  } from '@chakra-ui/react';
  import React from 'react';
  import { CurrentAnime } from '../utils/states/anime';
  import { useRecoilValue } from 'recoil';
  import { AnimeData } from '../utils/inferface';
  import { ChevronLeftIcon} from '@chakra-ui/icons';

import { useRouter } from 'next/router';
  
  const AnimeHeader: React.FC = () => {
    const router = useRouter();
    const data = useRecoilValue<AnimeData | null>(CurrentAnime);
    const url =`https://gogoanime.fi/${data?.title.replaceAll(/\s|_|:|\.|-/gm, "-").replaceAll("--", "-").toLocaleLowerCase()}`
    
    return (
      <>
      
      <Box
        marginTop={'3vh'}
        backgroundColor={'white'}
        display={"grid"}
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        gridGap={"10px"}
        gridTemplateRows={'0.1fr 1fr 0.1fr'}
      >
        <Heading gridColumn={"2/4"} as="h1" size="md" color={'black'} fontWeight="bold" cursor="pointer"
          onClick={() => router.push('/')}>
      <ChevronLeftIcon
          fontSize={'4xl'}
          />
          Go Back To Main
          </Heading>
          <hr />
        <Box gridColumn={"2/3"} gridRow={"2/3"} >
          <div>
            <Box
              display="flex"
              justifyContent={'space-between'}
              position="absolute"
              marginTop="5px"
              marginLeft="1px"
            >
              <Box id="AnimeType">
                <Tag color="white" backgroundColor={'#2A2164'}>
                  {data?.type}
                </Tag>
              </Box>
              <Box id="AnimeEpisodeCount">
                <Tag color="white" backgroundColor={'#2A2164'}>
                  {data?.episodes}EP
                </Tag>
              </Box>
            </Box>
          </div>
          <Image
            src={data?.images.jpg.large_image_url}
            maxW="50vw"
            maxH="50vh"
            minW="15vw"
            minH="25vh"
            alt={data?.title}
            margin="1vh 0 1vh 0"
          />
        </Box>
        <Box
          gridColumn={{base:"2/4",lg:"3/4" }}
          gridRow={{base:"3/4",lg:"2/4"}}
          maxW={'60vw'}
          display="flex"
          flexDirection={'column'}
          justifyContent="space-between"
        >
          <Heading as="h1" size="lg" color={'black'} fontWeight="bold">
            {data?.title_english}
            <Tag marginTop={'15px'} marginLeft="5px">
              Rating: {data?.rating}
            </Tag>
          </Heading>


          <Divider />
          <Flex  >
          <Heading as="h1" size={{base:"sm", lg:"md"}} color={'grey'} fontWeight="medium">
            Type <span style={{color:"#ECECEC"}} >----------------</span>
            <span style={{color:"black"}} >{data?.type}</span>
          </Heading>
          </Flex>
          <Box display={"flex"} >
          <Heading as="h1" size={{base:"sm", lg:"md"}} color={'grey'} fontWeight="medium">
            Source<span style={{color:"#ECECEC"}} >--------------</span>
            <span style={{color:"black"}} >{data?.source}</span>
          </Heading>
          </Box>
          <Box display={"flex"} >
          <Heading as="h1" size={{base:"sm", lg:"md"}} color={'grey'} fontWeight="medium">
            Episodes<span style={{color:"#ECECEC"}} >------------</span>
            <span style={{color:"black"}} >{data?.episodes} </span>
          </Heading>
          </Box>
          <Box display={"flex"} >
          <Heading as="h1" size={{base:"sm", lg:"md"}} color={'grey'} fontWeight="medium">
            Status<span style={{color:"#ECECEC"}} >---------------</span>
            <span style={{color:"black"}} >{data?.status}</span>
          </Heading>
          
          </Box>
          <Button
              width={"25%"}
              margin={"5px"}
              backgroundColor="#040B25"
              color={'white'}
              fontSize="12px"
            >
              <a href={url.endsWith("-") ? url.concat("episode-1") : url.concat("-episode-1")}>Start EP1</a>
            </Button>
          {/* <p>{data?.synopsis}</p> */}
          <Divider />
          <Flex>
            <Heading as="h2" size={{base:"sm",lg:"md"}} color={'black'} fontWeight="medium">
              Genre : {' '}
            </Heading>
            <Box>
              {data?.genres.map((genre: any, index: number) => {
                return (
                  <Tag
                    key={index}
                    color="white"
                    margin="0 5px 0 0"
                    backgroundColor={'#2A2164'}
                  >
                    {genre.name}
                  </Tag>
                );
              })}
            </Box>
          </Flex>
          <Divider />
          <Flex marginTop={"10px"} justifyContent={"space-between"} >
            {/* <Button
              marginRight={'10px'}
              backgroundColor="#040B25"
              color={'white'}
            >
              <a href={data?.url}>MAL Page</a>
            </Button> */}
            
            <Heading as="h1" size="md" color={'black'} fontWeight="Bolder" textAlign={"right"}  >
            {data?.score}
            <Heading as="h1" size="md" color={'grey'} fontWeight="bold">Score</Heading>
          </Heading>
          <Heading as="h1" size="md" color={'black'} fontWeight="Bolder" textAlign={"right"}  >
            {data?.rank}
            <Heading as="h1" size="md" color={'grey'} fontWeight="bold">Rank</Heading>
          </Heading>
          <Heading as="h1" size="md" color={'black'} fontWeight="Bolder" textAlign={"right"}  >
            {data?.popularity}
            <Heading as="h1" size="md" color={'grey'} fontWeight="bold">Popularity</Heading>
          </Heading>
          {/*  */}
          </Flex>
        </Box>
      </Box>
      </>
    );
  };
  
  export default AnimeHeader;