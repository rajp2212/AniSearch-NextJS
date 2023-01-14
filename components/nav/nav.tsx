import { Box, Input,Divider  } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import React, { KeyboardEvent } from 'react';
import { ChevronLeftIcon,SearchIcon } from '@chakra-ui/icons';
import Logo from './logo';
import { useRouter } from 'next/router';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { inputState } from '../../utils/states/input';
import { searchAnime } from '../../utils/states/anime';
import { searchPageLoadingStatus } from '../../utils/states/loading';


//check if the input is empty
const isEmpty = (input: string) => {
    return input.trim() === '';
};


const Nav = () => {
  const router = useRouter();
  const inputRef = React.createRef<HTMLInputElement>();
  const [input, setInput] = useRecoilState<string>(inputState);
  const [loading, setLoading] = useRecoilState<boolean>(searchPageLoadingStatus);

  const resetSearchAnime = useResetRecoilState(searchAnime);
  let dateNow = new Date().toDateString();
  const dateText=dateNow.slice(4,10)+"th";
  const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter')
    {
      if(isEmpty(input)) alert('Please enter a valid input');
      //reset the search anime state
      resetSearchAnime();
      //set the loading state
      setLoading(true);
      
      if(!isEmpty(input)) router.push(`/search?q=${input}`);

    }
  }

  return (
    <>
    <Box
      minWidth={'100vw'}
      backgroundColor="white"
      display="flex"
      justifyContent={'center'}
      alignItems={"center"}
      minHeight="50px"
     
    >
      <Box display={'flex'}>
      
        <ChevronLeftIcon
          fontSize={'4xl'}
          cursor="pointer"
          onClick={() => router.back()}
        />
        <Logo textNow={"Anime"} sz="lg" fw="bold" />
      </Box>
      <IconButton marginLeft={"18px"} aria-label='Search database' icon={<SearchIcon />} />
      <Input
      
      marginRight={"18px"}
        ref={inputRef}
        type={'text'}
        className="noSubmit"
        onKeyPress={handleKeyPress}
        width={'25%'}
        size="sm"
        onChange={(e) => setInput(e.target.value)}
        variant={'filled'}
        placeholder={`Search...`}
        background={'white'}
        border="1.5px solid #040B25"
        borderRadius={"15px"}
      />
     <Logo  textNow={dateText} sz="sm" fw="normal" />
    </Box>
    <hr />
    </>
  );
}
export default Nav;