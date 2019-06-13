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
}

function CardPhoto(props: IProps) {
  const { item, type, redirect } = props;
  return (
    <LinkTo to={type==='event'? redirect! : ''}>
    <CardWrapper>
      <CardActionArea>
        <CardMedia
          style={{ height: '140px' }}
          image="https://picsum.photos/800/400?random=5"
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

const CardWrapper = styled(Card)`
&&{
  margin: 10px;
  height: 240px;
}

` as typeof Card;

const Container = styled.div`
  display: flex;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
`;
export default CardPhoto;