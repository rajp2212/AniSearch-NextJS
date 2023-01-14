import {
    Box,
    Center,
    Divider,
    Flex,
    Heading,
    Image,
    Tag,
    Text
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { NextPage } from 'next';
  import { useRouter } from 'next/router';
  import React, { useEffect, useState } from 'react';
  import AnimeDataHeader from '../../components/anime-data-header';
  import List from '../../components/card/list';
  import Nav from '../../components/nav/nav';
  import Player from '../../components/player';
  import { FetchedData, ICoverImage, IEpisodes } from '../../utils/inferface';
  const fetchTvEp = async (id: string, ep: string) => {
    try {
      const { data } = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/episodes/${ep}`
      );
      const { data: imagesData } = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/pictures`
      );
      const res: FetchedData = { data: data.data, images: imagesData.data[1].webp };
      
      return res;
    } catch (error) {
      console.log(error);
  
      return null;
    }
  };
  
  const fetchNonTvEp = async (id: string) => {
    try {
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      
      const res: FetchedData = { data: data.data, images: data.data.images.webp };
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  const PlayerPage: NextPage = () => {
    const router = useRouter();
    const [episodeData, setEpisodeData] = useState<IEpisodes>();
    const [loading, setLoading] = useState<boolean>(true);
    const [images, setImages] = useState<ICoverImage>();
    const { anime, id, ep, Tep, title, type } = router.query;
  
    useEffect(() => {
      if (!router.isReady) return;
  
      setTimeout(() => {
        if (episodeData === undefined) {
          (async () => {
            try {
              //check if type of anime to send requesto to the right endpoint
              const res: FetchedData =
                type === 'TV'
                  ? ((await fetchTvEp(
                      id?.toString() as string,
                      ep?.toString() as string
                    )) as FetchedData)
                  : ((await fetchNonTvEp(
                      id?.toString() as string
                    )) as FetchedData);
  
              if (res === null) return;
              //parse data
              const data: FetchedData = JSON.parse(JSON.stringify(res));
              setImages(data.images);
              setEpisodeData(data.data);
              setLoading(false);
            } catch (error) {
              console.log(`Error: ${error}`);
              setLoading(false);
            }
          })();
        }
      }, 1000);
    }, [ep, episodeData, id, router.isReady, type]);
  
    //check if all the query is there
    if (!anime || !id || !ep || !Tep || !title || !type) {
      return <div>404</div>;
    }
  
    return (
      <Box backgroundColor={'white'}>
        <Nav />
        {loading ? (
          <Center>
            <Heading color={"black"} >Loading</Heading>
          </Center>
        ) : (
          <>
            <Box marginTop={'2vh'} backgroundColor={'white'}>
              <Box display={'flex'} flexDirection="column" alignItems={'center'}>
                <Player animeName={`${anime}`} />
                <Heading color={'white'} textAlign="left">
                  {title} 
                </Heading>
              </Box>
            </Box>
  
            <Box margin={'5vh  0  5vh 0'}>
              <Center>
                <Flex flexDirection={'column'}>
                  <Heading color={'whiteAlpha.700'}>Episodes</Heading>
                  <Divider minW={'50vw'} />
                  <Center>
                    <List
                      amount={parseInt(Tep?.toString() as string)}
                      title={title?.toString() as string}
                      mal_id={parseInt(id.toString() as string)}
                      type={type?.toString() as string}
                    />
                  </Center>
                </Flex>
              </Center>
            </Box>
  
            <AnimeDataHeader images={images} episodeData={episodeData}/>
          </>
        )}
      </Box>
    );
  
    function animeDataHeader() {
      return (
        <Box
          marginTop={'2vh'}
          backgroundColor={'#4E3088'}
          display={'flex'}
          flexDirection="row"
          justifyContent="space-around"
        >
          <div>
            <Box
              display={'flex'}
              justifyContent="space-between"
              flexDirection={'row'}
            >
              <Image
                src={
                  images?.large_image_url ||
                  'https://data.whicdn.com/images/343322467/original.jpg'
                }
                maxW="50vw"
                maxH="50vh"
                minW="15vw"
                minH="25vh"
                margin="1vh 0 1vh 0"
                alt="Thumbnail"
              />
              <div>
                <Box
                  maxW={'60vw'}
                  display="flex"
                  flexDirection={'column'}
                  justifyContent="space-between"
                  textAlign={'left'}
                  marginLeft="10vw"
                >
                  <Heading as="h1" size="xl" color={'black'} fontWeight="medium">
                    {episodeData?.title}
                    <Tag marginTop={'15px'} marginLeft="5px">
                      Type: {episodeData?.filler ? 'Filler' : 'Episodic'}
                    </Tag>
                  </Heading>
                  <Divider />
                  <Text color={'beige'} fontSize="1xl">
                    {episodeData?.synopsis ||
                      'Cannot find the synopsis for this anime'}
                  </Text>
                </Box>
              </div>
            </Box>
          </div>
        </Box>
      );
    }
  };
  
  export default PlayerPage;