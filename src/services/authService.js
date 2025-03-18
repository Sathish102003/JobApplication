import axios from 'axios';

const REGISTER_USER = 'http://localhost:5156/api/Account/register';
const LOGIN_USER = 'http://localhost:5156/api/Account/login';

const login = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    return await axios.post(LOGIN_USER, userData, config);
};

const register = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const response = await axios.post(REGISTER_USER, userData, config);
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;
