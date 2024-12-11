import ResourceView from "@/components/ResourceView/index.vue"
export default function Page() {
  return {
    pageName: null,
    pagePath: null,
    pageTitle: null,
    pageComponent: null,
    pageType: null,

    getCurrentPage()
    {
      return {
        name:this.pageName,
        path:this.pagePath,
        type:this.pageType,
        title:this.pageTitle
      } 
    },
    
    getPageRoute()
    {
      return {
        path: this.pagePath,
        name: this.pageName,
        component: ResourceView,
        meta: {
          title: this.pageTitle
        }
      }
    },

    type(type){
      this.pageType = type;
      return this;
    },
    list(){
      this.pageType = 'list';
      return this;
    },
    create(){
      this.pageType = 'create';
      return this;
    },
    edit(){
      this.pageType = 'edit';
      return this;
    },
    view(){
      this.pageType = 'view';
      return this;
    },
    component(component){
      this.pageComponent = component;
      return this;
    },
    name(name) {
      this.pageName = name;
      return this;
    },

    path(path) {
      this.pagePath = path;
      return this;
    },

    title(title) {
      this.pageTitle = title;
      return this;
    },
    
  };
}
