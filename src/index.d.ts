import ResourceActionException from "@/Exceptions/ResourceActionException";
import { DefineComponent } from "vue";
import { Router } from "vue-router";
import { AxiosInstance } from "axios";
import { Router, RouteLocationRaw } from "vue-router";
import { Ref } from "vue";
interface ResourceNotification {
  message: string;
  isOpen: boolean;
  isError: boolean;
  time: number;
  success: (message: string) => void;
  error: (message: string) => void;
}

export declare const useResourceNotification: ResourceNotification;

declare interface FilterOptions {
  data: any[];
  label?: string | null;
  value?: string | null;
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
   * Get the query key used for this filter, based on the class name.
   * @return {string}
   */
  queryKey(): string;

  /**
   * Handle the filter logic. Should be implemented in subclasses.
   */
  handle(value): void;

  /**
   * Get the options for the filter if type is 'select'.
   * @throws {Error}
   * @return {FilterOptions}
   */
  options(): FilterOptions;
}

export declare class ResourceAction {
  /**
   * The route name of the action.
   * @type {string}
  */
  routeName?: string;
  /**
     * The route param of the action.
     * @type {string}
   */
  routeParam?: string;
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
  confirmAction: boolean;
  /**
   * Whether the action requires delete.
   * @type {boolean}
   */
  deleteAction: boolean;
  /**
   * Handle the action.
   * @throws {ResourceActionException} If not implemented.
   */
  handle(): Promise<void>;
}

declare interface ResourceField {
  label: string;
  field: string;
  action?: Boolean;
  image?: Boolean;
}

declare interface Page {
  routeName: string;
  routeParam?: string;
  label: string;
  icon?: string;
  class?: string;
}
export declare class BaseResource {
  /**
   * The title of the page.
   * @type {string}
   */
  title: String;

  /**
   * Enable or disable simple pagination.
   * @type {Boolean}
   */
  simplePagination: Boolean = true;

  /**
   * The display style for the layout.
   * Can be 'grid' or 'table'.
   *
   * @type {string}
   * @default 'table'
   */
   display: string = "table";

    /**
     * display the label for each column. 
     * 
     * @type {Boolean}
     * @default false
     */
    displayLabel: boolean = false;
  
  /**
   * The query key used for pagination in URL parameters.
   * @type {string}
   */
  paginationQueryKey: String = "page";
  /**
    * Searchable status of the resource.
    * @type {boolean}
    */
  searchable: Boolean = true;

  /**
   * Placeholder for the search input.
   * @type {string}
   */
  searchPlaceholder: String = 'search';

  /**
   * Retrieves the resource data.
   * return just the data array, or data with pagination details, or data with links and meta information.
   * @returns {any[] | { data: any[]; links: any; meta: any } | { data: any[]; pagination: { links: any; meta: any }}}
   */
  data(): any[] | { data: any[]; links: any; meta: any } | { data: any[]; pagination: { links: any; meta: any } };

  /**
   * Get the fields for the resource.
   * @returns {ResourceField[]}
   * @throws {BaseResourceException}
   */
  fields(): ResourceField[];

  /**
   * Get the pages for the resource.
   * @returns {Page}
   */
  pages(): { [key: string]: Page };

  /**
 * Get the header actions for the resource.
 * @returns {[]}
 */
  headerActions(): [] {
    return [];
  }
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
}

interface ResourceFormProps {
  id?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  redirectAfterSubmit: [String, Object],
  class?: string;
  title?: string;
  submitTitle?: string;
  submit?: [String, Function];
  options?: Record<string, any>[] | Record<string, any>;
}

export declare const ResourceForm: DefineComponent<ResourceFormProps, {}, {}>;

/**
 * Set the router instance to be used globally. 
 *
 * @param {Router} router - The router instance to be set globally.
 */
export declare function setResourceRouter(router: Router): void;


interface QueryParams {
  [key: string]: string | (string | null)[] | null | undefined;
}

interface ResourceApiOptions {
  url: string;
  applyQueryString?: boolean;
}

/**
 * Creates an Axios instance
 * @param {ResourceApiOptions} options
 * @param {string} options.url - The base URL for the Axios instance.
 * @param {boolean} [options.applyQueryString=false] - Whether to apply the query string automatically.
 * @returns {AxiosInstance}
 */
export declare function ResourceApi(
  options: ResourceApiOptions
): AxiosInstance;

export interface ResourceQueryString {
  params: Ref<Record<string, any>>;
  add: (key: string, value: any) => void;
  remove: (key: string) => void;
  get: (key: string) => any;
  reset: () => void;
  redirect: (route: RouteLocationRaw | string) => void;
}

export declare function useResourceQueryString(): ResourceQueryString;
