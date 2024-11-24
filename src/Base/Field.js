
export default function Field()
{
  return {
    classField:null,
    typeField:"text",
    labelField: null, 
    nameField: null,
    placeholderField: null,

    type(type)
    {
      this.typeField = type;
      return this;
    },
 
    placeholder(placeholder)
    {
      this.placeholderField = placeholder;
      return this;
    },
    
    class(className)
    {
      this.classField = className;
      return this;
    },
    label(label)
    {
      this.labelField = label;
      return this;

    }, 
  };
}
