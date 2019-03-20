import axios from 'axios';
const API_URL = 'http://localhost:3000';

export class APIService{
	constructor(){
	}
	getPenTypes() {
		const url = '${API_URL}/penTypes/';
		return axios.get(url).then(response => response.data);
	}
	
}
