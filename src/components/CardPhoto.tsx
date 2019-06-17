import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Text } from '../components';
import styled from 'styled-components';
import formatDate from '../utils/formtData';
import { Link } from 'react-router-dom';

interface IProps {
  item: any,
  type: string,
  redirect?: string,
  countItem?: number;
}

function CardPhoto(props: IProps) {
  const { item, type, redirect, countItem } = props;
  return (
    <LinkTo to={type==='event'? redirect! : ''}>
    <CardWrapper countItem={countItem}>
      <CardActionArea>
        <CardMedia
          style={countItem && countItem <= 3 ? { height: '240px' } : { height: '140px'} }
          image={`https://picsum.photos/600/400?random=${Math.random()}`}
          title="Evento"
        />
        <CardContent>
          <Text bold size={18}>
            {item.title}
          </Text>
          <Text>
            {type === 'event'
              ?
              <Container>
                <Text bold size={16}>
                  Data:
              </Text>
                <Text size={18}>
                  {formatDate(item.date)}
                </Text>
              </Container>
              :
              <Container>
                <Text bold size={16}>
                  Palestrante:
                </Text>
                <Text bold size={16}>
                  {item.speaker}
                </Text>
              </Container>
            }
          </Text>
        </CardContent>
      </CardActionArea>
    </CardWrapper>
    </LinkTo>
  );
}

const CardWrapper: any = styled(Card)<{countItem?: number}>`
&&{
  margin: 10px;
height: ${({countItem}) => countItem && countItem <= 3 ? '340px' : '240px'};
}

`;

const Container = styled.div`
  display: flex;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
`;
export default CardPhoto;