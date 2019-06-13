import axios from 'axios';
import { iSurvey, ITechShot, IUser } from '../utils/interfaces';
import { getUser } from '../store/user';

// USER

const getToken = () => ({
	authorization: getUser('token'),
	'Content-Type': 'application/json'
});



export async function apiUserCreate(payload: iSurvey): Promise<{ data: { msg: any } }>  {
	return axios.post(`https://tecweb-entech.azurewebsites.net/users`, payload , { headers: getToken() });
}

export async function apiUserEdit(payload: IUser, userId:string): Promise<any>  {
	delete payload._id;

	return axios.put(`https://tecweb-entech.azurewebsites.net/users/${userId}`, payload , { headers: getToken() });
}

export async function apiUserDelete(userId:string): Promise<any>  {
	return axios.delete(`https://tecweb-entech.azurewebsites.net/users/${userId}`, { headers: getToken() });
}

export async function apiUserRequest(userId:string): Promise<IUser>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/users/${userId}`, { headers: getToken() });
	return response.data;
}

export async function apiUserSignin(payload: {email: string, password: string}): Promise<any>  {
	return axios.post(`https://tecweb-entech.azurewebsites.net/auth/login`, payload);
}

export async function apiUserOAuth(code: any): Promise<any>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/oauth?code=${code}`);
	return response.data;
}
// SURVEY

export async function apiSurveyCreate(payload: iSurvey): Promise<{ data: { msg: any } }>  {
	return axios.post(`https://tecweb-entech.azurewebsites.net/surveys`, payload , { headers: getToken() });
}

export async function apiSurveyRequest(): Promise<any>  {
	const surveys: any = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys`);
	
	return surveys.data;
}

export async function apiSurveyEdit(payload: iSurvey, surveyId:string): Promise<any>  {
	delete payload._id;

	return axios.put(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`, payload);
}

export async function apiSurveyDelete(surveyId:string): Promise<any>  {
	return axios.delete(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`, { headers: getToken() });
}

export async function apiSurveyRequestById(surveyId:string): Promise<iSurvey>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}`);
	const survey: iSurvey = response.data;
	survey.date = (survey.date).split('T')[0];
	survey.surveyEndDate = (survey.surveyEndDate).split('T')[0];
	survey.startTime = (survey.startTime).split('T')[1].substring(0,5);
	survey.endTime = (survey.endTime).split('T')[1].substring(0,5);

	return survey;
}


// TECHSHOT

export async function apiTechshotCreate(payload: ITechShot): Promise<{ data: { msg: any } }>  {
	return axios.post(`https://tecweb-entech.azurewebsites.net/techshots`, payload , { headers: getToken() });
}

export async function apiTechshotRequest(surveyId: string): Promise<any>  {
	const techshots: any = await axios.get(`https://tecweb-entech.azurewebsites.net/surveys/${surveyId}/techshots`, { headers: getToken() });
	return techshots.data;
}

export async function apiTechshotEdit(payload: ITechShot, techshotId:string): Promise<any>  {
	delete payload._id;

	return axios.put(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, payload , { headers: getToken() });
}

export async function apiTechshotDelete(techshotId:string): Promise<any>  {
	return axios.delete(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, { headers: getToken() });
}

export async function apiTechshotRequestById(techshotId:string): Promise<ITechShot>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/techshots/${techshotId}`, { headers: getToken() });
	return response.data;
}

// POLL
export async function apiTechshotPoll(payload: {userId: string, techShotId: string}): Promise<any>  {
	return axios.post(`https://tecweb-entech.azurewebsites.net/techshots/polls`, payload , { headers: getToken() });
}

// EVENTS

export async function apiEventRequest(): Promise<ITechShot>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/events`, { headers: getToken() });
	return response.data;
}

export async function apiEventRequestById(eventId:string): Promise<any>  {
	const response = await axios.get(`https://tecweb-entech.azurewebsites.net/events/${eventId}`, { headers: getToken() });
	const events = response.data;
	events.date = (events.date).split('T')[0];
	events.startTime = (events.startTime).split('T')[1].substring(0,5);
	events.endTime = (events.endTime).split('T')[1].substring(0,5);
	return events;
}