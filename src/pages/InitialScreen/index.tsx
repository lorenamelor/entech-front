import * as React from 'react';
import styled from 'styled-components';
import { FormSignUp, FormLogin } from '../../components';
import { Text } from '../../components';
import {  Link } from 'react-router-dom';

// tslint:disable-next-line:no-var-requires
const background = require('../../assets/imgs/background2.png');


interface IProps {
	match: any;
}
class InitialScreen extends React.PureComponent<IProps> {

	public state = { isSignUp: false }

	public componentDidMount() {
		const { match: { path } } = this.props;
		this.setState({
			isSignUp: path.indexOf('cadastro') !== -1
		})
	}

	public render() {
		const { isSignUp } = this.state;

		return (
			<Wrapper>
				<FormContainer>
					{isSignUp
						? <FormSignUp />
						: <FormLogin />
					}
					<Container>
						<Text>
							{isSignUp
							?<>
									Já possui cadastro?
									<LinkTo to="/"> Fazer login</LinkTo>
								</>
							: <>
									Ainda não possui cadastro?
									<LinkTo to="/cadastro"> Fazer cadastro</LinkTo>
								</>
							}
						</Text>
					</Container>
				</FormContainer>
				<Img src={background} />
			</Wrapper>
		);
	}
}

const FormContainer = styled.div`
	margin: 45px;
	display: flex;
	flex-direction: column;
	justify-content: center;

  @media (max-width: 860px){
    width: 60%;
		margin: 20px;
  }

  @media (min-width: 860px) and (max-width: 1100px){
		position: absolute;
    align-self: flex-start;
    margin: 40px 0px 0px 0px;
    width: 40%;
    left: 45px;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	height: 100vh;

	@media (max-width: 1100px){
		align-items: flex-end;
  }

	@media (max-width: 860px){
		align-items: center;
		justify-content: center;
  }
`;

const Img = styled.img`
	width: 60%;
	display: flex;
	height: 93%;
	margin: 20px;

	@media (max-width: 850px){
		display: none;
	 }

	@media (max-width: 960px){
		height: 70%;
		width: 55%;
    margin: 0px 20px 0px 0px;
  }

	@media (max-width: 1100px){
		height: 76%;
    margin: 0px 20px 0px 0px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LinkTo: any = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;
export default InitialScreen;