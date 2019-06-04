import * as React from 'react';
import styled from 'styled-components';
import { FormSignUp } from '../../components';



class SignUp extends React.PureComponent {

	public render() {
		return (
			<>
				<Background/>
				<FormSignUp />
			</>
		);
	}
}

const Background = styled.div`
	background-color: ${props => props.theme.colors.primary};
	height: 100vh;
	width: 50%;
`;

export default SignUp;