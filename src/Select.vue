<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    filter: Function,
    onSelect: Function
  },
  data() {
    return {
      isOpen: false,
      value: "",
      highlightedIndex: null,
      labelId: "my-select"
    };
  },
  methods: {
    clear() {
      this.isOpen = false;
      this.value = "";
    },
    moveHighlightedIndex(number) {
      if (this.highlightedIndex === null) {
        return (this.highlightedIndex =
          number === -1 ? this.filteredItems.length - 1 : 0);
      }

      const nextHighlightedIndex = this.highlightedIndex + number;

      if (nextHighlightedIndex < 0) {
        this.highlightedIndex = this.filteredItems.length - 1;
      } else if (nextHighlightedIndex > this.filteredItems.length - 1) {
        this.highlightedIndex = 0;
      } else {
        this.highlightedIndex = nextHighlightedIndex;
      }
    },
    selectItemAtIndex(index) {
      const itemAtIndex = this.filteredItems[index];
      this.onSelect(itemAtIndex);
      this.highlightedIndex = index;
      this.isOpen = false;
      this.value = itemAtIndex;
    }
  },
  computed: {
    filteredItems() {
      return this.filter ? this.filter(this.items, this.value) : this.items;
    }
  },
  render() {
    return this.$scopedSlots.default({
      highlightedIndex: this.highlightedIndex,
      isOpen: this.isOpen,
      items: this.filteredItems,
      value: this.value,
      clear: this.clear,
      close: () => {
        this.isOpen = false;
      },
      getInputProps: ({ placeholder = "" } = {}) => {
        return {
          placeholder,
          value: this.value,
          id: "input",
          "aria-autocomplete": "list",
          "aria-activedescendant": `item-${this.highlightedIndex}`
        };
      },
      getInputEvents: () => {
        return {
          blur: () => {
            this.isOpen = false;
          },
          input: e => {
            this.value = e.target.value;
            if (!this.isOpen) {
              this.isOpen = true;
            }
          },
          keydown: e => {
            switch (e.key) {
              case "Escape":
                e.preventDefault();
                this.clear();
                break;
              case "ArrowDown":
                e.preventDefault();
                if (!this.isOpen) {
                  this.isOpen = true;
                }
                this.moveHighlightedIndex(1);
                break;
              case "ArrowUp":
                e.preventDefault();
                if (!this.isOpen) {
                  this.isOpen = true;
                }
                this.moveHighlightedIndex(-1);
                break;
              case "Enter":
                e.preventDefault();
                if (!this.isOpen) {
                  return (this.isOpen = true);
                }

                this.selectItemAtIndex(this.highlightedIndex);
                break;
              default:
                return;
            }
          }
        };
      },
      getItemProps: index => ({
        "aria-selected": index === this.highlightedIndex,
        id: `item-${index}`,
        role: "option"
      }),
      getItemEvents: index => {
        return {
          click: () => {
            this.selectItemAtIndex(index);
          },
          mousemove: () => {
            this.highlightedIndex = index;
          },
          mousedown: () => {
            this.selectItemAtIndex(index);
          }
        };
      },
      getLabelProps: ({ id: userId } = {}) => {
        const id = userId === undefined ? this.labelId : userId;
        return {
          id
        };
      },
      getListProps: () => ({
        "aria-labelledby": this.labelId,
        role: "listbox",
        id: "list"
      })
    });
  }
};
</script>
