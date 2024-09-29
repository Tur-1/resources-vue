import { ref } from 'vue';

// Global router reference
let router = ref(null);

/**
 * Set the router instance to be used globally.
 * This should be called from your main application to set the Vue Router instance.
 *
 * @param router - The router instance to be set globally.
 */
export function setResourceRouter(routerInstance) {
    router.value = routerInstance;
}

/**
 * Get the globally set router instance.
 * Throws an error if the router is not set.
 *
 * @returns router
 * @throws {Error}
 */
export function getRouter() {
  
  return router;
}
