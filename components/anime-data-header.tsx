import { Box, Divider, Heading, Tag, Text, Image } from "@chakra-ui/react";
import { ICoverImage, IEpisodes } from "../utils/inferface";

type AnimeDataHeaderProps = {
    episodeData : IEpisodes | undefined;
    images : ICoverImage |  undefined;
}

const AnimeDataHeader:React.FC<AnimeDataHeaderProps> = ({images, episodeData})=>{
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


  export default AnimeDataHeader;