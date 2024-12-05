export default function Table(display = "table")
{
  return {
    columnsTable: [],
    headerActionsTable: [],
    actionsTable: [],
    bulkActionsTable: [],
    filtersTable: [],
    dataCallback: undefined,
    displayList: display,
    listSearchPlaceholder: null,
    listSimplePagination: true,

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
    searchable()
    {
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
      this.columnsTable = columns;
      return this;
    },
    headerActions(actions)
    {
      this.headerActionsTable = actions;
      return this;
    },
    actions(actions)
    {
      this.actionsTable = actions;
      return this;
    },
    bulkActions(actions)
    {
      this.bulkActionsTable = actions;

      return this;
    },
    filters(filters)
    {
      this.filtersTable = filters;
      return this;
    },

    getColumns()
    {
      return this.columnsTable;
    },
    getHeaderActions()
    {
      return this.headerActionsTable;
    },
    getActions()
    {
      return this.actionsTable;
    },
    getBulkActions()
    {
      return this.bulkActionsTable;
    },
    getFilters()
    {
      return this.filtersTable;
    },
  };
}