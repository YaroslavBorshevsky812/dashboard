import './maxWeightPureExerciseChart.scss';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';
import { useObservable } from '../../../utils/useObservable';
import { storeWorkoutStatisticService } from '../../../services/WorkoutStatisticService';
import { MaxWeightPureExerciseModel } from '../../../Models/MaxWeightPureExerciseModel';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface Props {
    /** Заголовок. */
    exerciseTitle?: string;
}

// eslint-disable-next-line react/prop-types
const MaxWeightPureExerciseChart: FC<Props> = (props) => {
    const { exerciseTitle } = props;

    /** Максимальный вес поднятый в конкретном упражнении. */
    const maxWeightPureExercise = useObservable<MaxWeightPureExerciseModel[] | null>(
        storeWorkoutStatisticService.maxWeightPureExercise,
    );

    /** Список дат. */
    const [dateArray, setDateArray] = useState<string[]>([]);
    /** Список значений. */
    const [valueArray, setValueArray] = useState<number[]>([]);
    /** Максимальное значение принимаемое шкалой Y */
    const [maxY, setMaxY] = useState(null);
    /** Минимальное значение принимаемое шкалой Y */
    const [minY, setMinY] = useState(null);

    useEffect(() => {
        const dateArrayResult: string[] = [];
        const valueArray: number[] = [];

        maxWeightPureExercise &&
            maxWeightPureExercise
                .filter((item) => item.workout_name === exerciseTitle)
                .map((item) => {
                    dateArrayResult.push(moment(item.date).format('DD.MM'));
                    valueArray.push(item.max_weight);
                });

        if (dateArrayResult.length === valueArray.length) {
            setValueArray([...valueArray]);
            setDateArray([...dateArrayResult]);
        }

        /** Для удобного масштабирования по Y */
        const sortedValueArray = valueArray.sort((a, b) => a - b);

        /** Считаем максимальное значнеие по Y */
        const maxValue =
            sortedValueArray[sortedValueArray.length - 1] + (sortedValueArray[sortedValueArray.length - 1] / 100) * 20;

        /** Считаем минимальное значнеие по Y */
        const minValue = sortedValueArray[0] - (sortedValueArray[sortedValueArray.length - 1] / 100) * 20;

        setMaxY((Math.round(maxValue / 10) * 10) as any);
        minValue !== 0 ? setMinY((Math.round(minValue / 10) * 10) as any) : 0;
    }, [maxWeightPureExercise, maxY, minY, exerciseTitle]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                min: minY,
                max: maxY,
            },
        },
    };

    const labels = dateArray && [...dateArray];

    const data = {
        labels,
        datasets: [
            {
                data: valueArray && [...valueArray],
                label: 'кг',
                borderColor: 'rgb(10,	117, 173)',
                backgroundColor: 'rgba(10,	117, 173, 0.5)',
            },
        ],
    };
    return (
        <div className="chart__wrapper">
            <Line options={options as any} data={data as any}></Line>
        </div>
    );
};

export default MaxWeightPureExerciseChart;