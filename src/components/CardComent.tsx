import * as React from 'react';
import styled from 'styled-components';
import { Paper, Button } from '@material-ui/core';
import { Text, ModalConfirmation } from '../components';
import theme from '../utils/theme';
import {
  Close as DeleteIcon,
} from '@material-ui/icons';

// IMPLEMENTAÇÕES FUTURAS
class CardComent extends React.PureComponent {

  public state = {
    openModalDelete: false,
  };

  public handleModalDelete = () => {
    this.setState({ openModalDelete: !this.state.openModalDelete });
  }

  public handleSurveyDelete = (surveyId: string) => () => {
    this.handleModalDelete();
  }

  public render() {
    const { openModalDelete } = this.state;

    return (
      <CardWrapper>

        <Header>
          <Text bold wight size={15}>
            Lorena Carla
          </Text>
            <ContainerBtn>
              <BtnAction color={theme.colors.red} onClick={this.handleModalDelete}>
                <DeleteIcon style={{ fontSize: '15px' }} />
              </BtnAction>
            </ContainerBtn>
        </Header>

        <Text bold size={15}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim aliquet lorem nec auctor
        </Text>

        {openModalDelete && <ModalConfirmation
          text={`Deseja mesmo apagar este comentário ?`}
          open={openModalDelete}
          handleClose={this.handleModalDelete}
          action={this.handleSurveyDelete('')} />
        }
      </CardWrapper>

    );
  }
}

// STYLE
const CardWrapper = styled(Paper)`
&&{
  margin: 10px 0px;
  display: flex;
  background-color: ${props => props.theme.colors.white};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
}
` as typeof Paper;

const Header = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

const ContainerBtn = styled.div`
  display: flex;
  margin-left: 10px;
`;

const BtnAction: any = styled(Button)`
&&{
	background-color: ${props => props.color};
	color: ${props => props.theme.colors.white};
  text-transform: none;
  margin: 4px 2px;
  padding: 4px;
  border-radius: 35px;
  min-width: unset;
  max-height: 23px;
}
` as typeof Button;

export default CardComent;