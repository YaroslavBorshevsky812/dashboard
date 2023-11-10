import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './dashboard.scss';
import WorkoutListCard from '../../components/Card/WorkoutListCard/WorkoutListCard';
import WorkoutItemCard from '../../components/Card/WorkoutItemCard/WorkoutItemCard';
import { navigationService } from '../../services/NavigationService';
import { ECardType } from '../../utils/enums/Enums';
import { DialogLayer } from '../../components/Dialogs/DialogLayer';
import TopInfo from '../../components/TopInfo/TopInfo';

const Dashboard = () => {
    /** Стейт для анимации bounce элемента dashboard. */
    const [active, setActive] = useState<boolean>(false);

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

    return (
        <>
            <DialogLayer />
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
        </>
    );
};

export default Dashboard;
