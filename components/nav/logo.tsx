import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { HeadingText } from '../../utils/inferface';

const Logo: React.FC<HeadingText>  = ({textNow,sz,fw}) => {
    return(
        <Box>
            <Heading as="h1" size={sz} fontWeight={fw} color={"black"}>
                {textNow}
            </Heading>
        </Box>
    )
}


export default Logo;