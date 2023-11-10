import { Observable } from '../utils/Observable';

export const storeWebService = {
    personInfo: new Observable(null),
    jwt: new Observable(null),
    personId: new Observable(null)
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
    
}

export const webService = WebService.service;