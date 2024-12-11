import Resource from "./Base/Resource"
import ResourceFilter from "./Base/ResourceFilter"
import ResourceAction from "./Base/ResourceAction" 
import {setResourceRouter} from "./composables/useResourceRouter"
import ResourceForm from "./components/ResourceForm/index.vue"
 import ResourceList from "./components/ResourceList/index.vue"
import useResourceApi from "./api/useResourceApi"
import useResourceQueryString from './composables/useResourceQueryString'; 
import useResourceNotification from './components/ResourceNotification/useResourceNotification';
import ResourceNotification from './components/ResourceNotification/index.vue';
import Action from './Base/Action';
import Column from './Base/Column'; 
import Table from './Base/Table';
import Form from './Base/Form'; 
import Page from './Base/Page';  
import Field from './Base/Field';  

import ResourcesProvider from './Base/ResourcesProvider'; 
import ResourceView from "./components/ResourceView/index.vue"

export
{ 
    Field,
    ResourcesProvider, 
    Page,
    Form,  
    Table,
    ResourceView,
    useResourceApi, 
    Action,
    Column,
    ResourceForm,
     ResourceList,
    ResourceFilter,
    Resource,
    ResourceAction,
    useResourceNotification,
    ResourceNotification,
    setResourceRouter,
    useResourceQueryString,
};