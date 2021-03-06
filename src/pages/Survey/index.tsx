import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from '../../store';
import theme from '../../utils/theme';
import map from 'lodash/map';
import { Redirect } from 'react-router';

import { iSurvey, ITechShot } from '../../utils/interfaces';
import formatDate from '../../utils/formtData';
import { selectSurvey, surveyRequestById } from '../../store/survey';
import { 
	techshotRequest, 
	selectTechshots, 
	techshotActionDone, 
	selectTechshotAction 
} from '../../store/techShot';

import { TabBar, Text, CardTechShot, ModalCreateTechShot } from '../../components';
import { Button } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AccessTime from '@material-ui/icons/AccessTime';
import TouchApp from '@material-ui/icons/TouchApp';
import AddIcon from '@material-ui/icons/Add';


interface IProps {
	match: any;
}
class Survey extends React.PureComponent<IMapDispatchToProps & IMapStateToProps & IProps> {

	public state = { openModalTechshot: false, expanded: '',};

	public componentDidMount() {
		const { match: { params: { surveyId } } } = this.props;
		this.props.surveyRequestById(surveyId);
		this.props.techshotRequest(surveyId);
	}

	public componentDidUpdate(){
		if(this.props.techshotAction){
			const { match: { params: { surveyId } } } = this.props;
			this.props.techshotRequest(surveyId);
			this.props.techshotActionDone();
		}
	}

	public handleModalTechShot = () => {
		this.setState({ openModalTechshot: !this.state.openModalTechshot });
	}

	public handleChangePanel = (panel: any) => () => {
    this.setState({
      expanded: panel,
    });
  };	

	public render() {
		const { openModalTechshot, expanded } = this.state;
		const { match: { params: { surveyId } }, techshots, survey } = this.props;
		const { title, startTime, endTime, date, surveyEndDate } = survey;

		if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
		return (
			<>
				<TabBar />
				<Wrapper>
					<Text bold size={24}>
						{title}
					</Text>

					<InfoContainer>
						<Info>
							<CalendarToday style={{ color: theme.colors.gray60 }} />
							<Text bold> Data do Evento: </Text>
							<Text> {formatDate(date)} </Text>
						</Info>
						<Info>
							<AccessTime style={{ color: theme.colors.gray60 }} />
							<Text bold> Horário do Evento: </Text>
							<Text> {startTime} às {endTime} </Text>
						</Info>
						<Info>
							<TouchApp style={{ color: theme.colors.gray60 }} />
							<Text bold> Data limite para votação: </Text>
							<Text> {formatDate(surveyEndDate)} </Text>
						</Info>
					</InfoContainer>

					<ButtonCotainer>
						<ButtomAction onClick={this.handleModalTechShot}>
							<AddIcon fontSize='small' /> Adicionar TechShot
						</ButtomAction>
					</ButtonCotainer>


					{ techshots.length > 0 
						?	map(techshots, techshot => <CardTechShot 
							expanded={expanded} 
							key={techshot._id} 
							techshot={techshot} 
							handleChangePanel={this.handleChangePanel}
							/>)

						: <Container>
								<Text size={14}> Ainda não há techshots para esta enquete </Text>
							</Container>
					}

					<ModalCreateTechShot 
						open={openModalTechshot} 
						handleClose={this.handleModalTechShot} 
						surveyId={surveyId}/>
				</Wrapper>
			</>
		);
	}
}

// MAP TO PROPS
interface IMapStateToProps {
	survey: iSurvey;
	techshots: ITechShot[];
	techshotAction: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	survey: selectSurvey(state),
	techshots: selectTechshots(state),
	techshotAction: selectTechshotAction(state),
});

interface IMapDispatchToProps {
	surveyRequestById: (surveyId: string) => void;
	techshotRequest: (surveyId: string) => void;
	techshotActionDone: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	surveyRequestById: (surveyId: string) => dispatch(surveyRequestById.started({ surveyId })),
	techshotRequest: (surveyId: string) => dispatch(techshotRequest.started({ surveyId })),
	techshotActionDone: () => dispatch(techshotActionDone()),
})

// STYLE
const Info = styled.div`
  display: flex;
	margin: 14px 30px 0px 0px;
`;

const InfoContainer = styled.div`
	display: flex;
	margin: 20px 0px 30px;
	flex-wrap: wrap;
`;

const Wrapper = styled.div`
  margin: 20px;
`;

const ButtonCotainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;

const Container = styled.div`
  display: flex;
	width: 100%;
	justify-content: center;
`;

const ButtomAction = styled(Button)`
&&{
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.white};
	text-transform: none;
	font-size: 15px;
	margin: 0px 20px 20px 0px;
  height: 31px;
	border-radius: 35px;
  align-items: center;
  padding: 0px 10px;
}
` as typeof Button;
export default connect(mapStateToProps, mapDispatchToProps)(Survey);