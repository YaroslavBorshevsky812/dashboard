import { Observable } from '../utils/Observable';
import { ECardType } from '../utils/enums/Enums';

export const storeNavigationService = {
    workoutItemCardType: new Observable<ECardType | null>(null),
};

class NavigationService {
    private static s: NavigationService | null = null;

    public static get service(): NavigationService {
        if (NavigationService.s === null) {
            NavigationService.s = new NavigationService();
        }

        return NavigationService.s;
    }

    setCurrentWorkoutCard = (currentCardType: ECardType | null) => {
        storeNavigationService.workoutItemCardType.set(currentCardType);
    };
}

export const navigationService = NavigationService.service;
