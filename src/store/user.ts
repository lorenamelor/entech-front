import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '.';
import {
	apiUserCreate,
	apiUserRequest,
	apiUserEdit,
	apiUserDelete,
} from '../services/api';

import { IUser } from '../utils/interfaces';


// SELECTORS
export const selectIsCreateUser: Selector<boolean> = ({ userReducer }) => userReducer.isCreateUser;
export const selectSignUpSuccess: Selector<boolean> = ({ userReducer }) => userReducer.signUpSuccess;
export const selectuser: Selector<IUser> = ({ userReducer }) => userReducer.user;
export const selectuserAction: Selector<boolean> = ({ userReducer }) => userReducer.userAction;
export const selectIsRequestuser: Selector<boolean> = ({ userReducer }) => userReducer.isRequestuser;

// ACTIONS
const actionCreator = actionCreatorFactory('USER::');
export const userCreate = actionCreator.async<any, any, any>('CREATE');
export const userEdit = actionCreator.async<any, any, any>('EDIT');
export const userDelete = actionCreator.async<any, any, any>('DELETE');
export const userRequest = actionCreator.async<any, any, any>('REQUEST');
export const userActionDone = actionCreator('USER_ACTION_DONE');


// STATE
export interface IState {
	user: IUser,
	userAction: boolean,
	isRequestuser: boolean,
	isCreateUser: boolean,
	signUpSuccess: boolean,
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
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(userCreate.started, (state: IState) => ({
		...state,
		isCreateUser: !state.isCreateUser,
	}))
	.case(userCreate.done, (state: IState) => ({
		...state,
		isCreateUser: !state.isCreateUser,
		signUpSuccess: true,
	}))
	.case(userCreate.failed, (state: IState) => ({
		...state,
		isCreateUser: !state.isCreateUser,
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

export const epics = combineEpics(
	userCreateEpic,
	userEditEpic,
	userDeleteEpic,
	userRequestEpic,
);
