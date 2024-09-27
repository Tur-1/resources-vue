import { ref } from 'vue';
import { getRouter } from "./useResourceRouter";

let params = ref({});

export default function useResourceQueryString()
{

  const router = getRouter().value;

  params.value = router.currentRoute.query;
  const add = (key, value) =>
  {
    const newParams = { ...params.value };

    newParams[key] = value;

    router.push({ query: newParams })
  };


  const redirect = (route)=>{
    router.push(route);
  }
  const reset = () =>
  {
    params.value = {}

    router.replace({
      query: {}
    });
  };

  const remove = (key) =>
  {
    const newParams = { ...params.value };
    delete newParams[key];

    router.replace({
      query: newParams,
    });
  };

  const get = (key) =>
  {
    return params.value[key];
  }


  return {
    params,
    add,
    remove,
    get,
    reset,
    redirect,
  };
}
