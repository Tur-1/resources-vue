import useResourceQueryString from "../composables/useResourceQueryString";
import axios from "axios";
import
    {
        useResourceNotification
    } from "@/index";

const ResourceApi = (url) =>
{
    let api = axios.create({
        baseURL: url,
        withCredentials: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
    });
    const queryString = useResourceQueryString();

    api.interceptors.request.use((config) =>
    {
        if (config.method === 'get')
        {
            const queryParams = queryString.params.value || {};
            config.params = {
                ...config.params,
                ...queryParams
            };
        }
        return config;
    });

    api.interceptors.response.use(
        (response) =>
        {
            if (response.status >= 200 && response.data?.message)
            {
                useResourceNotification.success(response.data.message);
            }
            return response;
        },
        (error) =>
        {
            if (error.response.data?.message)
            {           
                useResourceNotification.error(error.response.data?.message);
            }
            return Promise.reject(error);
        }
    );
    return api;
};

export default ResourceApi;