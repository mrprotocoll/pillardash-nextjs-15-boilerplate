import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

const AuthApi = {
    post_login: async ({ email, password }: { email: string; password: string }) => {
        try {
            return await api.post(ENDPOINTS.post_login, { email, password });
        } catch (error) {
            throw error;
        }
    },

    post_logout: async () => {
        const response = await api.post(ENDPOINTS.post_logout);
        return response.data;
    },

    registerConsultant: async (data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }) => {
        try {
            const response = await api.post(ENDPOINTS.register, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Email Verification
    sendVerificationEmail: async (email: string) => {
        try {
            const response = await api.post(ENDPOINTS.sendVerificationEmail, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    verifyEmailOTP: async (email: string, otp: string) => {
        try {
            const response = await api.post(ENDPOINTS.verifyEmailOTP, { email, otp });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resendVerificationEmail: async (email: string) => {
        try {
            const response = await api.post(ENDPOINTS.resendVerificationEmail, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Password Management
    requestPasswordReset: async (email: string) => {
        try {
            const response = await api.post(ENDPOINTS.requestPasswordReset, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        try {
            const response = await api.post(ENDPOINTS.resetPassword, { token, newPassword });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        try {
            const response = await api.post(ENDPOINTS.changePassword, {
                currentPassword,
                newPassword,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Session/Token Management
    refreshToken: async (refreshToken: string) => {
        try {
            const response = await api.post(ENDPOINTS.refreshToken, { refreshToken });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // User Status Checks
    checkEmailAvailability: async (email: string) => {
        try {
            const response = await api.get(
                `${ENDPOINTS.checkEmailAvailability}?email=${encodeURIComponent(email)}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    validateRegistrationToken: async (token: string) => {
        try {
            const response = await api.get(
                `${ENDPOINTS.validateRegistrationToken}?token=${encodeURIComponent(token)}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default AuthApi;
