import * as React from 'react';
import styled from 'styled-components';
import formatDate from '../utils/formtData';
import { Paper, Button } from '@material-ui/core';
import { Text, ModalCreateSurvey, ModalConfirmation } from '../components';
import { iSurvey } from '../utils/interfaces';
import theme from '../utils/theme';
import { Dispatch } from 'redux';
import { surveyDelete } from '../store/survey';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface IProps {
  survey: iSurvey,
}
class CardSurvey extends React.PureComponent<IProps & IMapDispatchToProps> {

  public state = { 
    openModalEdit: false,
    openModalDelete: false,
  };

	public handleModalEdit = () => {
		this.setState({openModalEdit : !this.state.openModalEdit});
  }
  
  public handleModalDelete = () => {
		this.setState({openModalDelete : !this.state.openModalDelete});
  }
  
  public handleSurveyDelete = (surveyId: string) => () => {
    this.props.surveyDelete(surveyId);
    this.handleModalDelete();
  }

  public render() {
    const { _id, title, date, surveyEndDate } = this.props.survey;
    const { openModalEdit, openModalDelete } = this.state;

    return (
      <CardWrapper>
          <Header>
            <Text bold size={15}>
              {title}
            </Text>
            <ContainerBtn>
              <LinkAction color={theme.colors.primary} to={`/survey/${_id}`}>
                Ver
              </LinkAction>
              <BtnAction color={theme.colors.orange} onClick={this.handleModalEdit}>
                Editar
              </BtnAction>
              <BtnAction color={theme.colors.red} onClick={this.handleModalDelete}>
                Excluir
              </BtnAction>
            </ContainerBtn>
          </Header>

          <Info>
            <Text bold>
              Data limite para votação: 
            </Text>
            <Text>
              {formatDate(date)}
            </Text>
            <div style={{marginLeft: '10px', display: 'flex'}}>
              <Text bold>
                Data do evento: 
              </Text>
              <Text>
                {formatDate(surveyEndDate)}
              </Text>
            </div>
          </Info>

        { openModalEdit && <ModalCreateSurvey 
          open={openModalEdit} 
          handleClose={this.handleModalEdit} 
          surveyId={_id}/>
        }
        { openModalDelete && <ModalConfirmation 
          text={`Deseja mesmo apagar a enquete "${title}" ?`}
          open={openModalDelete} 
          handleClose={this.handleModalDelete} 
          action={this.handleSurveyDelete(_id!)}/>
        }
      </CardWrapper>

    );
  }
}

// MAP TO PROPS
interface IMapDispatchToProps {
  surveyDelete: (surveyId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  surveyDelete: (surveyId: string) => dispatch(surveyDelete.started({surveyId})),
})


// STYLE
const CardWrapper = styled(Paper)`
&&{
	height: 70px;
  width: 46%;
  margin: 10px;
  display: flex;
  background-color: ${props => props.theme.colors.white};
	flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-left: 15px solid ${props => props.theme.colors.primary};
  padding: 0 5px;
  border-radius: 5px;
}
` as typeof Paper;


const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
`;

const ContainerBtn = styled.div`
  display: flex;
`;

const BtnAction: any = styled(Button)`
&&{
	background-color: ${props => props.color};
	color: ${props => props.theme.colors.white};
	text-transform: none;
	font-size: 12px;
	margin: 4px;
  height: 20px;
	border-radius: 35px;
  align-items: center;
  padding: 0px 10px;
}
` as typeof Button;

const LinkAction: any = styled(Link)`
&&{
	background-color: ${props => props.color};
	color: ${props => props.theme.colors.white};
	text-transform: none;
  text-decoration: none;
	font-size: 12px;
	margin: 4px;
  height: 20px;
	border-radius: 35px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  width: 45px;
  justify-content: center;
}
`;

export default connect(null, mapDispatchToProps)(CardSurvey);
