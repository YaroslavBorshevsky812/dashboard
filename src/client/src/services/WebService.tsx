import axios from 'axios';
import { Observable } from '../utils/Observable';

export const storeWebService = {
    personInfo: new Observable(null),
    jwt: new Observable(null),
    personId: new Observable(null),
};

class WebService {
    private static s: WebService | null = null;

    public static get service(): WebService {
        if (WebService.s === null) {
            WebService.s = new WebService();
        }

        return WebService.s;
    }

    setPersonInfo = (personData: any) => {
        storeWebService.personInfo.set(personData);
    };

    loginUser = (name: string, password: string): Promise<any> => {
        return axios({
            method: 'post',
            url: `http://193.124.113.99:8080/auth/login`,
            withCredentials: false,
            data: JSON.stringify({
                name: name,
                password: password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    signUpUser = (name: string, password: string): Promise<any> => {
        return axios({
            method: 'post',
            url: `http://193.124.113.99:8080/auth/registration`,
            withCredentials: false,
            data: JSON.stringify({
                name: name,
                password: password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    };
}

export const webService = WebService.service;
