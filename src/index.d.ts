import ResourceActionException from "@/Exceptions/ResourceActionException";
import { DefineComponent } from 'vue';
import { Router } from 'vue-router';
import { AxiosInstance } from 'axios';
import { Router, RouteLocationRaw } from 'vue-router';
interface ResourceNotification {
  message: string;
  isOpen: boolean;
  isError: boolean;
  time: number;
  success: (message: string) => void;
  error: (message: string) => void;
}

export declare const useResourceNotification: ResourceNotification;


interface FilterOptions {
  data: any[];
  label?: string | null;
  value?: string | null;
}

interface TransformedOption {
  label: any;
  value: any;
}

export declare class ResourceFilter {
  /**
   * The label of the filter (optional).
   * @type {string}
   */
  label?: string;

  /**
   * The type of the filter, e.g., 'select', 'text'.
   * Must be implemented.
   * @type {string}
   */
   type: string;

  /**
   * The selected value for the filter.
   * @type {any}
   */
  selectedValue: any;

  constructor();

  /**
   * Get the query key used for this filter, based on the class name.
   * @return {string}
   */
  queryKey(): string;

  /**
   * Validate and get the type of the filter.
   * Throws an exception if the type is missing.
   * @return {string} The filter type.
   */
  getType(): string;

  /**
   * Handle the filter logic. Should be implemented in subclasses.
   */
  handle(): void;

  /**
   * Get the options for the filter if type is 'select'.
   * This method should be overridden in subclasses to provide options for the filter.
   * @throws {Error} 
   * @return {Promise<FilterOptions>} 
   */
 async options(): Promise<FilterOptions>;
 
}

 


export declare class ResourceAction {
  /**
   * The label of the action.
   * @type {string}
   */
  label?: string;

  /**
   * The icon of the action.
   * @type {string}
   */
  icon?: string;

  /**
   * The CSS class for the action button.
   * @type {string}
   */
  class?: string;

  /**
   * Whether the action requires confirmation.
   * @type {boolean}
   */
  isConfirmAction: boolean;

  /**
   * Handle the action.
   * @throws {ResourceActionException} If not implemented.
   */
  handle(): Promise<void>;
}
 



interface ResourceField {
  label: string;
  field: string;
}

interface Page {
  name: string; 
  resource: {
    title: string,
    label: string,
    paramKey: string,
    icon: string,
    class: string
  } 
}


interface SearchOption {
  searchable: boolean;
  placeholder: string;
  queryStringKey: string;
}

export declare class BaseResource {
  title: string;
  paginationQueryKey: string;

  constructor();

  /**
   * Get the paginated data for the resource.
   * @returns {Promise<{data: any, pagination: any}>}
   * @throws {BaseResourceException}
   */
  data(): Promise<{ data: any; pagination: any }>;

  /**
   * Get the fields for the resource.
   * @returns {ResourceField[]}
   * @throws {BaseResourceException}
   */
  fields(): ResourceField[];

  /**
   * Get the pages for the resource.
   * @returns {Page[]}
   */
  pages(): Page[];

  /**
   * Get the filters for the resource.
   * @returns {[]}
   */
  filters(): [];

  /**
   * Get the actions for the resource.
   * @returns {[]}
   */
  actions(): [];

  /**
   * Get the search options for the resource.
   * @returns {SearchOption}
   */
  searchOptions(): SearchOption;
}

interface ResourceFormProps {
  id?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  class?: string;
  step?: string;
  title?: string;
  submitTitle?: string;
  submit?: Function;
  options?: Record<string, any>[] | Record<string, any>;
}

export declare const ResourceForm: DefineComponent<ResourceFormProps, {}, {}>;



/**
 * Set the router instance to be used globally.
 * This should be called from your main application to set the Vue Router instance.
 *
 * @param {Router} router - The router instance to be set globally.
 */
export declare function setResourceRouter(router: Router): void;


/**
 * Creates an Axios instance with optional query parameters applied from the useResourceQueryString composable.
 * @param {string} url - The base URL for the Axios instance.
 * @param {boolean} [applyQueryParams=false] 
 * @param {boolean} [applyResourceNotification=true] 
 * @returns {AxiosInstance}
 */
export declare function ResourceApi(url: string, applyQueryParams?: boolean,applyResourceNotification:Boolean): AxiosInstance;
 

interface QueryParams {
  [key: string]: string | (string | null)[] | null | undefined;
}

/**
 * Declare the useResourceQueryString function.
 * This file provides type declarations for the JavaScript implementation.
 */
export declare function useResourceQueryString(): {
  params: QueryParams;
  add: (key: string, value: string | null | undefined) => void;
  remove: (key: string) => void;
  get: (key: string) => string | (string | null)[] | null | undefined;
  reset: () => void;
};
 