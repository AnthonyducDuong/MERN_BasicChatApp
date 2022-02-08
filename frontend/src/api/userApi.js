import axiosClient from "./axiosClient";

const path = '/user';

const userApi = {
    create: (params) => {
        const url = path + '/register';
        return axiosClient.post(url, params);
    },
    login: (params) => {
        const url = path + '/login';
        return axiosClient.post(url, params);
    },
    googleLogin: (params) => {
        const url = path + '/google-login';
        return axiosClient.post(url, params);
    }
};

export default userApi;