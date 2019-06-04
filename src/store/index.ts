import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

// REDUCERS AND EPICS EXPORTS

import { epics as notificationEpics } from './notifications';
import appStateReducer, { epics as appStateEpics, init, IState as IAppStateState } from './state';
import surveyReducer, { epics as surveyEpics, IState as ISurveyState } from './survey';
import techshotReducer, { epics as techshotEpics, IState as ITechshotState } from './techShot';

// STORE INTERFACE
export interface IRootState { 
	appState: IAppStateState,
	surveyReducer: ISurveyState,
	techshotReducer: ITechshotState,
}

// COMBINED REDUCERS
const rootReducer = combineReducers<IRootState>({
	appState: appStateReducer,
	surveyReducer,
	techshotReducer,
});

// COMBINED EPICS
const rootEpic = combineEpics(
	notificationEpics,
	appStateEpics,
	surveyEpics,
	techshotEpics,
);

export type Epic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<IRootState>) => Observable<Action<any>>;
export type Selector<Value, Props = any> = (state: IRootState, props?: Props) => Value;

const epicMiddleware = createEpicMiddleware<any>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
)

export default store;

epicMiddleware.run(rootEpic);

store.dispatch(init());
