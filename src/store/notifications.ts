import { toast } from 'react-toastify';
import { combineEpics } from 'redux-observable';
import { Epic } from '.';

import { css } from 'glamor';
import { filter, mapTo, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { surveyCreate, surveyEdit, surveyDelete } from './survey';
import theme from '../utils/theme';

const actionCreator = actionCreatorFactory('APP::NOTIFICATION');
export const showToast = actionCreator('SHOW_TOAST');

const toatSuccess = (msg: any) => toast.success(msg, {
  className: css({
    background: theme.colors.primary,
  })
})

const surveyCreateSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(surveyCreate.done.match),
  tap(() => toatSuccess("Enquete Criada!")),
  mapTo(showToast())
)

const surveyEditSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(surveyEdit.done.match),
  tap(() => toatSuccess("Enquete Editada!")),
  mapTo(showToast())
)

const surveyDeleteSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(surveyDelete.done.match),
  tap(() => toatSuccess("Enquete Deletada!")),
  mapTo(showToast())
)

export const epics = combineEpics(
  surveyCreateSuccessEpic,
  surveyEditSuccessEpic,
  surveyDeleteSuccessEpic,
);