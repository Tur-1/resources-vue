import { reactive } from 'vue';

const ResourceIndicator = reactive({
  isOnProgress: false,
  show() {
    this.isOnProgress = true;
  },
  hide() {
    this.isOnProgress = false;
  },
});

export default ResourceIndicator;
