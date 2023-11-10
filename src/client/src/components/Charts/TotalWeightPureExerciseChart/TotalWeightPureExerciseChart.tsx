import '../MaxWeightPureExerciseChart/maxWeightPureExerciseChart.scss';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useObservable } from '../../../utils/useObservable';
import { storeWorkoutStatisticService } from '../../../services/WorkoutStatisticService';
import { FC, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { TotalWeightPureExerciseModel } from '../../../Models/TotalWeightPureExerciseModel';

ChartJS.register(LineElement, Tooltip, CategoryScale, LinearScale, PointElement);

interface Props {
    /** Заголовок. */
    exerciseTitle?: string;
}

// eslint-disable-next-line react/prop-types
const TotalWeightPureExerciseChart: FC<Props> = (props) => {
    const { exerciseTitle } = props;

    /** Общий вес поднятый за упражнение. Тоннаж. */
    const totalWeightData = useObservable<TotalWeightPureExerciseModel[] | null>(
        storeWorkoutStatisticService.totalWeightPureExercise,
    );

    /** Список дат. */
    const [dateArray, setDateArray] = useState<string[]>([]);
    /** Список значений. */
    const [valueArray, setValueArray] = useState<number[]>([]);
    /** Максимальное значение принимаемое шкалой Y */
    const [maxY, setMaxY] = useState<number | null>(null);
    /** Минимальное значение принимаемое шкалой Y */
    const [minY, setMinY] = useState<number | null>(null);

    useEffect(() => {
        const dateArrayResult: string[] = [];
        const valueArray: number[] = [];

        totalWeightData &&
            totalWeightData
                .filter((item) => item.workout_name === exerciseTitle)
                .map((item) => {
                    dateArrayResult.push(moment(item.date).format('DD.MM'));
                    valueArray.push(item.total_weight / 1000);
                });

        if (dateArrayResult.length === valueArray.length) {
            setValueArray([...valueArray]);
            setDateArray([...dateArrayResult]);
        }

        /** Для удобного масштабирования по Y */
        const sortedValueArray = valueArray.sort((a, b) => a - b);

        /** Считаем максимальное значнеие по Y */
        const maxValue = Math.round(
            sortedValueArray[sortedValueArray.length - 1] + (sortedValueArray[sortedValueArray.length - 1] / 100) * 40,
        );

        /** Считаем минимальное значнеие по Y */
        const minValue = sortedValueArray[0] - (sortedValueArray[sortedValueArray.length - 1] / 100) * 20;

        /** Если значение превышает тонну, то округляем. */
        if (maxValue > 10) {
            setMaxY(Math.round(maxValue / 10));
        } else {
            setMaxY(maxValue);
        }

        /** Если слишком маленькое значение - берём начальное без округления. */
        if (maxValue === 0) {
            const number = parseFloat(
                (
                    sortedValueArray[sortedValueArray.length - 1] +
                    (sortedValueArray[sortedValueArray.length - 1] / 100) * 40
                ).toFixed(2),
            );
            setMaxY(number);
        }

        /** Устанавливаем минимальное значение для шкалы. */
        minValue !== 0 ? setMinY(Math.round(minValue / 10) * 10) : 0;
    }, [totalWeightData, maxY, minY, exerciseTitle]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
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
                label: 'тонна',
                borderColor: 'rgb(6, 85, 53)',
                backgroundColor: 'rgba(6, 85, 53, 0.5)',
            },
        ],
    };
    return (
        <div className="chart__wrapper">
            <Line options={options as any} data={data}></Line>
        </div>
    );
};

export default TotalWeightPureExerciseChart;
