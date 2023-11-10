/** Слушатель. */
type Listener<T> = (val: T) => void;
/** Отписка. */
type Unsubscriber = () => void;


export class Observable<T> {
    listeners: Listener<T>[] = [];

    constructor(private val: T) {}

    get(): T {
        return this.val;
    }

    set(val: T, updateCallback?: (val: T) => void): void {
        !!updateCallback && updateCallback(val);
        if (this.val !== val) {
            this.val = val;
            this.listeners.forEach((l) => l(val));
        }
    }

    subscribe(listener: Listener<T>): Unsubscriber {
        this.listeners.push(listener);

        return (): void => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
