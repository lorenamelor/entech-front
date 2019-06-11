import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '.';
import {
	apiEventRequest,
	apiEventRequestById,
} from '../services/api';


// SELECTORS
export const selectEvents: Selector<[]> = ({ eventReducer }) => eventReducer.events;
export const selectEvent: Selector<any> = ({ eventReducer }) => eventReducer.event;
export const selectIsRequestEvent: Selector<boolean> = ({ eventReducer }) => eventReducer.isRequestEvent;


// ACTIONS
const actionCreator = actionCreatorFactory('EVENTS::');
export const eventRequest = actionCreator.async<any, any, any>('REQUEST');
export const eventRequestById = actionCreator.async<any, any, any>('REQUEST_BY_ID');


// STATE
export interface IState {
	events: [],
	event: {},
	isRequestEvent: boolean,
}

const INITIAL_STATE: IState = {
	events: [],
	event: {},
	isRequestEvent: false,
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(eventRequestById.done, (state: IState, { result: event }) => ({
		...state,
		event,
	}))
	.case(eventRequest.done, (state: IState, { result: events }) => ({
		...state,
		events,
	}))
	.cases([eventRequestById.done, eventRequestById.failed, eventRequest.done, eventRequest.failed], (state: IState) => ({
		...state,
		isRequestEvent: !state.isRequestEvent,
	}))
	.build();

// EFFECTS

const eventRequestEpic: Epic = (action$) => action$.pipe(
	filter(eventRequest.started.match),
	mergeMap(() => from(apiEventRequest()).pipe(
		map((events) => (eventRequest.done({ result: events })),
			catchError((error) => of(eventRequest.failed({ error }))),
		)),
	));

const eventRequestByIdEpic: Epic = (action$) => action$.pipe(
	filter(eventRequestById.started.match),
	mergeMap(({ payload: { eventId } }) => from(apiEventRequestById(eventId)).pipe(
		map((event) => (eventRequestById.done({ result: event })),
			catchError((error) => of(eventRequestById.failed({ error }))),
		)),
	));

export const epics = combineEpics(
	eventRequestEpic,
	eventRequestByIdEpic,
);
