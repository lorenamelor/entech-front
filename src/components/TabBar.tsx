import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Text } from '../components';
import theme from '../utils/theme';


class ExampleComponent extends React.PureComponent {
	public render() {
		return (
			<AppBar position="static">
				<TabBar>
					<Text size={30}>Logo</Text>
					<Menu>
						<Link to="/">
							<HomeIcon style={{color: theme.colors.gray60}} />
						</Link>
						<Separator />
						<Text>Sair</Text>
					</Menu>
				</TabBar>
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

const Menu = styled.div`
	display: flex;
	align-items: center;
`;

const Separator = styled.hr`
  border: none;
  border-left: 2px solid ${props => props.theme.colors.gray40};
  height: 31px;
  width: 2px;
  margin: 0 20px;
`;

export default ExampleComponent;