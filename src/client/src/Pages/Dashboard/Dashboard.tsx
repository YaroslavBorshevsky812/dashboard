import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './dashboard.scss';
import WorkoutListCard from '../../components/Card/WorkoutListCard/WorkoutListCard';
import WorkoutItemCard from '../../components/Card/WorkoutItemCard/WorkoutItemCard';
import { navigationService, storeNavigationService } from '../../services/NavigationService';
import { ECardType } from '../../utils/enums/Enums';
import { DialogLayer } from '../../components/Dialogs/DialogLayer';
import TopInfo from '../../components/TopInfo/TopInfo';
import { isMobileView } from '../../utils/Utils';
import { useObservable } from '../../utils/useObservable';

const Dashboard = () => {
    /** Стейт для анимации bounce элемента dashboard. */
    const [active, setActive] = useState<boolean>(false);

    const workoutItemCardType = useObservable<ECardType | null>(storeNavigationService.workoutItemCardType);

    const dashboardClasses = ['dashboard'];
    active && dashboardClasses.push('active');

    const handleDashboardBounceClick = () => {
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, 200);
    };

    const setWokroutItemCard = () => {
        navigationService.setCurrentWorkoutCard(ECardType.CREATE_NEW_WORKOUT);
    };

    const renderMobilePart = (): JSX.Element => {
        return !workoutItemCardType ? (
            <WorkoutListCard onCreateNewWokroutBtnClick={setWokroutItemCard} />
        ) : (
            <WorkoutItemCard />
        );
    };

    return (
        <>
            <DialogLayer />
            {!isMobileView() ? (
                <div className="dashboard__wrapper">
                    <div className={dashboardClasses.join(' ')} onClick={handleDashboardBounceClick}>
                        <Sidebar />
                        <div className="dashboard__main">
                            <div className="dashboard__top">
                                <TopInfo />
                            </div>
                            <div className="dashboard__bottom">
                                <WorkoutListCard onCreateNewWokroutBtnClick={setWokroutItemCard} />
                                <WorkoutItemCard />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /** Вёрстка для мобильной версии */
                <div className="mobile">
                    <div className="mobile__wrapper">
                        <TopInfo />
                        {renderMobilePart()}
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
