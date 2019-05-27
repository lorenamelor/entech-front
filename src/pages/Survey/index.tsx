import * as React from 'react';
import styled from 'styled-components';

import { TabBar, Text, CardTechShot } from '../../components';
import { connect } from 'react-redux';
import { selectSurvey, surveyRequestById } from '../../store/survey';
import { Dispatch } from 'redux';
import { iSurvey } from '../../utils/interfaces';
import { IRootState } from '../../store';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AccessTime from '@material-ui/icons/AccessTime';
import TouchApp from '@material-ui/icons/TouchApp';
import theme from '../../utils/theme';

interface IProps {
	match: any;
}
class Home extends React.PureComponent<IMapDispatchToProps & IMapStateToProps & IProps> {

	public componentDidMount(){
		const { match: { params: { surveyId } } } = this.props;

		this.props.surveyRequestById(surveyId);
	}

	public render() {
		const { title } = this.props.survey;
		return(
			<>
				<TabBar />
					<Wrapper>
					<Text bold size={24}>
						{title}
					</Text>

					<InfoContainer>
						<Info>
							<CalendarToday style={{color: theme.colors.gray60}}/>
							<Text bold> Data do Evento: </Text>
							<Text> 18:00 </Text>
						</Info>
						<Info>
							<AccessTime style={{color: theme.colors.gray60}}/>
							<Text bold> Horário do Evento: </Text>
							<Text> 13:00 às 17:00 </Text>
						</Info>
						<Info>
							<TouchApp style={{color: theme.colors.gray60}}/>
							<Text bold> Data limite para votação: </Text>
							<Text> 18:00 </Text>
						</Info>
					</InfoContainer>
					<CardTechShot />
				</Wrapper>
			</>
		);
	}
}

// MAP TO PROPS

interface IMapStateToProps {
  survey: iSurvey;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  survey: selectSurvey(state),
});

interface IMapDispatchToProps {
  surveyRequestById: (surveyId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  surveyRequestById: (surveyId: string) => dispatch(surveyRequestById.started({surveyId})),
})

// STYLE
const Info = styled.div`
  display: flex;
	margin-right: 30px;
`;

const InfoContainer = styled.div`
	display: flex;
	margin: 20px 0px 30px;
`;

const Wrapper = styled.div`
  margin: 20px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Home);