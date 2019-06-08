import axios from 'axios';
import { iSurvey, ITechShot, IUser } from '../utils/interfaces';

// USER

export async function apiUserCreate(payload: iSurvey): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`https://tecweb-entech.azurewebsites.net/users`, payload , { headers });
}

export async function apiUserEdit(payload: IUser, userId:string): Promise<any>  {
	delete payload._id;

	const headers: any = {};
	return axios.put(`https://tecweb-entech.azurewebsites.net/users/${userId}`, payload , { headers });
}

export async function apiUserDelete(userId:string): Promise<any>  {
	const headers: any = {};
	return axios.delete(`https://tecweb-entech.azurewebsites.net/users/${userId}`, { headers });
}

export async function apiUserRequest(userId:string): Promise<IUser>  {
	const headers: any = {};
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/users/${userId}`, { headers });
	return response.data;
}

export async function apiUserSignin(payload: {email: string, password: string}): Promise<any>  {
	// const headers: any = {};
	// return axios.post(`https://tecweb-entech.azurewebsites.net/users`, payload , { headers });
	return payload
}

// SURVEY

export async function apiSurveyCreate(payload: iSurvey): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`https://tecweb-entech.azurewebsites.net/surveys`, payload , { headers });
}

export async function apiSurveyRequest(): Promise<any>  {
	const surveys: any = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys`);
	return surveys.data;
}

export async function apiSurveyEdit(payload: iSurvey, surveyId:string): Promise<any>  {
	delete payload._id;

	const headers: any = {};
	return axios.put(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`, payload , { headers });
}

export async function apiSurveyDelete(surveyId:string): Promise<any>  {
	const headers: any = {};
	return axios.delete(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`, { headers });
}

export async function apiSurveyRequestById(surveyId:string): Promise<iSurvey>  {
	const headers: any = {};
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`, { headers });
	const survey: iSurvey = response.data;
	survey.date = (survey.date).split('T')[0];
	survey.surveyEndDate = (survey.surveyEndDate).split('T')[0];
	survey.startTime = (survey.startTime).split('T')[1].substring(0,5);
	survey.endTime = (survey.endTime).split('T')[1].substring(0,5);

	return survey;
}


// TECHSHOT

export async function apiTechshotCreate(payload: ITechShot): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`https://tecweb-entech.azurewebsites.net/techshots`, payload , { headers });
}

export async function apiTechshotRequest(surveyId: string): Promise<any>  {
	const techshots: any = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}/techshots`);
	return techshots.data;
}

export async function apiTechshotEdit(payload: ITechShot, techshotId:string): Promise<any>  {
	delete payload._id;

	const headers: any = {};
	return axios.put(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, payload , { headers });
}

export async function apiTechshotDelete(techshotId:string): Promise<any>  {
	const headers: any = {};
	return axios.delete(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, { headers });
}

export async function apiTechshotRequestById(techshotId:string): Promise<ITechShot>  {
	const headers: any = {};
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, { headers });
	return response.data;
}