import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Categories from "./Categories.jsx";
import userEvent from "@testing-library/user-event";

test("placeholder search", async () => {
  render(<Categories />);
  screen.getByPlaceholderText(/Tìm kiếm.../i);
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "Dê",
        slug: "de",
      }),
  })
);

describe("Categories", () => {
  it("loads the joke on mount", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => render(<Categories />));
    // eslint-disable-next-line testing-library/await-async-query
    // expect(screen.getAllByText("Dê")).toBeInTheDocument();
  });
});

// test('Test theme button toggle', async () => {
//   render(<Categories />);

//   const createButton = screen.getByRole(/Button/i);

//   userEvent.click(createButton);
//     expect(screen.getByText('Tên nhóm')).toBeInTheDocument();
//     // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
//     expect(screen.getByText('Mô tả')).toBeInTheDocument();
//     // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
//     expect(screen.getByLabelText('Lưu')).toBeInTheDocument(); // Kiểm tra xem nút "Lưu" có hiển thị hay không
//   // });
// });