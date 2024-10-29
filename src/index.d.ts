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
   * Get the query key used for this filter
   * @type {string}
   */
  queryString: string;

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
  requiresConfirmation: boolean;

  /**
   * Whether the action is a delete action.
   * @type {boolean}
   */
  isDeleteAction: boolean;

  /**
   * Sets the callback function to be executed when the action is triggered.
   * @param callback - The function to execute on action trigger.
   * @returns {this}
   */
  make(callback: (record: any) => void): this;

  /**
   * Sets a callback function to conditionally hide the action
   * @param callback
   * @returns {this}
   */
  hidden(callback: (record: any) => boolean): this;

  /**
   * Returns the route object for the action.
   * @returns {{ name: string; params?: Record<string, any> }}
   */
  route(): { name: string; params?: Record<string, any> };
}

export declare function Action(): ActionInstance;
declare interface ActionInstance{
  /**
   * Sets the callback function to be executed
   * @param callback 
   * @returns {this} 
   */
  make(callback: (item: any) => void): this;

  /**
   * Set the route for the action.
   * @param route 
   * @returns {this} 
   */
  route(route: { name: string; params?: Record<string, any> }): this;

  /**
   * Sets the icon for the action.
   * @param icon - The icon class or name to be set.
   * @returns {this} 
   */
  icon(icon: string): this;

  /**
   * Sets the CSS class for the action button.
   * @param className
   * @returns {this} 
   */
  class(className: string): this;

  /**
   * Specifies whether the action requires confirmation.
   * @param value
   * @returns {this} 
   */
  requiresConfirmation(value?: boolean): this;

  /**
   * Specifies whether the action is a delete action.
   * @returns {this} 
   */
  deleteAction(): this;

  /**
   * Sets the label for the action.
   * @param label
   * @returns {this} 
   */
  label(label: string): this;

  /**
   * Sets a callback function to be executed upon a successful action.
   * @param callback
   * @returns {this}
   */
  onSuccess(callback: (item: any) => void): this;

  /**
   * Sets a callback function to be executed upon action failure.
   * @param callback 
   * @returns {this}
   */
  onFailure(callback: (error: any) => void): this;

  /**
   * Sets a callback function to conditionally hide the action.
   * @param callback
   * @returns {this}
   */
  hidden(callback: (item: any) => boolean): this;
}
export declare function Column(): ColumnInstance;
declare interface ColumnInstance {
  /**
   * Sets the column as an image column.
   * @returns {this}
   */
  image(): this;

  /**
   * Sets a default value if the field data is null or undefined.
   * @param value 
   * @returns {this}
   */
  default(value: any): this;

  /**
   * Sets a custom formatting function for the column's value.
   * @param callback 
   * @returns {this}
   */
  format(callback: (value: any) => any): this;

  /**
   * Sets a tooltip for the column.
   * @param text
   * @returns {this}
   */
  tooltip(text: string): this;

  /**
   * Sets text alignment for the column.
   * @param type
   * @returns {this}
   */
  align(type: 'left' | 'center' | 'right'): this;

  /**
   * Sets a specific width for the column.
   * @param value - The width value in CSS units (e.g., '100px', '10%').
   * @returns {this}
   */
  width(value: string): this;

  /**
   * Conditionally hides the column based on a callback function.
   * @param visibleCallback 
   * @returns {this}
   */xs
  hidden(callback: (record: any) => boolean): this;

  /**
   * Sets the field for the column
   * @param field - The field name or path (supports nested paths, e.g., 'user.avatar').
   * @returns {this}
   */
  make(field: string): this;

  /**
   * Adds a custom CSS class to the column.
   * @param className 
   * @returns {this}
   */
  class(className: string): this;

  /**
   * Sets the display label for the column.
   * @param label
   * @returns {this}
   */
  label(label: string): this;
}
export declare class BaseResource {
  /**
   * The title of the page.
   * @type {string}
   */
  title: string;

  /**
   * Enable or disable simple pagination.
   * @type {boolean}
   */
  simplePagination: boolean;

  /**
   * The query key used for pagination in URL parameters.
   * @type {string}
   */
  paginationQueryKey: string;

  /**
   * The display style for the layout. Can be 'grid' or 'table'.
   * @type {string}
   * @default 'table'
   */
  display: 'grid' | 'table';

  /**
   * Searchable status of the resource.
   * @type {boolean}
   */
  searchable: boolean;

  /**
   * Placeholder for the search input.
   * @type {string}
   */
  searchPlaceholder: string;

  /**
   * Retrieves data for the resource, including pagination links and metadata.
   * @returns A promise that resolves to an object containing data, links, and metadata.
   */
  data(): Promise<{
    data: any[];
    links: { [key: string]: string };
    meta: { [key: string]: any };
  }>;

  /**
   * Defines the fields for the resource's display.
   * @returns An array of Column instances.
   */
  fields(): ColumnInstance[];

  /**
   * Defines the header actions for the resource.
   * @returns An array of actions to be displayed in the header.
   */
  headerActions(): ActionInstance[];

  /**
   * Defines the filters available for the resource.
   * @returns An array of filters.
   */
  filters(): any[];

  /**
   * Defines the actions available for each record in the resource.
   * @returns An array of Action instances for record-specific actions.
   */
  actions(): ActionInstance[];
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
