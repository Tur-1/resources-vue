import { ref } from "vue";
import {
  setResourceRouter,
} from "@/composables/useResourceRouter.js";

const resourcesArray = ref([]);
const resourcesRoutes = [];

class ResourcesProvider {

  loadResources()
  {
    resourcesArray.value = this.register()
    return this;
  }
  register()
  {
    return [];
  }
 
  getResources() {
    return resourcesArray.value;
  }
  setRouter(router) {
    setResourceRouter(router);
  }

  getRoutes(router) {
    this.getResources().forEach((recource) => {
      resourcesRoutes.push(...recource.getRoutes());
    });

    return resourcesRoutes;
  }
  getCurrentResource(routeName) {
    const matchedResource = this.getResources().find((resource) => {
      let matchedPage = resource
        .pages()
        .find((page) => page.pageName === routeName);
      if (matchedPage) {
        resource.setCurrentPage(matchedPage.getCurrentPage());
        return true;
      }
      return false;
    });

    return matchedResource || null;
  }
}

export default ResourcesProvider;
