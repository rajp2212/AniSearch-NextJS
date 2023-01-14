/* eslint-disable @next/next/no-img-element */
import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { AnimeData, IAnime } from '../../utils/inferface';

const Card: React.FC<IAnime> = ({ title, image, mal_id, router }) => {
  return (
    <Box
    onClick={() => router.push(`/anime/${mal_id}`)}
    position="relative"
      display="flex"
      cursor={"pointer"}
      justifyContent={'space-between'}
      borderRadius="10px"
      title='Click to see more'
      flexDirection="column"
      maxW={'250px'}
      maxH={"400px"}
    >
      
      <Image
        src={image.large_image_url}
        alt={title}
        objectFit="contain"
        borderRadius={"10px"}
       
        opacity="0.9"
        
      />
      
        <Heading
          as="h1"
          size="sm"
          fontWeight="bold"
          textAlign={"center"}
          color={'black'}
          minHeight="5vh"
        >
          {
            //if the title is too long, it will be cut off and add ...
            title.length > 65 ? title.substring(0, 65) + '...' : title
          }
        </Heading>
        
    </Box>
  );
};

export default Card;