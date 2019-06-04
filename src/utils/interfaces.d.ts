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

export interface ITechShot {
  _id?: string,
  title: string,
  speaker: string,
  photoURL?: string,
  keywords?: Array<string>
  duration: number,
  description: string,
  userId?: string,
  surveyId?: string,
}