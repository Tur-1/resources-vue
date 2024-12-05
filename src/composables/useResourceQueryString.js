import { ref } from "vue";
import { getRouter } from "./useResourceRouter";
import useResourceNotification from "../components/ResourceNotification/useResourceNotification";

let params = ref({});
export default function useResourceQueryString() {
  const router = getRouter()?.value;

  const add = (key, value) => {
    const newParams = { ...params.value };
    newParams[key] = value;

    if (router) {
      router.replace({ query: newParams });
      params.value = newParams;
    } else {
      params.value = newParams;
    }
  };

  const redirect = (route) => {
    if (router) {
      router.push(route);
    } else {
      useResourceNotification.error("Router is not available, redirect cannot proceed.");
    }
  };

  const reset = () => {
    params.value = {};

    if (router) {
      router.replace({ query: {} });
    }
  };

  const remove = (key) => {
    if (!key) return;

    const newParams = { ...params.value };
    delete newParams[key];
  
    router?.replace({ query: newParams }) ?? (params.value = newParams);
  };

  const getParams = () => {
    if (router) {
        params.value = router.currentRoute?.query;
    }
    return params.value;
  };

  const get = (key) => {
    return params.value[key];
  };

  const count = ()=>
  {
    return Object.keys(getParams()).length;
  }
  return {
    getParams, 
    count,
    add,
    remove,
    get,
    reset,
    redirect,
  };
}
