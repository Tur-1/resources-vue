export default function Field() {
  return {
    fieldclass: null,
    fieldType: "text",
    fieldLabel: null,
    fieldName: null,
    fieldPlaceholder: null,
    fieldRequired:false,
    
    required(required = false) {
      this.fieldRequired = required;
      return this;
    },

    type(type) {
      this.fieldType = type;
      return this;
    },

    placeholder(placeholder) {
      this.fieldPlaceholder = placeholder;
      return this;
    },
    make(name)
    {
      this.fieldName = name;
      return this;
    },
    class(className) {
      this.fieldclass = className;
      return this;
    },
    label(label) {
      this.fieldLabel = label;
      return this;
    },
  };
}
