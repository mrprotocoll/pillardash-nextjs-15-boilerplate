import Axios from "axios";

import { ROUTES } from "@/lib/routes";
import { logout } from "@/redux/reducers/authSlice";
import { store } from "@/redux/store";

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.domain.com/v1",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // Access the Redux state directly from the store
        const { auth } = store.getState();
        const token = auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.dispatch(logout());
                    // toast.error("Session expired. Please login again.");
                    window.location.href = ROUTES.login;
                    break;
                case 403:
                    // Handle forbidden
                    break;
                case 404:
                    // Handle not found
                    break;
                case 500:
                    break;
                default:
                    console.error("Unhandled API error:", error);
            }
        }
        // const errorMessage = error.response?.data?.message || "An error occurred. try again";
        // toast.error(errorMessage);

        return Promise.reject(error);
    }
);

export default api;
