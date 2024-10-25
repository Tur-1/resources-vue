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
   * Returns the route object for the action.
   * @returns {{ name: string, param?: string }}
   */
  route(): { name: string; param?: string };

  /**
   * Handle the action.
   * @param {Object} record - The record associated with the action.
   * @throws {ResourceActionException} If not implemented.
   * @returns {void}
   */
    handle(record: any): void;
}
export declare function Action(): ActionInstance;

interface ActionInstance {
  /**
   * The route name of the action.
   */
  routeName?: string;

  /**
   * The route parameter of the action.
   */
  routeParam?: string;

  /**
   * The label of the action.
   */
  label?: string;

  /**
   * The icon of the action.
   */
  icon?: string;

  /**
   * The CSS class for the action button.
   */
  class?: string;

  /**
   * Whether the action requires confirmation.
   */
  confirmAction: boolean = false;

  /**
   * Whether the action requires delete.
   */
  deleteAction: boolean = false;

  /**
   * The callback function for the action.
   */
  callback?: (item: any) => void;

  /**
   * Sets the callback function to be executed when the action is triggered.
   * @param callback - The function to be executed.
   * @returns {this} 
   */
  make(callback: (item: any) => void): this;

  /**
   * Set the route for the action.
   * @param route - The route object containing name and parameter.
   * @returns {this} 
   */
  route(route: { name: string; param: string }): this;

  /**
   * Sets the icon for the action.
   * @param icon - The icon class or name to be set.
   * @returns {this} 
   */
  icon(icon: string): this;

  /**
   * Sets the CSS class for the action button.
   * @param className - The CSS class to be applied.
   * @returns {this} 
   */
  class(className: string): this;

  /**
   * Specifies whether the action requires confirmation.
   * @param value
   * @returns {this} 
   */
  requiresConfirmation(value?: boolean = false): this;

  /**
   * Specifies whether the action is a delete action.
   * @param isDeleteAction
   * @returns {this} 
   */
  deleteAction(isDeleteAction?: boolean = false): this;

  /**
   * Sets the label for the action.
   * @param label
   * @returns {this} 
   */
  label(label: string): this;

  /**
   * Executes the callback function for the action.
   * @param item
   */
  handle(item: any): void;
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
