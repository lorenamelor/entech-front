import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '.';
import { 
  apiTechshotCreate,
  apiTechshotRequest,
  apiTechshotEdit,
  apiTechshotDelete,
  apiTechshotRequestById,
 } from '../services/api';

import { ITechShot } from '../utils/interfaces';


// SELECTORS
export const selectTechshots: Selector<ITechShot[]> = ({ techshotReducer }) => techshotReducer.techshots;
export const selectTechshot: Selector<ITechShot> = ({ techshotReducer }) => techshotReducer.techshot;
export const selectTechshotAction: Selector<boolean> = ({ techshotReducer }) => techshotReducer.techshotAction;

// ACTIONS
const actionCreator = actionCreatorFactory('TECHSHOT::');
export const techshotCreate = actionCreator.async<any, any, any>('CREATE');
export const techshotEdit = actionCreator.async<any, any, any>('EDIT');
export const techshotDelete = actionCreator.async<any, any, any>('DELETE');
export const techshotRequest = actionCreator.async<any, any, any>('REQUEST');
export const techshotRequestById = actionCreator.async<any, any, any>('REQUEST_BY_ID');
export const techshotActionDone = actionCreator('TS_ACTION_DONE');


// STATE
export interface IState {
  techshots: ITechShot[],
	techshot: ITechShot,
	techshotAction: boolean,
}

const INITIAL_STATE: IState = {
  techshots: [],
  techshot: { 
  _id: '',  
	title: '',
	speaker: '',
  duration: 0,
  keywords: [],
	description: '',
	photoURL: ''
},
techshotAction: false,
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(techshotRequest.done, (state: IState, { result: techshots }) => ({
		...state,
		techshots,
  }))
  .case(techshotRequestById.done, (state: IState, { result: techshot }) => ({
		...state,
		techshot,
	}))
	.cases([techshotCreate.done, techshotEdit.done, techshotDelete.done, techshotActionDone], (state: IState) => ({
		...state,
		techshotAction: !state.techshotAction,
	}))

	.build();

// EFFECTS

const techshotCreateEpic: Epic = (action$) => action$.pipe(
	filter((techshotCreate.started).match),
	mergeMap(({payload}) => from(apiTechshotCreate(payload)).pipe(
		map(({ data }) => techshotCreate.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(techshotCreate.failed({ params: { ...payload }, error }))),
  )),
);

const techshotEditEpic: Epic = (action$) => action$.pipe(
	filter(techshotEdit.started.match),
	mergeMap(({payload: { payload, techshotId }}) => from(apiTechshotEdit(payload, techshotId)).pipe(
		map(({ data }) => techshotEdit.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(techshotEdit.failed({ params: { ...payload }, error }))),
  )),
);

const techshotDeleteEpic: Epic = (action$) => action$.pipe(
	filter(techshotDelete.started.match),
	mergeMap(({payload: {techshotId}}) => from(apiTechshotDelete(techshotId)).pipe(
		map((techshot) => (techshotDelete.done({ result: techshot })),
		catchError((error) => of(techshotDelete.failed({ error }))),
	)),
));

const techshotRequestEpic: Epic = (action$) => action$.pipe(
	filter(techshotRequest.started.match),
	mergeMap(({payload: {surveyId}}) => from(apiTechshotRequest(surveyId)).pipe(
		map((techshots) => (techshotRequest.done({ result: techshots })),
		catchError((error) => of(techshotRequest.failed({ error }))),
	)),
));

// const techshotRequest2Epic: Epic = (action$) => action$.pipe(
// 	filter(techshotCreate.done.match),
// 	mergeMap(() => from(apiTechshotRequest()).pipe(
// 		map((techshots) => (techshotRequest.done({ result: techshots })),
// 		catchError((error) => of(techshotRequest.failed({ error }))),
// 	)),
// ));

// const techshotRequest3Epic: Epic = (action$) => action$.pipe(
// 	filter(techshotEdit.done.match),
// 	mergeMap(() => from(apiTechshotRequest()).pipe(
// 		map((techshots) => (techshotRequest.done({ result: techshots })),
// 		catchError((error) => of(techshotRequest.failed({ error }))),
// 	)),
// ));

// const techshotRequest4Epic: Epic = (action$) => action$.pipe(
// 	filter(techshotDelete.done.match),
// 	mergeMap(() => from(apiTechshotRequest()).pipe(
// 		map((techshots) => (techshotRequest.done({ result: techshots })),
// 		catchError((error) => of(techshotRequest.failed({ error }))),
// 	)),
// ));

const techshotRequestByIdEpic: Epic = (action$) => action$.pipe(
	filter(techshotRequestById.started.match),
	mergeMap(({payload: {techshotId}}) => from(apiTechshotRequestById(techshotId)).pipe(
		map((techshot) => (techshotRequestById.done({ result: techshot })),
		catchError((error) => of(techshotRequestById.failed({ error }))),
	)),
));

export const epics = combineEpics(
  techshotCreateEpic,
  techshotRequestEpic,
  // techshotRequest2Epic,
  // techshotRequest3Epic,
  // techshotRequest4Epic,
  techshotEditEpic,
  techshotDeleteEpic,
  techshotRequestByIdEpic,
);
