import * as React from 'react';
import styled from 'styled-components';

import { TabBar, CardPhoto, CardSurvey, Text } from '../../components';


class Home extends React.PureComponent {

	public render() {
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
						<CardSurvey />
						<CardSurvey />
					</Group>
				</Wrapper>
			</>
		);
	}
}

const Group = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  margin: 20px;
`;

export default Home;