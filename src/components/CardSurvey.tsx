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
import { 
   Edit as EditIcon,
   Close as DeleteIcon, 
   RemoveRedEye as EyeIcon 
  } from '@material-ui/icons';

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
            <Text bold wight size={15}>
              {title}
            </Text>
            <ContainerBtn>
              <LinkAction color={theme.colors.primary} to={`/enquete/${_id}`}>
                <EyeIcon style={{ fontSize:'15px' }}/>
              </LinkAction>
              <BtnAction color={theme.colors.orange} onClick={this.handleModalEdit}>
                <EditIcon style={{ fontSize:'15px' }}/>
              </BtnAction>
              <BtnAction color={theme.colors.red} onClick={this.handleModalDelete}>
                <DeleteIcon style={{ fontSize:'15px' }}/>
              </BtnAction>
            </ContainerBtn>
          </Header>

          <Info>
            <Container>
              <Text bold>
                Data limite para votação: 
              </Text>
              <Text>
                {formatDate(date)}
              </Text>
            </Container>

            <Text bold>
              Data do evento: 
            </Text>
            <Text>
              {formatDate(surveyEndDate)}
            </Text>
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
  width: 47%;
  margin: 10px 0px;
  display: flex;
  background-color: ${props => props.theme.colors.white};
	flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-left: 15px solid ${props => props.theme.colors.primary};
  padding: 0 5px;
  border-radius: 5px;
  flex-wrap: wrap;
  
  @media (max-width: 960px){
    width: 100%;
  }
}
` as typeof Paper;


const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0px;
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

const LinkAction: any = styled(Link)`
&&{
	background-color: ${props => props.color};
	color: ${props => props.theme.colors.white};
  text-transform: none;
  margin: 4px 2px;
  padding: 4px;
  border-radius: 35px;
  min-width: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 15px;
}`;

const Container = styled.div`
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
`;
export default connect(null, mapDispatchToProps)(CardSurvey);
