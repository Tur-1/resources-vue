import useResourceNotification from './components/ResourceNotification/useResourceNotification';
import ResourceFilter from "./Base/ResourceFilter"
import BaseResource from "./Base/BaseResource"
import ResourceAction from "./Base/ResourceAction"
import ResourceForm from "./components/ResourceForm/index.vue"
import ResourceList from "./components/ResourceList/index.vue"
import {setResourceRouter} from "./composables/useResourceRouter"
import ResourceApi from "./api/ResourceApi"
 
export
{ 
    ResourceApi,
    ResourceForm,
    ResourceList,
    ResourceFilter,
    BaseResource,
    ResourceAction,
    useResourceNotification,
    setResourceRouter,
};