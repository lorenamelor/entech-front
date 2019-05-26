import * as React from 'react';
import styled from 'styled-components';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Text, ModalCreateSurvey } from '../components';

class ExampleComponent extends React.PureComponent {

	public state = { openModalSurvey: false };

	public handleModalSurvey = () => {
		this.setState({openModalSurvey : !this.state.openModalSurvey});
	}

	public render() {
		const { openModalSurvey } = this.state;
		console.log('openModalSurvey', openModalSurvey)
		return (
			<AppBar position="static">
				<TabBar>
					<Text size={30}>Logo</Text>
					<Menu>
						<ButtomAction onClick={this.handleModalSurvey}>
							<AddIcon fontSize='small' /> Adicionar Evento
						</ButtomAction>
						<Text>Sair</Text>
					</Menu>
				</TabBar>
				<ModalCreateSurvey open={true} handleClose={this.handleModalSurvey}/>
			</AppBar>
		);
	}
}


// STYLE

const TabBar = styled(Toolbar)`
&&{
	background-color: ${props => props.theme.colors.white};
	display: flex;
	justify-content: space-between;
	flex-direction: flex-start;
	height: 60px;
}
` as typeof Toolbar;

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

const Menu = styled.div`
	display: flex;
	align-items: center;
`;

export default ExampleComponent;