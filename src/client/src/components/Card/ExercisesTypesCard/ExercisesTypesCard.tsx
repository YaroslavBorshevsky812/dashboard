import { navigationService } from '../../../services/NavigationService';
import { ECardType, EItemListType } from '../../../utils/enums/Enums';
import ListItem from '../../ListItem/ListItem';
import Card from '../Card';
import { useState } from 'react';

const ExercisesTypesCard = () => {

    const [activeTab, setActiveTab] = useState<number | null>(null);

    const firstOptionClass = ['workout-item-card__right-side__description'];

    const handleExitBtnClick = (): void => {
        navigationService.setCurrentWorkoutCard(null);
    }

    const handleTabChannge = (tabId: number): void => {
        setActiveTab(tabId);
    };

    const handleTabReset = (): void => {
        setActiveTab(null);
    };

    const handleCreateNewExercise = (): void => {
        navigationService.setCurrentWorkoutCard(ECardType.CREATE_NEW_EXERCISE);
    };

    const renderTabContent = (activeTab: number): string | null => {
        switch (activeTab) {
            case 1:
                return 'Будет возможность записывать название и добавлять заметки. Например: Пробежка, упражнения на растягивания и т.д';
            case 2:
                return 'Упражнение с дополнительным весом. Редактор создаст три колонки: Подход, Вес, Повторения';
            case 3:
                return 'Чаще всего это упражнения с собственным весом. Редактор сделает колонку для подхода и повторения. Пример - подтягивания, отжимания и т.д';
            default:
                return null;
        }
    };
    return (
        <Card onExitClick={handleExitBtnClick} key={ECardType.CHOOSE_EXERCISE_TYPE} className="workout-item-card" titleRight="Зал" titleLeft="02.10.23">
            <div className="workout-item-card__content">
                <ul className="workout-item-card__left-side">
                    <ListItem
                        onMouseEnter={() => handleTabChannge(1)}
                        onMouseLeave={handleTabReset}
                        itemType={EItemListType.SIMPLE}
                        leftTitle="Простое упражнение"
                    />
                    <ListItem
                        itemType={EItemListType.SIMPLE}
                        onItemClick={handleCreateNewExercise}
                        onMouseEnter={() => handleTabChannge(2)}
                        onMouseLeave={handleTabReset}
                        leftTitle="Вес и количество повторений"
                    />
                    <ListItem
                        itemType={EItemListType.SIMPLE}
                        leftTitle="Количество повторений"
                        onMouseEnter={() => handleTabChannge(3)}
                        onMouseLeave={handleTabReset}
                    />
                </ul>
                <div className="workout-item-card__right-side">
                    <span key={activeTab} className={firstOptionClass.join(' ')}>
                        {activeTab && renderTabContent(activeTab)}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default ExercisesTypesCard;
