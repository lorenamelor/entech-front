import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, mapTo } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '.';
import {
	apiUserCreate,
	apiUserRequest,
	apiUserEdit,
	apiUserDelete,
	apiUserSignin,
	apiUserOAuth,
} from '../services/api';

import { IUser } from '../utils/interfaces';


// SELECTORS
export const selectIsCreateUser: Selector<boolean> = ({ userReducer }) => userReducer.isCreateUser;
export const selectSignUpSuccess: Selector<boolean> = ({ userReducer }) => userReducer.signUpSuccess;
export const selectuser: Selector<IUser> = ({ userReducer }) => userReducer.user;
export const selectuserAction: Selector<boolean> = ({ userReducer }) => userReducer.userAction;
export const selectIsRequestuser: Selector<boolean> = ({ userReducer }) => userReducer.isRequestuser;
export const selectLogout: Selector<boolean> = ({ userReducer }) => userReducer.logout;
export const selectSignIn: Selector<boolean> = ({ userReducer }) => userReducer.signin;


// ACTIONS
const actionCreator = actionCreatorFactory('USER::');
export const userCreate = actionCreator.async<any, any, any>('CREATE');
export const userEdit = actionCreator.async<any, any, any>('EDIT');
export const userDelete = actionCreator.async<any, any, any>('DELETE');
export const userRequest = actionCreator.async<any, any, any>('REQUEST');
export const userActionDone = actionCreator('USER_ACTION_DONE');
export const userSignin = actionCreator.async<any, any, any>('SIGNIN');
export const userSigninClearState = actionCreator('SIGNIN-CLEAR-STATE');
export const userSignout = actionCreator.async<any, any, any>('SIGNOUT');
export const userSignoutClearState = actionCreator('SIGNOUT-CLEAR-STATE');
export const userOAuth = actionCreator.async<any, any, any>('OAUTH');

// STATE
export interface IState {
	user: IUser,
	userAction: boolean,
	isRequestuser: boolean,
	isCreateUser: boolean,
	signUpSuccess: boolean,
	logout: boolean,
	signin: boolean,
}

const INITIAL_STATE: IState = {
	user: {
		_id: '',
		name: '',
		email: '',
		type: '',
		password: '',
		confirmPassword:'',
	},
	userAction: false,
	isRequestuser: false,
	isCreateUser: false,
	signUpSuccess: false,
	logout: false,
	signin: false,
};

export const getUser = (value: any) => {
	if(sessionStorage && sessionStorage.getItem('userData')) { 
	 const userData = sessionStorage!.getItem('userData')
	 if(value === 'token'){
		return JSON.parse(userData!).token;
	 } else {
		 return JSON.parse(userData!).user[value];
	 }
	}
	return null;
}

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.cases([userCreate.started, userSignin.started], (state: IState) => ({
		...state,
		isCreateUser: true,
	}))
	.case(userCreate.done, (state: IState) => ({
		...state,
		isCreateUser: false,
		signUpSuccess: true,
	}))
	.cases([userSignin.done, userOAuth.done, userSigninClearState], (state: IState) => ({
		...state,
		isCreateUser: false,
		signin: !state.signin,
	}))
	.cases([userCreate.failed, userSignin.failed, userOAuth.done, userOAuth.failed], (state: IState) => ({
		...state,
		isCreateUser: false,
	}))
	.case(userRequest.started, (state: IState) => ({
		...state,
		isRequestuser: true,
	}))
	.case(userRequest.failed, (state: IState) => ({
		...state,
		isRequestuser: false,
	}))
	.case(userRequest.done, (state: IState, { result: users }) => ({
		...state,
		users,
		isRequestuser: false,
	}))
	.cases([userEdit.done, userActionDone], (state: IState) => ({
		...state,
		userAction: !state.userAction,
		signUpSuccess: false,
	}))
	.cases([userSignoutClearState, userSignout.done], (state: IState) => ({
		...state,
		logout: !state.logout,
	}))
	.build();

// EFFECTS

const userCreateEpic: Epic = (action$) => action$.pipe(
	filter((userCreate.started).match),
	mergeMap(({ payload }) => from(apiUserCreate(payload)).pipe(
		map(({ data }) => userCreate.done({ params: { ...payload }, result: { data } })),
		catchError((error) => of(userCreate.failed({ params: { ...payload }, error }))),
	)),
);

const userEditEpic: Epic = (action$) => action$.pipe(
	filter(userEdit.started.match),
	mergeMap(({ payload: { payload, userId } }) => from(apiUserEdit(payload, userId)).pipe(
		map(({ data }) => userEdit.done({ params: { ...payload }, result: { data } })),
		catchError((error) => of(userEdit.failed({ params: { ...payload }, error }))),
	)),
);

const userDeleteEpic: Epic = (action$) => action$.pipe(
	filter(userDelete.started.match),
	mergeMap(({ payload: { userId } }) => from(apiUserDelete(userId)).pipe(
		map((user) => (userDelete.done({ result: user })),
			catchError((error) => of(userDelete.failed({ error }))),
		)),
	));

const userRequestEpic: Epic = (action$) => action$.pipe(
	filter(userRequest.started.match),
	mergeMap(({ payload: { userId } }) => from(apiUserRequest(userId)).pipe(
		map((user) => (userRequest.done({ result: user })),
			catchError((error) => of(userRequest.failed({ error }))),
		)),
	));

	const userSigninEpic: Epic = (action$) => action$.pipe(
		filter(userSignin.started.match),
		mergeMap(({payload}) => from(apiUserSignin(payload)).pipe(
			map(({ data }) => {
				if(data){
					sessionStorage.setItem('userData', JSON.stringify(data))
				}
				return userSignin.done({ params: { ...payload }, result: { data }})}),
			catchError((error) => of(userSignin.failed({ params: { ...payload }, error }))),
		)),
	);
	
	const userOAuthEpic: Epic = (action$) => action$.pipe(
		filter(userOAuth.started.match),
		mergeMap(({payload}) => from(apiUserOAuth(payload.code)).pipe(
			map(({ data }) => {
				if(data){
					sessionStorage.setItem('userData', JSON.stringify(data))
				}
				return userOAuth.done({ params: { ...data }, result: { data }})}),
				catchError((error) => of(userOAuth.failed({ error }))),
			)),
		);

	const signOutEpic: Epic = (action$) => action$.pipe(
		filter(userSignout.started.match),
		tap(() => {
			sessionStorage.removeItem('userData');
		}),
		mapTo(userSignout.done({})),
	);

export const epics = combineEpics(
	userCreateEpic,
	userEditEpic,
	userDeleteEpic,
	userRequestEpic,
	userSigninEpic,
	signOutEpic,
	userOAuthEpic,
);
