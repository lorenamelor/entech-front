import axios from 'axios';
import { iSurvey } from '../utils/interfaces';

// SURVEY

export async function apiSurveyCreate(payload: iSurvey): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost:8000/surveys`, payload , { headers });
}

export async function apiSurveyRequest(): Promise<any>  {
	const surveys: any = await axios.get(`http://localhost:8000/surveys`);
	return surveys.data;
}

export async function apiSurveyEdit(payload: iSurvey, surveyId:string): Promise<any>  {
	delete payload._id;

	const headers: any = {};
	return axios.put(`http://localhost:8000/surveys/${surveyId}`, payload , { headers });
}

export async function apiSurveyDelete(surveyId:string): Promise<any>  {
	const headers: any = {};
	return axios.delete(`http://localhost:8000/surveys/${surveyId}`, { headers });
}

export async function apiSurveyRequestById(surveyId:string): Promise<iSurvey>  {
	const headers: any = {};
	const response = await axios.get(`http://localhost:8000/surveys/${surveyId}`, { headers });
	const survey: iSurvey = response.data;
	survey.date = (survey.date).split('T')[0];
	survey.surveyEndDate = (survey.surveyEndDate).split('T')[0];
	survey.startTime = (survey.startTime).split('T')[1].substring(0,5);
	survey.endTime = (survey.endTime).split('T')[1].substring(0,5);

	return survey;
}