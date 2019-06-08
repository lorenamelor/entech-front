import * as React from 'react';
import styled from 'styled-components';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';

import { Text, ModalCreateAdmUser } from '../components';
import { Link } from 'react-router-dom';
import theme from '../utils/theme';


class ExampleComponent extends React.PureComponent {

	public state = { openModalSurvey: false };

	public handleModalSurvey = () => {
		this.setState({openModalSurvey : !this.state.openModalSurvey});
	}

	public render() {
		const { openModalSurvey } = this.state;
		return (
			<AppBar position="static">
				<TabBar>
					<Text size={30}>Logo</Text>
					
					<Menu>
						<Link to="/">
							<HomeIcon style={{color: theme.colors.gray60}} />
						</Link>
						<Separator />
						<ButtomAction onClick={this.handleModalSurvey}>
							<AddIcon fontSize='small' /> Adicionar Adm
						</ButtomAction>
						<Text>Sair</Text>
					</Menu>
				</TabBar>

				<ModalCreateAdmUser open={openModalSurvey} handleClose={this.handleModalSurvey}/>
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
	margin-right: 20px;
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

const Separator = styled.hr`
  border: none;
  border-left: 2px solid ${props => props.theme.colors.gray40};
  height: 31px;
  width: 2px;
  margin: 19px;
`;

export default ExampleComponent;