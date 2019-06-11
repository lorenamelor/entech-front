import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import map from 'lodash/map';
import { IRootState } from '../../store';
import { iSurvey } from '../../utils/interfaces';
import AliceCarousel from 'react-alice-carousel';
import { TabBar, CardPhoto, CardSurvey, Text, ModalCreateSurvey } from '../../components';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
	surveyRequest,
	selectSurveys,
	selectSurveyAction,
	surveyActionDone,
	selectIsRequestSurvey
} from '../../store/survey';
import { userActionDone, userSigninClearState, selectSignIn } from '../../store/user';
import { eventRequest, selectEvents } from '../../store/event';

class Home extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {

	public state = { openModalSurvey: false };

	public componentDidMount() {
		if(this.props.surveyAction){
			this.props.userActionDone();
		}
		if(this.props.signin){
			this.props.userSigninClearState();
		}
		this.props.surveyRequest();
		this.props.eventRequest();
	}

	public componentDidUpdate() {
		if (this.props.surveyAction) {
			this.props.surveyRequest();
			this.props.surveyActionDone();
		}
	}

	public handleModalSurvey = () => {
		this.setState({ openModalSurvey: !this.state.openModalSurvey });
	}

	public render() {
		const { surveys, isRequestSurvey, events } = this.props;
		const { openModalSurvey } = this.state;

		const responsive = {
			0: { items: 1 },
			500: { items: 2 },
			750: { items: 3 },
			960: { items: 4 },
			1300: { items: 5 },
			1600: { items: 6 },
			1900: { items: 7 },
			2400: { items: 8 },
		}

		if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
		return (
			<>
				<TabBar />
				<Wrapper>
					
					<Text bold size={24}>
							Eventos
					</Text>

					<AliceCarousel 
						mouseDragEnabled 
						responsive = {responsive}
						stagePadding = {{
							paddingLeft: 10,
							paddingRight: 10,
						}}

						buttonsDisabled={true}
					>
					{map(events, (event: any) => <CardPhoto item={event} type='event' redirect={`/evento/${event._id}`}/> )}
					</AliceCarousel>

					<Header>
						<Text bold size={24}>
							Enquetes
						</Text>
						<ButtomAction onClick={this.handleModalSurvey}>
							<AddIcon fontSize='small' /> Adicionar Enquete
						</ButtomAction>
					</Header>
					<GroupSurvey>
						{isRequestSurvey
							? <SpinnerContent><Spinner size={30}/></SpinnerContent>
							: map(surveys, (survey) => (
								<CardSurvey key={survey._id} survey={survey} />
						))}
					</GroupSurvey>
				</Wrapper>
				<ModalCreateSurvey open={openModalSurvey} handleClose={this.handleModalSurvey} />
			</>
		);
	}
}

// MAP TO PROPS
interface IMapStateToProps {
	surveys: iSurvey[];
	surveyAction: boolean;
	isRequestSurvey: boolean;
	signin: boolean;
	events: [];
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	surveys: selectSurveys(state),
	surveyAction: selectSurveyAction(state),
	isRequestSurvey: selectIsRequestSurvey(state),
	signin: selectSignIn(state),
	events: selectEvents(state)
});
interface IMapDispatchToProps {
	surveyRequest: () => void;
	surveyActionDone: () => void;
	userActionDone: () => void;
	userSigninClearState: () => void;
	eventRequest: () => void;	
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	surveyRequest: () => dispatch(surveyRequest.started({})),
	surveyActionDone: () => dispatch(surveyActionDone()),
	userActionDone: () => dispatch(userActionDone()),
	userSigninClearState: () => dispatch(userSigninClearState()),
	eventRequest: () => dispatch(eventRequest.started({}))
})

// STYLE
const Wrapper = styled.div`
  margin: 20px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const GroupSurvey = styled.div`
  display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const ButtomAction = styled(Button)`
&&{
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.white};
	text-transform: none;
	font-size: 15px;
  height: 31px;
	border-radius: 35px;
  align-items: center;
  padding: 0px 10px;
}
` as typeof Button;

const Spinner = styled(CircularProgress)`
&&{
	color: ${props => props.theme.colors.primary};;
}
` as typeof CircularProgress;

const SpinnerContent = styled.div`
  display: flex;
	flex:1;
	justify-content: center;
	margin-top: 50px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(Home);