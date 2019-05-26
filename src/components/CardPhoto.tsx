import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Text } from '../components';
import styled from 'styled-components';

function CardPhoto() {
  return (
    <CardWrapper>
      <CardActionArea>
        <CardMedia
          style={{height: '140px'}}
          image="https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image.png"
          title="Evento"
        />
        <CardContent>
          <Text bold size={20}>
            Evento
          </Text>
          <Text>
            05 de maio
          </Text>
        </CardContent>
      </CardActionArea>
    </CardWrapper>
  );
}

const CardWrapper = styled(Card)`
&&{
  width: 220px;
  margin: 20px;
}
` as typeof Card;


export default CardPhoto;