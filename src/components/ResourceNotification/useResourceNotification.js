import { reactive } from 'vue';


const useResourceNotification = reactive({
  message: '',
  isOpen: false,
  isError: false,
  time: 6200,

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
  },

  close(){
    this.isOpen = false;
  }
});

export default useResourceNotification;
