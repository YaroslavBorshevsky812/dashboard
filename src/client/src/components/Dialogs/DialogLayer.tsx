import { FC } from 'react';
import { Observable } from '../../utils/Observable';
import { useObservable } from '../../utils/useObservable';
import './dialog.scss';

const dialogContainer = new Observable<FC[]>([]);

/** Открыть диалог. */
export const openDialog = (dialog: FC, isOpenOnlyFirstModal?: boolean): void => {
    if (isOpenOnlyFirstModal) {
        !dialogContainer.get().length && dialogContainer.set([...dialogContainer.get(), dialog]);
    } else {
        dialogContainer.set([...dialogContainer.get(), dialog]);
    }
};

/** Закрыть диалог. */
export const closeDialog = (): void => {
    dialogContainer.set(dialogContainer.get().slice(0, -1));
};

export const DialogLayer = () => {
    const dialogs: FC[] = useObservable(dialogContainer);

    return (
        <>
            {dialogs.map((Dialog, index) => (
                <div key={index} className="dlg__overlay">
                    {<Dialog/>}
                </div>
            ))}
        </>
    );
};
