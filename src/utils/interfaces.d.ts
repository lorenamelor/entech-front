export interface iSurvey {
  _id?: string,
  title: string,
  numberWinners: number,
  surveyEndDate: string,
  date: string,
  startTime: string,
  endTime: string,
  address: string,
  city: string,
  state: string,
  photoURL?: string,
  userId?: string,
}