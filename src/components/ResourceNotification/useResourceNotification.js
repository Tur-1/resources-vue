import { reactive } from 'vue';


const useResourceNotification = reactive({
  message: '',
  isOpen: false,
  isError: false,
  time: 3200,

  success(message) {
    this.isOpen = true;
    this.message = message;

    setTimeout(() => {
      this.isOpen = false;
    }, this.time);
  },

  error(message) {
    this.isOpen = true;
    this.isError = true;
    this.message = message;

    setTimeout(() => {
      this.isOpen = false;
      this.isError = false;
    }, this.time);
  }
});

export default useResourceNotification;
