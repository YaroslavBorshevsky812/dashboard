import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './topInfo.scss';
import { workoutService } from '../../services/WorkoutService';
import MaxWeightPureExerciseChart from '../Charts/MaxWeightPureExerciseChart/MaxWeightPureExerciseChart';
import { storeWorkoutStatisticService, workoutStatisticService } from '../../services/WorkoutStatisticService';
import moment from 'moment/moment';
import { MaxWeightPureExerciseModel } from '../../Models/MaxWeightPureExerciseModel';
import { TotalWeightPureExerciseModel } from '../../Models/TotalWeightPureExerciseModel';
import TotalWeightPureExerciseChart from '../Charts/TotalWeightPureExerciseChart/TotalWeightPureExerciseChart';
import { useObservable } from '../../utils/useObservable';
import 'swiper/css/pagination';

const TopInfo = () => {
    /** Список названий упражнений. */
    const titleList = useObservable<string[]>(storeWorkoutStatisticService.exerciseTitlesList);

    useEffect(() => {
        const chartTitles: string[] = [];
        workoutService.requestWorkoutInfoFromServer().then((res) => {
            res.data.maxWeightPureExercise.forEach((element: any) => {
                if (!chartTitles.includes(element.workout_name)) {
                    chartTitles.push(element.workout_name);
                }
            });
            workoutStatisticService.setExerciseTitlesList(chartTitles);

            workoutStatisticService.setMaxWeightPureExercise(
                res.data.maxWeightPureExercise.sort((b: MaxWeightPureExerciseModel, a: MaxWeightPureExerciseModel) =>
                    moment.utc(b.date).diff(moment.utc(a.date)),
                ),
            );

            workoutStatisticService.setTotalWeightPureExercise(
                res.data.totalWeightPureExercise.sort(
                    (b: TotalWeightPureExerciseModel, a: TotalWeightPureExerciseModel) =>
                        moment.utc(b.date).diff(moment.utc(a.date)),
                ),
            );
        });
    }, []);

    return (
        <div className="charts">
            <Swiper slidesPerView={'auto'} spaceBetween={30} pagination={{ clickable: true }} className="mySwiper">
                {titleList.length &&
                    titleList.map((item) => (
                        <SwiperSlide className="slide slide--react-list" style={{ width: '100%' }} key={item}>
                            <div className="charts__item__wrapper">
                                <h1>{item}</h1>
                                <div className="charts__item">
                                    <div className="main-board-top-part__left">
                                        <MaxWeightPureExerciseChart exerciseTitle={item} />
                                    </div>
                                    <div className="main-board-top-part__right">
                                        <TotalWeightPureExerciseChart exerciseTitle={item} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default TopInfo;
