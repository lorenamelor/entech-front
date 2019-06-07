import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { IRootState } from '../../store';
import { iSurvey } from '../../utils/interfaces';

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
import { userActionDone } from '../../store/user';

class Home extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {

	public state = { openModalSurvey: false };

	public componentDidMount() {
		this.props.userActionDone();
		this.props.surveyRequest();
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
		const { surveys, isRequestSurvey } = this.props;
		const { openModalSurvey } = this.state;

		return (
			<>
				<TabBar />
				<Wrapper>
					
					<Header>
						<Text bold size={24}>
							Eventos
					</Text>
						<ButtomAction onClick={this.handleModalSurvey}>
							<AddIcon fontSize='small' /> Adicionar Enquete
						</ButtomAction>
					</Header>

					<Group>
						<CardPhoto />
						<CardPhoto />
					</Group>

					<Text bold size={24}>
						Enquetes
						</Text>
					<Group>
						{isRequestSurvey
							? <SpinnerContent><Spinner size={30}/></SpinnerContent>
							: map(surveys, (survey) => (
								<CardSurvey key={survey._id} survey={survey} />
						))}
					</Group>
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
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	surveys: selectSurveys(state),
	surveyAction: selectSurveyAction(state),
	isRequestSurvey: selectIsRequestSurvey(state),
});
interface IMapDispatchToProps {
	surveyRequest: () => void;
	surveyActionDone: () => void;
	userActionDone: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	surveyRequest: () => dispatch(surveyRequest.started({})),
	surveyActionDone: () => dispatch(surveyActionDone()),
	userActionDone: () => dispatch(userActionDone()),
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

const Group = styled.div`
  display: flex;
	flex-wrap: wrap;
`;

const ButtomAction = styled(Button)`
&&{
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.white};
	text-transform: none;
	font-size: 15px;
	margin: 0px 20px;
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