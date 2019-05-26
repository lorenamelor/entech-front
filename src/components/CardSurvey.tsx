import * as React from 'react';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';
import { Text } from '../components';
import CardActionArea from '@material-ui/core/CardActionArea';

class CardSurvey extends React.PureComponent {
  public render() {
    return (
      <CardWrapper>
        <CardAction>
          <Text bold size={17}>
            Enquete
          </Text>
          <Info>
            <Text bold>
              Data limite para votação: 
            </Text>
            <Text>
              19 de abril
            </Text>
            <div style={{marginRight: '5px', display: 'flex'}}>
              <Text bold>
                Data do evento: 
              </Text>
              <Text>
                15 de maio
              </Text>
            </div>
          </Info>
        </CardAction>
      </CardWrapper>

    );
  }
}

// STYLE

const CardWrapper = styled(Paper)`
&&{
	height: 60px;
  width: 48%;
  margin: 10px;
  display: flex;
}
` as typeof Paper;

const CardAction = styled(CardActionArea)`
&&{
	background-color: ${props => props.theme.colors.white};
	display: flex;
	flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-left: 15px solid #e68b8b;
  padding: 0 5px;
  border-radius: 3px;
}
` as typeof CardActionArea;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

export default CardSurvey;