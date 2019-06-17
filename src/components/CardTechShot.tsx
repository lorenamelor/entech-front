import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash/map';
import theme from '../utils/theme';
import { ITechShot, IPoll } from '../utils/interfaces';
import { techshotDelete, techshotPoll } from '../store/techShot';
import { Text, ModalCreateTechShot, ModalConfirmation } from '../components';
import { 
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Avatar,
  Chip,
  Button} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Timer as TimerIcon,
  Person as PersonIcon} from '@material-ui/icons';
import { 
  Edit as EditIcon,
  Close as DeleteIcon } from '@material-ui/icons';
import { getUser } from '../store/user';


interface IProps {
  techshot: ITechShot;
  expanded: string,
  handleChangePanel: (id: string) => () => void;
}

class CardTechShot extends React.PureComponent<IMapDispatchToProps & IProps> {

  public state = {
    openModalEdit: false,
    openModalDelete: false,
  };

  public handleModalEdit = () => {
    this.setState({ openModalEdit: !this.state.openModalEdit });
  }

  public handleModalDelete = () => {
    this.setState({ openModalDelete: !this.state.openModalDelete });
  }

  public handleTechshotDelete = (techshotId: string) => () => {
    this.props.techshotDelete(techshotId);
    this.handleModalDelete();
  }

  public handleTechshotpoll = (techShotId: string, userId: string) => () => {
    this.props.techshotPoll({techShotId, userId})
  }

  public render() {
    const { openModalEdit, openModalDelete } = this.state;
    const { expanded, techshot, handleChangePanel } = this.props;
    const { _id, title, duration, keywords, speaker, description, countPolls, surveyId, userId } = techshot;

    return (
      <CardWrapper onChange={handleChangePanel(_id!)} expanded={expanded === _id}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Summary>
            <Photo alt="Remy Sharp" src={`https://picsum.photos/600/400?random=${Math.random()}`} />
            <SummaryInfo>
              <Header>
                <Text bold size={15}> {title} </Text>
                { getUser('_id') === userId
                  ?
                <ContainerButtons>
                  <BtnAction color={theme.colors.orange} onClick={this.handleModalEdit}>
                    <EditIcon style={{ fontSize: '15px' }} />
                  </BtnAction>
                  <BtnAction color={theme.colors.red} onClick={this.handleModalDelete}>
                    <DeleteIcon style={{ fontSize: '15px' }} />
                  </BtnAction>
                </ContainerButtons>
                : null }
              </Header>

              <InfoContainer>
                <Info>
                  <PersonIcon style={{ color: theme.colors.gray60 }} />
                  <Text bold> Palestrante: </Text>
                  <Text> {speaker} </Text>
                </Info>
                <Info>
                  <TimerIcon style={{ color: theme.colors.gray60 }} />
                  <Text bold> Duração: </Text>
                  <Text> {duration} min </Text>
                </Info>
              </InfoContainer>
            </SummaryInfo>
          </Summary>

          <Container>
            <Votes>
              <Text bold size={22}> { countPolls } </Text>
              <Text>votos</Text>
            </Votes>
            <Separator />
            <BtnVote 
              onClick={this.handleTechshotpoll(_id!, getUser('_id'))}>
              Votar
            </BtnVote>
          </Container>
        </ExpansionPanelSummary>

        <Details>
          <Text bold>Sobre:</Text>
          <Text>
            {description}
          </Text>
        </Details>
        <Details>
          <Text bold>Palavras Chaves:</Text>
          <ContainerChips>
            {map(keywords, keyword => <ChipWords key={keyword} label={keyword} />)}
          </ContainerChips>
        </Details>

        {openModalEdit && <ModalCreateTechShot
          open={openModalEdit}
          handleClose={this.handleModalEdit}
          techshotId={_id}
          surveyId={surveyId!} />
        }
        {openModalDelete && <ModalConfirmation
          text={`Deseja mesmo apagar a techshot "${title}" ?`}
          open={openModalDelete}
          handleClose={this.handleModalDelete}
          action={this.handleTechshotDelete(_id!)} />
        }

      </CardWrapper>
    );
  }
}

// MAP TO PROPS
interface IMapDispatchToProps {
  techshotDelete: (techshotId: string) => void;
  techshotPoll: (payload: IPoll) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  techshotDelete: (techshotId: string) => dispatch(techshotDelete.started({ techshotId })),
  techshotPoll: (payload: IPoll) => dispatch(techshotPoll.started(payload)),
})


// STYLE
const CardWrapper = styled(ExpansionPanel)`
&&{
  margin: 0px 10px;
  background-color: ${props => props.theme.colors.white};
  align-items: flex-start;
  border-left: 15px solid ${props => props.theme.colors.primary};
  padding: 0 5px;
  border-radius: 5px;
  display: 'flex';
  flex-wrap: wrap;
  
  @media (max-width: 650px){
    .MuiExpansionPanelSummary-content-96{
      display: flex;
      flex-wrap: wrap;
    }
  }
}
` as typeof ExpansionPanel;

const SummaryInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin: 7px 7px 7px 0px;
`;

const Summary = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  @media (max-width: 490px){
    flex-direction: column;
  }
`;

const Details = styled(ExpansionPanelDetails)`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
` as typeof ExpansionPanelDetails;

const Header = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3px;
  align-content: center;
`;

const Container = styled.div<{buttons?: boolean}>`
  display: flex;
  align-items: center;
  padding-right: 65px;

  @media (max-width: 650px){
    width: 100%;
    margin-top: 15px;
  }
`;

const ContainerButtons = styled.div<{buttons?: boolean}>`
  display: flex;
  align-items: center;
  position: absolute;
  float: right;
  right: 6px;
  top: 6px;
`;

const Photo: any = styled(Avatar)`
&&{
  margin-right: 20px;
  height: 60px;
  width: 60px;
}
` as typeof Avatar;

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px){
    flex-direction: row;
  }
`;

const Separator = styled.hr`
  border: none;
  border-left: 2px solid ${props => props.theme.colors.gray40};
  height: 90%;
  width: 2px;
  margin: 0px 10px;
`

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

const Info = styled.div`
  display: flex;
  margin-right: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  flex: 1;
  width: 100%;
`;

const BtnVote: any = styled(Button)`
&&{
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-transform: none;
  font-size: 15px;
  margin: 0px 5px;
  height: 30px;
  border-radius: 35px;
  align-items: center;
  padding: 0px 10px;

  @media (max-width: 650px){
    width: 100%;
  }
}
` as typeof Button;

const ChipWords: any = styled(Chip)`
&&{
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  margin: 4px 6px 0px 0px;
  align-items: center;
}
` as typeof Button;

const ContainerChips = styled.div`
  display: flex;
  align-items: center;
`;
export default connect(null, mapDispatchToProps)(CardTechShot);
