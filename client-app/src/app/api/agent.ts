﻿import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/Activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() =>
        resolve(response), ms));

const SLEEP_DELAY = 1000;

const requests = {
    get: (url: string) => axios.get(url).then(sleep(SLEEP_DELAY)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(SLEEP_DELAY)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(SLEEP_DELAY)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(SLEEP_DELAY)).then(responseBody),
};

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`),
};

export default {
    Activities
};