import { reactive } from 'vue';

const useResourceNotification = reactive({
  message: '',
  isOpen: false, 
  time: 6200,
  timeoutId: null, 
  className:'',
  icon: '',

  success(message) {
    this.clearTimeout();
    this.isOpen = true; 
    this.message = message;
    this.className =   'toast-success';
    this.icon = 'bi bi-check-circle-fill';

    this.timeoutId = setTimeout(() => {
      this.isOpen = false;
    }, this.time);
  },

  error(message) {
    this.clearTimeout();
    this.isOpen = true; 
    this.message = message;
    this.icon = 'bi bi-x-circle-fill';

    this.className = 'toast-error';
    this.timeoutId = setTimeout(() => {
      this.isOpen = false;
      this.isError = false;
    }, this.time);
  },

  close() {
    this.clearTimeout(); 
    this.isOpen = false; 
  },

  clearTimeout() {
    if (this.timeoutId) {
      this.message = '';
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
});

export default useResourceNotification;
