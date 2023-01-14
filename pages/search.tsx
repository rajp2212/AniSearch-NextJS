import {
    Box,
    Center,
    Divider,
    Grid,
    Heading
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { NextPage } from 'next';
  import { useRouter } from 'next/router';
  import React, { useEffect } from 'react';
  import { atom, useRecoilState, useResetRecoilState } from 'recoil';
  import Card from '../components/card/card';
  import Nav from '../components/nav/nav';
  import { AnimeData } from '../utils/inferface';
  import { CurrentAnime, searchAnime } from '../utils/states/anime';
  import { searchPageLoadingStatus } from '../utils/states/loading';
  
  export const Loading = atom<boolean>({
      key: 'loading',
      default: false,
  });
  
  
  const Search: NextPage = () => {
    const [animeData, setAnimeData] = useRecoilState<AnimeData[] | undefined>(searchAnime);
    const [loading, setLoading] = useRecoilState<boolean>(searchPageLoadingStatus);
    const router = useRouter();
    const { q } = router.query;
  
    const resetCurrentAnime = useResetRecoilState(CurrentAnime);
  
  
    useEffect(() => {
      //clear the current anime
      resetCurrentAnime();
      //get the query from the url
  
      if (q === undefined) router.back();
  
      //get the anime data from the api
      if (animeData === undefined) {
        (async () => {
          const { data } = await axios.get(
            `https://api.jikan.moe/v4/anime?q=${q}&sfw`
          );
  
          //parse the data
          const result: AnimeData[] = JSON.parse(JSON.stringify(data.data));
          //sort the array by the type
          result.sort((a, b) => {
            if (a.type === 'TV') return -1;
            if (b.type === 'TV') return 1;
            return 0;
          });
          //set the data
          setAnimeData(result);
          setLoading(false);
        })();
      }
    });
    return (
      <div>
        {loading ? (
          <Box>
            <Heading>Loading...</Heading>
          </Box>
        ) : (
          <Box background="white">
            <Nav />
            <Center marginTop="3vh">
              <Box>
              <Heading color="whiteAlpha.700" as="h1" size="lg" fontWeight="bold">
              &quot;{q?.toString().toLocaleUpperCase()}&quot;
              </Heading>
              <Divider />
              <Grid templateColumns="repeat(5, 2fr)" gap={6}>
                {animeData?.map((anime: AnimeData, index) => {
                  return (
                    <Card
                      key={index}
                      title={anime.title}
                      image = {anime.images.webp}
                      mal_id={anime.mal_id.toString()}
                      router={router}
                      content={anime.synopsis}
                      url={anime.url}  
                      />
                  );
                })}
              </Grid>
              </Box>
            </Center>
          </Box>
        )}
      </div>
    );
  };
  
  export default Search;