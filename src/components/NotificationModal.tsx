import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Alert, AlertTitle } from '@mui/material';

export enum NotificationType {
    Success,
    Warning,
}

export interface Notification {
    type?: NotificationType,
    msg?: string,
}

export const NotificationContext = createContext({
    notification: {} as Notification,
    setNotification: (notification: Notification) => {},
});

export function NotificationModal() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const { notification, setNotification } = useContext(NotificationContext);

    const setModalValue = useCallback(async (value: boolean) => {
        setShowModal(value);
        if (!value) {
            // Hide notification
            setTimeout(() => setNotification({}), 700);
        }
    }, [setShowModal, setNotification]);

    const setModalTimeout = useCallback(async () => {
        // Set timeout to 4 seconds
        setTimeout(() => {
            setModalValue(false);
        }, 4000);
    }, [setModalValue]);

    useEffect(() => {
        // Show notification
        if (notification.msg) setModalValue(true);
    }, [notification, setModalValue]);

    useEffect(() => {
        // Set the timeout
        if (showModal) setModalTimeout();
    }, [showModal, setModalTimeout]); 

    return (
        <>
        {
            showModal && notification.msg !== undefined &&
            <Alert 
                severity={notification.type === NotificationType.Success ? 'success' : 'error'}
                onClose={() => setModalValue(false)}
                sx={{ position: 'fixed', left: '25%', bottom: '50px', width: '50%' }}
            >
                <AlertTitle>
                    {notification.type === NotificationType.Success ? 'Success' : 'Error'}
                </AlertTitle>
                {notification.msg}
            </Alert>
        }
        </>
    );
};