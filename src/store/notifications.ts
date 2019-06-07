import { toast } from 'react-toastify';
import { combineEpics } from 'redux-observable';
import { Epic } from '.';

import { css } from 'glamor';
import { filter, mapTo, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import theme from '../utils/theme';

import { surveyCreate, surveyEdit, surveyDelete } from './survey';
import { techshotCreate, techshotEdit, techshotDelete } from './techShot';
import { userCreate } from './user';

const actionCreator = actionCreatorFactory('APP::NOTIFICATION');
export const showToast = actionCreator('SHOW_TOAST');

const toatSuccess = (msg: any) => toast.success(msg, {
  className: css({
    background: theme.colors.primary,
  })
})

// USER
const userCreateSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(userCreate.done.match),
  tap(() => toatSuccess("Usuário Cadastrado!")),
  mapTo(showToast())
)

const userCreateErrorEpic: Epic = (action$: any) => action$.pipe(
  filter(userCreate.done.match),
  tap(() => toast.error("Usuário já cadastrado")),
  mapTo(showToast())
)

//  SURVEYS
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

// TECHSHOTS
const techshotCreateSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(techshotCreate.done.match),
  tap(() => toatSuccess("Techshot Criada!")),
  mapTo(showToast())
)

const techshotEditSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(techshotEdit.done.match),
  tap(() => toatSuccess("Techshot Editada!")),
  mapTo(showToast())
)

const techshotDeleteSuccessEpic: Epic = (action$: any) => action$.pipe(
  filter(techshotDelete.done.match),
  tap(() => toatSuccess("Techshot Deletada!")),
  mapTo(showToast())
)

export const epics = combineEpics(
  userCreateSuccessEpic,
  userCreateErrorEpic,

  surveyCreateSuccessEpic,
  surveyEditSuccessEpic,
  surveyDeleteSuccessEpic,

  techshotCreateSuccessEpic,
  techshotEditSuccessEpic,
  techshotDeleteSuccessEpic,
);