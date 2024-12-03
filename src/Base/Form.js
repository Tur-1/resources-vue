export default function Form() {
  return {
    dataCallback: undefined,
    createConfig: { title: "Create", submit: undefined },
    updateConfig: { title: "Update", submit: undefined },

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

    onCreate({ title = "Create", submit }) {
      this.createConfig.title = title;
      this.createConfig.submit = submit;
      return this;
    },

    onUpdate({ title = "Update", submit }) {
      this.updateConfig.title = title;
      this.updateConfig.submit = submit;
      return this;
    },
  };
}
