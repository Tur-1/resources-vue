export default function Form() {
  return {
    dataCallback: undefined,
    createCallback: undefined,
    updateCallback: undefined,
    formFields: [],

    
    fields(fields)
    {
        this.formFields = fields;
        return this;
    },
    data(callback) {
      this.dataCallback = callback;
      return this;
    },

    async getData() {
      if (this.dataCallback) {
        return typeof this.dataCallback === "function"
          ? await this.dataCallback()
          : this.dataCallback;
      }
    },
    onCreate(callback) {
      this.createCallback = callback;
      return this;
    },

    onUpdate(callback) {
      this.updateCallback = callback;
      return this;
    },
    async FormCreateSubmit(data) {
      await this.createCallback(data);
    },
    async FormUpdateSubmit(data) {
      await this.updateCallback(data);
    },
  };
}
