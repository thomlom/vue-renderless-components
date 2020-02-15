import { render as rtlRender, fireEvent } from "@testing-library/vue";
import SelectSimple from "../VSelect.vue";

function render(ui) {
  const items = ["apple", "orange", "pear", "strawberry", "blueberry"];
  const utils = rtlRender(ui, { props: { items } });
  const input = utils.getByPlaceholderText(/search/i);

  return {
    ...utils,
    input,
    items
  };
}

describe("simple select", () => {
  test("the list does not open on focus", async () => {
    const { input, items, queryByText } = render(SelectSimple);
    await fireEvent.focus(input);

    items.forEach(item => expect(queryByText(item)).not.toBeInTheDocument());
  });

  test("pressing down key should open the list and highlight the first item", async () => {
    const { input, items, queryByText } = render(SelectSimple);

    await fireEvent.keyDown(input, {
      key: "ArrowDown"
    });
    items.forEach(item => expect(queryByText(item)).toBeInTheDocument());
  });

  test.todo("pressing up key should open the list and highlight the last item");

  test.todo("highlights the next item by pressing down key");
  test.todo("highlights the previous item by pressing down key");
  test.todo("highlights an item on hovering");
  test.todo("select an item by click");
  test.todo("select an item by pressing enter");
  test.todo("pressing escape clears the select");
});
