import useResourceQueryString from '../composables/useResourceQueryString';
import axios from 'axios';

const ResourceApi = (url, applyQueryParams = true) => {
    let api = axios.create({
        baseURL: url,
        withCredentials: true,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    const queryString = useResourceQueryString();

    api.interceptors.request.use((config) => {
        if (applyQueryParams) {
            const queryParams = queryString.params.value || {};
            config.params = { ...config.params, ...queryParams };
        }
        return config
    })

    return api
}

export default ResourceApi
