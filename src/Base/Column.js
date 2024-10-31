
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

    badge(callback)
    {
      this.badgeClassCallback = callback;
      return this;
    },

    getBadgeClass(value)
    {
      if (typeof this.badgeClassCallback === 'function')
      {
        return this.badgeClassCallback(value);
      } else if (typeof this.badgeClassCallback === 'object')
      {
        return this.badgeClassCallback[value] || 'dark';
      }
      
      return 'dark';
    },
    getClass()
    {
      return this.classColumn
    },
    getImage()
    {
      return this.isImageColumn
    },

    getAlign()
    {
      return this.alignType;
    },

    getWidth()
    {
      return this.widthValue;
    },
    getLabel()
    {
      return this.labelColumn
    },
    style(style)
    {
      this.cssStyle = style;

      return this;
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


    badgeClassCallback: null,
    cssStyle: null,
    labelColumn: null,
    classColumn: '',
    fieldColumn: null,
    isImageColumn: false,
    formatCallback: null,

    alignType: 'left',
    widthValue: null,
    isColumnHidden: false,
    classColumn: '',
    defaultValue: null,

  };
}
