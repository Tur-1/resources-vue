import { ref } from 'vue';
import { getRouter } from "./useResourceRouter";

let params = ref({});

export default function useResourceQueryString()
{
  const router = getRouter()?.value; 

  if (router) {
    params.value = router.currentRoute.query;
  }

  const add = (key, value) => {
    const newParams = { ...params.value };

    if (newParams[key] !== value) {
      newParams[key] = value;
  
      if (router) {
        router.push({ query: newParams });
        params.value = newParams;
      } else {
        params.value = newParams;
      }
    }
  };

  const redirect = (route) => {
    if (router) {
      router.push(route);
    } else {
      console.error("Router is not available, redirect cannot proceed.");
    }
  };

  const reset = () => {
    params.value = {};
    if (router) {
      router.replace({
        query: {}
      });
    }
  };

  const remove = (key) => {
    const newParams = { ...params.value };
    delete newParams[key];

    if (router) {
      router.replace({
        query: newParams,
      });
    } else {
      params.value = newParams;
    }
  };

  const get = (key) => {
    return params.value[key];
  };

  return {
    params,
    add,
    remove,
    get,
    reset,
    redirect,
  };
}
