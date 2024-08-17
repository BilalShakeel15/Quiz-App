import axios from 'axios'

export const BASE_URL = 'https://localhost:7159/';

export const ENDPOINTS = {
    participant: 'Participants',
    question:'Questions',
    allquestion:'Questions/all',
    getAnswers : 'question/getanswers',
    auth:'Login'
}

export const  createAPIEndpoint =  endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchall:(headers={})=>axios.get(url,{headers}),
        fetchById: (id,headers={}) => axios.get(url + id,{headers}),
        post: (newRecord,headers={}) => axios.post(url, newRecord,{headers}),
        put: (id, updatedRecord,headers={}) => axios.put(url + id, updatedRecord,{headers}),
        delete: (id,headers={}) => axios.delete(url + id,{headers}),
    }
}