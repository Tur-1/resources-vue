
export default function Column()
{
  return {


    image()
    {
      this.isImageColumn = true;
      return this;
    },
    default(value)
    {

      this.defaultValue = value

      return this;
    },
    format(callback)
    {
      this.formatCallback = callback;
      return this;
    },
    tooltip(text)
    {
      this.tooltipText = text;
      return this;
    },


    align(type)
    {
      this.alignType = type;
      return this;
    },


    width(value)
    {
      this.widthValue = value;
      return this;
    },
    hidden(visableCallback)
    {
      this.isColumnHidden = visableCallback;
      return this;
    },

    make(field)
    {
      this.fieldColumn = field;



      if (this.labelColumn == null && field.includes('.'))
      {
        const arrayField = field.split('.');
        this.labelColumn = arrayField[arrayField.length - 1];
      } else
      {
        this.labelColumn = field;
      }


      return this;
    },
    class(className)
    {
      this.classColumn = className;
      return this;
    },
    label(label)
    {
      this.labelColumn = label;
      return this;

    },
    
    getClass()
    {
      return this.classColumn
    },
    getImage()
    {
      return this.isImageColumn
    },
 
    getAlign() {
      return this.alignType;
    },

    getWidth() {
      return this.widthValue;
    },
    getLabel()
    {
      return this.labelColumn
    },
  
    getField(item)
    {
      let value = this.getNestedValue(item, this.fieldColumn);
      if (value == null) value = this.defaultValue;
      return this.formatCallback ? this.formatCallback(value) : value;
    },
    getNestedValue(obj, path)
    {
      return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
    },

    isHidden(record)
    {
      return typeof this.isColumnHidden === 'function' ? this.isColumnHidden(record) : this.isColumnHidden; 
    },



    labelColumn: null,
    classColumn: '',
    fieldColumn: null,
    isImageColumn: false,
    formatCallback: null,
    tooltipText: null,
    alignType: 'left',
    widthValue: null,
    isColumnHidden: false,
    classColumn: '',
    defaultValue: null,

  };
}