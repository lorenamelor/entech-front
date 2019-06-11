import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as queryString from 'query-string';

import { CircularProgress } from '@material-ui/core';
import { userSigninClearState, userOAuth, selectSignIn } from '../../store/user';
import { IRootState } from '../../store';

interface IProps {
	location: any;
}

class OAuth extends React.PureComponent<IMapDispatchToProps & IMapStateToProps & IProps> {

	public componentDidMount() {
		const { location: { search } } = this.props;
		const { code } = queryString.parse(search);
		this.props.userOAuth(code);
	}

	public render() {
		const { signin } = this.props;
		
		if (signin) { return <Redirect to="/home" /> }
		return (
				<Wrapper>
		     	<Spinner size={50}/>
				</Wrapper>
		);
	}
}

// MAP TO PROPS

interface IMapStateToProps {
  signin: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  signin: selectSignIn(state),
});

interface IMapDispatchToProps {
  userOAuth: (code: any) => void;
	userSigninClearState: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	userOAuth: (code: any) => dispatch(userOAuth.started({code})),

	userSigninClearState: () => dispatch(userSigninClearState())
})

// STYLE
const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Spinner = styled(CircularProgress)`
&&{
	color: ${props => props.theme.colors.primary};;
}
` as typeof CircularProgress;
export default connect(mapStateToProps, mapDispatchToProps)(OAuth);