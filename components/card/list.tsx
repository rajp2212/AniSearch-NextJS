import { Box, Grid, Tag } from '@chakra-ui/react';
import React from 'react';

export interface dataProps {
  amount: number;
  title: string;
  mal_id: number;
  type: string;
}

const List: React.FC<dataProps> = ({ amount, title, mal_id, type}) => {
  const url = `${title.replaceAll(/\s|[&\/\\#, +()$~%.'":*?<>{};!-]/g, ' ').split(" ").join(" ").replaceAll(/\s+/g, '-').toLocaleLowerCase()}`;
  
  //if there is no episode data, return nothing
  if (amount === null) {
    return (
      <Tag
        padding={'15px'}
        _hover={{ backgroundColor: '#2A2164', color: 'white' }}
        backgroundColor="#7741BD"
      >
        N/A
      </Tag>
    );
  }
  return (
    <Grid templateColumns="repeat(15, 15fr)" gap={6}>
      {[...Array(amount)].map((_, index) => (
        <Box
          key={index}
          cursor="pointer"
          title={`Click to watch EP${index + 1}`}
        >
          <a
            href={`/player/${
              url.endsWith('-')
                ? url.concat(`episode-${index + 1}`)
                : url.concat(`-episode-${index + 1}`)
            }?id=${mal_id}&ep=${index + 1}&Tep=${amount}&title=${title}&type=${type}`}
          >
            <Tag
              padding={'15px'}
              _hover={{ backgroundColor: '#2A2164', color: 'white' }}
              backgroundColor="#7741BD"
            >
              {index + 1}
            </Tag>
          </a>
        </Box>
      ))}
    </Grid>
  );
};

export default List;