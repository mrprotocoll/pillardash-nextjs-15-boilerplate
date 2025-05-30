import React, { createContext, useCallback, useContext, useState } from "react";

import Alert, { AlertProps, AlertType } from "./Alert";

interface AlertContextProps {
    showAlert: (props: Omit<AlertProps, "onClose">) => void;
    success: (message: string, description?: string) => void;
    error: (message: string, description?: string) => void;
    info: (message: string, description?: string) => void;
    warning: (message: string, description?: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface AlertItem extends AlertProps {
    id: string;
}

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setAlerts] = useState<AlertItem[]>([]);

    const removeAlert = useCallback((id: string) => {
        setAlerts((prevAlerts) => prevAlerts.filter((toast) => toast.id !== id));
    }, []);

    const showAlert = useCallback(
        (props: Omit<AlertProps, "onClose">) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newAlert: AlertItem = {
                ...props,
                id,
                onClose: () => removeAlert(id),
            };
            setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
        },
        [removeAlert]
    );

    const createAlertFn = useCallback(
        (type: AlertType) => (message: string, description?: string) => {
            showAlert({ message, description, type });
        },
        [showAlert]
    );

    const contextValue = {
        showAlert,
        success: createAlertFn("success"),
        error: createAlertFn("error"),
        info: createAlertFn("info"),
        warning: createAlertFn("warning"),
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <div className='toast-container'>
                {toasts.map((toast) => (
                    <Alert key={toast.id} {...toast} />
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error("useAlert must be used within a AlertProvider");
    }
    return context;
};
