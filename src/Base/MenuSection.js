export default function MenuSection() {
  return {
    labelItem: undefined,

    iconItem: undefined,

    items: [],

    isSection: true,
    icon(icon) {
      this.iconItem = icon;
      return this;
    },

    label(label) {
      this.labelItem = label;
      return this;
    },

    make(items) {
      this.items = items;
      return this;
    },
  };
}
