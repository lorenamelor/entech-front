import * as React from 'react';
import styled from 'styled-components';

import { TabBar, CardPhoto, CardSurvey, Text } from '../../components';
import { connect } from 'react-redux';
import { surveyRequest, selectSurveys } from '../../store/survey';
import { Dispatch } from 'redux';
import { iSurvey } from '../../utils/interfaces';
import { IRootState } from '../../store';

import map from 'lodash/map';


class Home extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {

	public componentDidMount(){
		this.props.surveyRequest();
	}

	public render() {
		const { surveys } = this.props;
		return(
			<>
				<TabBar />
					<Wrapper>
					<Text bold size={24}>
						Eventos
					</Text>
					<Group>
						<CardPhoto />
						<CardPhoto />
					</Group>
					<Text bold size={24}>
						Enquetes
					</Text>
					<Group>
						{map(surveys, (survey) => (
							<CardSurvey key={survey._id} survey={survey} />
						))}
					</Group>
				</Wrapper>
			</>
		);
	}
}

// MAP TO PROPS
interface IMapStateToProps {
  surveys: iSurvey[];
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  surveys: selectSurveys(state),
});
interface IMapDispatchToProps {
  surveyRequest: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  surveyRequest: () => dispatch(surveyRequest.started({})),
})

// STYLE
const Group = styled.div`
  display: flex;
	flex-wrap: wrap;
`;

const Wrapper = styled.div`
  margin: 20px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Home);