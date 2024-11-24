export default function Table() {
  return {
    columnsTable: [],
    headerActionsTable: [],
    actionsTable: [],
    bulkActionsTable: [],
    filtersTable: [],

    columns(columns) {
      this.columnsTable = columns;
      return this;
    },
    headerActions(actions) {
      this.headerActionsTable = actions;
      return this;
    },
    actions(actions) {
      this.actionsTable = actions;
      return this;
    },
    bulkActions(actions) {
      this.bulkActionsTable = actions;

      return this;
    },
    filters(filters) {
      this.filtersTable = filters;
      return this;
    },

    getColumns() {
      return this.columnsTable;
    },
    getHeaderActions() {
      return this.headerActionsTable;
    },
    getActions() {
      return this.actionsTable;
    },
    getBulkActions() {
      return this.bulkActionsTable;
    },
    getFilters() {
      return this.filtersTable;
    },
  };
}
