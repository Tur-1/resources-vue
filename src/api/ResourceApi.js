import useResourceQueryString from "../composables/useResourceQueryString";
import axios from "axios";
import
    {
        useResourceNotification
    } from "@/index";

const ResourceApi = (
    url,
    applyQueryParams = false,
    applyResourceNotification = true
) =>
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
        if (applyQueryParams)
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
            if (applyResourceNotification && response.status >= 200 && response.data?.message)
            {
                useResourceNotification.success(response.data.message);
            }
            return response;
        },
        (error) =>
        {
            if (applyResourceNotification && error.response?.message)
            {
                useResourceNotification.error(error.response.message);
            }
            return Promise.reject(error);
        }
    );
    return api;
};

export default ResourceApi;