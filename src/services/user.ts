import {wpApi} from "@/services/axios";

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await wpApi.post('/wp/v2/register', {
        username,
        email,
        password,
    });
    return response.data;
};
