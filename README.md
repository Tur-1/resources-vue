# @tur1/resources-vue Package

This package helps you create filters, actions, resources, and pages efficiently in your Vue project.

## Installation

First, install the package:

```bash
npm install @tur1/resources-vue --save
```

## Usage

### Adding Commands

Add the following commands to your project's `package.json` file under the `scripts` section:

```json
"scripts": {
  "make:filter": "node ./node_modules/@tur1/resources-vue/scripts/create-filter.js",
  "make:action": "node ./node_modules/@tur1/resources-vue/scripts/create-action.js",
  "make:resource": "node ./node_modules/@tur1/resources-vue/scripts/create-resource.js",
  "make:page": "node ./node_modules/@tur1/resources-vue/scripts/create-page.js"
}
```

### Creating Pages

To create a new page, run the following command:

```bash
npm run make:page Users
```

This will generate a new page structure for `Users`. It will also automatically register the `Users` routes in `router/index.vue`.

Below is the expected file structure generated by the command:

```
pages
├── Home
├── Users
│   ├── Actions
│   │   └── DeleteAction.js
│   ├── api
│   │   └── useUsersApi.js
│   ├── Filters
│   │   └── Filter.js
│   ├── routes
│   │   └── UsersRoutes.js
│   ├── services
│   │   └── useUsersService.js
│   ├── stores
│   │   └── UsersStore.js
│   ├── views
│   │   ├── create.vue
│   │   ├── edit.vue
│   │   ├── index.vue
│   │   └── show.vue
│   └── UsersResource.js
```

### Resource Class

To render a table, you need to create a resource class and pass it to the `ResourceList` component.

```javascript
import { ResourceList } from '@tur1/resources-vue'
import UsersResource from '@/pages/Users/UsersResource'

<ResourceList :resource="new UsersResource()" />
```
#### Fields

You can specify the fields from your data for a resource table by defining:

- `label`: The header column.
- `field`: The name of the data field.

If the field is an image, add `image: true` to display the image in the table.

Example:

```javascript
fields() {
  return [
    {
      label: 'Name',
      field: 'name'
    },
    {
      image: true,
      label: 'Avatar',
    },
    {
      label: 'Email',
      field: 'email'
    },
    {
      action: true,
      label: 'Actions'
    }
  ];
}
```

#### Actions

In the actions field, you can specify action buttons like "Show", "Edit", and "Delete", which will be displayed as buttons or dropdowns in the table.

Example:

```javascript
fields() {
  return [
    {
      label: 'Actions',
      action: true,
    }
  ];
}
```

The actions will appear in the form of buttons similar to the example below:

<img width="295" alt="Screenshot 1446-04-08 at 6 54 58 PM" src="https://github.com/user-attachments/assets/dcd2fc10-9342-4ecf-ab02-35f81fcb3e28">


### Data

The `data()` function retrieves resource data. You can return the data array alone or with pagination details, links, and meta data.

Example without pagination:

```javascript
async data() {
  let response = await useUsersApi.getPaginatedList();
  return response.data.data;
}
```

Example with pagination:

```javascript
async data() {
  let response = await useUsersApi.getPaginatedList();
  return {
    data: response.data.data,
    links: response.data.links,
    meta: response.data.meta,
  };
}
```

### Pages

Each page should implement an object specifying the route parameters, route name, title, and other configurations.

Example:

```javascript
pages() {
  return [new EditPage(),new ViewPage()];
}
```

### Adding Filters

```bash
npm run make:filter Users/StatusFilter
```


You can add filters to your pages using the `ResourceFilter` class. If the filter type is `select`, you have two ways to get options: either by returning an array or an object with key-value pairs for label and value.

#### Example Filter Implementation:

```javascript
import { ResourceFilter } from '@tur1/resources-vue'

class StatusFilter extends ResourceFilter
{
  /**
   * The label of the filter (optional).
   * @type {string}
   */
  label = 'Filter';

  /**
   * The type of the filter.
   * @type {string}
   */
  type = 'select';

  /**
   * Handle the filter logic.
   */
  handle()
  {
    // Implement the filter logic here when the value is selected
  }

  /**
   * Get the options for the filter if type is 'select'.
   */
  options()
  {
    // Return options as an array
    let optionsArray = ['option 1', 'option 2'];
    return optionsArray;

    // Alternatively, return options as an object with label and value
    let optionsObject = [{ id: 1, title: 'option 1' }, { id: 2, title: 'option 2' }];
    return {
      data: optionsObject,
      label: 'title',
      value: 'id'
    };
  }
}

export default Filter;
```


### Adding Actions

You can generate a new action by running the command below.
```bash
npm run make:filter Users/UserAction
```
 
This command will generate the UserAction.js file in the appropriate folder (for example, inside pages/Users/Actions).
```javascript 
import { ResourceAction } from '@tur1/resources-vue'

class UserAction extends ResourceAction
{
  /**
   * The label of the action.
   * This label will appear as the name of the action in the UI.
   * @type {string}
   */
  label = 'action';

  /**
   * The icon of the action.
   * Define the icon class to be displayed next to the label.
   * @type {string}
   */
  icon = 'fa-solid fa-users-can';

  /**
   * The CSS class for the action button.
   * You can use custom CSS classes to style the action button.
   * @type {string}
   */
  class = 'text-danger';

  /**
   * Handle the action.
   * This method contains the logic that will be executed when the action is triggered.
   * @param {Object} item - The resource item on which the action is applied.
   * @param {number} index - The index of the item in the list.
   */
  async handle({ item, index })
  {
    // Your logic to handle the action . 
  }
}

export default UserAction;

```

### Notifications

To show notifications, you can use the `useResourceNotification` composable to display success or error messages.

Example:

```javascript
import { useResourceNotification } from "@tur1/resources-vue";

useResourceNotification.error("Error message");
useResourceNotification.success("Success message");
```

### Query String Management

You can use the `useResourceQueryString` composable to manage query strings for URL parameters.

Example:

```javascript
import { useResourceQueryString } from "@tur1/resources-vue";

let queryString = useResourceQueryString();
queryString.add("status", "active"); // ?status=active
queryString.remove("status"); // removes the status parameter
queryString.reset(); // removes all query parameters
queryString.get("status"); // returns 'active'
```

### ResourceApi

To make API requests, you can use the `ResourceApi`:

```javascript
import { ResourceApi } from "@tur1/resources-vue";

ResourceApi("http://example.test/").get("/users");
```

### Router Setup with `setResourceRouter`

To use filters based on query strings, you need to integrate the `setResourceRouter` function in your Vue Router setup. Modify your `router/index.js`:

```javascript
import { createRouter, createWebHistory } from "vue-router";
import UsersRoutes from "@/pages/Users/routes";
import { setResourceRouter } from "@tur1/resources-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...UsersRoutes],
});

setResourceRouter(router);

export default router;
```

The `setResourceRouter(router)` function ensures filters and other resource-based functionalities work seamlessly with the query string.
