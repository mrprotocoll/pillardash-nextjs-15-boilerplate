"use client";

import { AlertProvider } from "pillardash-ui-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "@/styles/config/ThemeContext";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AlertProvider>
                    <ThemeProvider>
                        <div>{children}</div>
                    </ThemeProvider>
                </AlertProvider>
            </PersistGate>
        </Provider>
    );
}
