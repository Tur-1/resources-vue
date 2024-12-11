export default function Table(display = "table")
{
  return {
    listColumns: [],
    listSearchable: false,
    listHeaderActions: [],
    listActions: [],
    listBulkActions: [],
    listFilters: [],
    listDisplay: display,
    listSearchPlaceholder: null,
    listSimplePagination: true,
    dataCallback: undefined,


    data(callback)
    {
      this.dataCallback = callback;
      return this;
    },
     getData()
    {
      return typeof this.dataCallback === "function" ?
         this.dataCallback() :
        this.dataCallback;
    },
    searchable(searchable = true)
    {
      this.listSearchable = searchable;
      return this;
    },
    searchPlaceholder(placeholder = "search")
    {
      this.listSearchPlaceholder = placeholder;
      return this;
    },
    simplePagination(condition = true)
    {
      this.listSimplePagination = condition;
      return this;
    },
    columns(columns)
    {
      this.listColumns = columns;
      return this;
    },
    headerActions(actions)
    {
      this.listHeaderActions = actions;
      return this;
    },
    actions(actions)
    {
      this.listActions = actions;
      return this;
    },
    bulkActions(actions)
    {
      this.listBulkActions = actions;

      return this;
    },
    filters(filters)
    {
      this.listFilters = filters;
      return this;
    },
  };
}