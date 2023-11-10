import { useEffect, useRef, useState } from 'react';
import { Observable } from './Observable';

/**
 * Хук-наблюдатель.
 *
 * @param observable Наблюдаемый объект.
 */
export function useObservable<T>(observable: Observable<T>): T {
    const [val, setVal] = useState(observable.get());
    const mounted = useRef<boolean>(false);

    useEffect(() => {
        setVal(observable.get());
        mounted.current = true;

        const unsubscribe = observable.subscribe((newValue) => {
            if (mounted.current) {
                setVal(newValue);
            }
        });

        return (): void => {
            mounted.current = false;
            unsubscribe();
        };
    }, [observable]);

    return val;
}
