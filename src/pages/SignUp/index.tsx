import * as React from 'react';
import styled from 'styled-components';
import { FormSignUp } from '../../components';
// tslint:disable-next-line:no-var-requires
const background = require('../../assets/imgs/background2.png');


class SignUp extends React.PureComponent {

	public render() {
		return (
			<Wrapper>
				<FormContainer>
					<FormSignUp />
				</FormContainer>
				<Img src={background}/>
			</Wrapper>
		);
	}
}

const FormContainer = styled.div`
	margin: 45px;
	display: flex;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	height: 100vh;
`;

const Img = styled.img`
	width: 60%;
	display: flex;
	height: 93%;
	margin: 20px;
`;
export default SignUp;