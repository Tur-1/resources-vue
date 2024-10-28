
export default function Column()
{
  return {

    labelColumn: null,
    classColumn: '',
    fieldColumn: null,
    isImageColumn: false,

    getClass()
    {
      return this.classColumn
    },
    getImage()
    {
      return this.isImageColumn
    },
    image()
    {
      this.isImageColumn = true;
      return this;
    },
    
    getLabel()
    {
      return this.labelColumn
    },
    getField(item)
    {
      return this.getNestedValue(item, this.fieldColumn);
    },
    getNestedValue(obj, path)
    {
      return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
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
    label(label)
    {
      this.labelColumn = label;
      return this;

    }

  };
}
