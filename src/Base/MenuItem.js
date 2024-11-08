

export default function MenuItem()
{
    return {

        labelItem: undefined,
    
        iconItem: undefined,
     
        to: '',
        
        isSection: false,
   
        route(route)
        {

          this.to = route;
          return this;
        },
    
        icon(iconString)
        {
          this.iconItem = iconString;
          return this;
        },
     
       
        label(label)
        {
          this.labelItem = label;
          return this;
        },
    
       
        
      };
}
