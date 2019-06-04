import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '.';
import { 
  apiSurveyCreate,
  apiSurveyRequest,
  apiSurveyEdit,
  apiSurveyDelete,
  apiSurveyRequestById,
 } from '../services/api';

import { iSurvey } from '../utils/interfaces';


// SELECTORS
export const selectSurveys: Selector<iSurvey[]> = ({ surveyReducer }) => surveyReducer.surveys;
export const selectSurvey: Selector<iSurvey> = ({ surveyReducer }) => surveyReducer.survey;
export const selectSurveyAction: Selector<boolean> = ({ surveyReducer }) => surveyReducer.surveyAction;

// ACTIONS
const actionCreator = actionCreatorFactory('SURVEY::');
export const surveyCreate = actionCreator.async<any, any, any>('CREATE');
export const surveyEdit = actionCreator.async<any, any, any>('EDIT');
export const surveyDelete = actionCreator.async<any, any, any>('DELETE');
export const surveyRequest = actionCreator.async<any, any, any>('REQUEST');
export const surveyRequestById = actionCreator.async<any, any, any>('REQUEST_BY_ID');
export const surveyActionDone = actionCreator('SURVEY_ACTION_DONE');


// STATE
export interface IState {
  surveys: iSurvey[],
	survey: iSurvey,
	surveyAction: boolean,
}

const INITIAL_STATE: IState = {
  surveys: [],
  survey: { 
  _id: '',  
  title: '',
  numberWinners: 0,
  surveyEndDate: '',
  date: '',
  startTime: '',
  endTime: '',
  address: '',
  city: '',
  state: '',
	photoURL: ''},
	surveyAction: false,
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(surveyRequest.done, (state: IState, { result: surveys }) => ({
		...state,
		surveys,
  }))
  .case(surveyRequestById.done, (state: IState, { result: survey }) => ({
		...state,
		survey,
	}))
	.cases([surveyCreate.done, surveyEdit.done, surveyDelete.done, surveyActionDone], (state: IState) => ({
		...state,
		surveyAction: !state.surveyAction,
	}))
	.build();

// EFFECTS

const surveyCreateEpic: Epic = (action$) => action$.pipe(
	filter((surveyCreate.started).match),
	mergeMap(({payload}) => from(apiSurveyCreate(payload)).pipe(
		map(({ data }) => surveyCreate.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(surveyCreate.failed({ params: { ...payload }, error }))),
  )),
);

const surveyEditEpic: Epic = (action$) => action$.pipe(
	filter(surveyEdit.started.match),
	mergeMap(({payload: { payload, surveyId }}) => from(apiSurveyEdit(payload, surveyId)).pipe(
		map(({ data }) => surveyEdit.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(surveyEdit.failed({ params: { ...payload }, error }))),
  )),
);

const surveyDeleteEpic: Epic = (action$) => action$.pipe(
	filter(surveyDelete.started.match),
	mergeMap(({payload: {surveyId}}) => from(apiSurveyDelete(surveyId)).pipe(
		map((survey) => (surveyDelete.done({ result: survey })),
		catchError((error) => of(surveyDelete.failed({ error }))),
	)),
));

const surveyRequestEpic: Epic = (action$) => action$.pipe(
	filter(surveyRequest.started.match),
	mergeMap(() => from(apiSurveyRequest()).pipe(
		map((surveys) => (surveyRequest.done({ result: surveys })),
		catchError((error) => of(surveyRequest.failed({ error }))),
	)),
));

// const surveyRequest2Epic: Epic = (action$) => action$.pipe(
// 	filter(surveyCreate.done.match),
// 	mergeMap(() => from(apiSurveyRequest()).pipe(
// 		map((surveys) => (surveyRequest.done({ result: surveys })),
// 		catchError((error) => of(surveyRequest.failed({ error }))),
// 	)),
// ));

// const surveyRequest3Epic: Epic = (action$) => action$.pipe(
// 	filter(surveyEdit.done.match),
// 	mergeMap(() => from(apiSurveyRequest()).pipe(
// 		map((surveys) => (surveyRequest.done({ result: surveys })),
// 		catchError((error) => of(surveyRequest.failed({ error }))),
// 	)),
// ));

// const surveyRequest4Epic: Epic = (action$) => action$.pipe(
// 	filter(surveyDelete.done.match),
// 	mergeMap(() => from(apiSurveyRequest()).pipe(
// 		map((surveys) => (surveyRequest.done({ result: surveys })),
// 		catchError((error) => of(surveyRequest.failed({ error }))),
// 	)),
// ));

const surveyRequestByIdEpic: Epic = (action$) => action$.pipe(
	filter(surveyRequestById.started.match),
	mergeMap(({payload: {surveyId}}) => from(apiSurveyRequestById(surveyId)).pipe(
		map((survey) => (surveyRequestById.done({ result: survey })),
		catchError((error) => of(surveyRequestById.failed({ error }))),
	)),
));

export const epics = combineEpics(
  surveyCreateEpic,
  surveyRequestEpic,
  surveyEditEpic,
  surveyDeleteEpic,
  surveyRequestByIdEpic,
);
