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
};

export default AuthApi;
