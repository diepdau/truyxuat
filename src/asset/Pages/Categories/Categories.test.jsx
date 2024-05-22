import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Categories from "./Categories.jsx";
import { AuthContext } from "../../service/user_service.js";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGhhbiBRdXllbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcklkIjoiNjY0MTg4ZDNmM2RmYmUzMzAwMWMxYTQxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MTMyMjA0LCJleHAiOjE3MTYyMTg2MDR9.Qa6JXgfXgcl1-Q668_fCb-oV99s_8CdG6oHzMepyM6c";

const mockSuccessResponse = [
  {
    _id: "66091f9cdf96ed7a1635a967",
    name: "Giống cừu Kelantan",
    slug: "giong-cuu-kelantan",
  },
  {
    _id: "66138d895f2feff77d198e91",
    name: "Dê",
    slug: "de",
  },
];

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("it should have content name 'Giống cừu Kelantan'", async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({ categories: mockSuccessResponse, totalPages: 1 }),
    ok: true,
  });

  render(
    <AuthContext.Provider value={{ token }}>
      <Categories />
    </AuthContext.Provider>
  );
  await waitFor(() => {
    const categoryItem = screen.getByText("Giống cừu Kelantan");
    expect(categoryItem).toBeVisible();
  });
});

// test("it should have content description", async () => {
//   fetch.mockResolvedValueOnce({
//     json: async () => ({ categories: mockSuccessResponse, totalPages: 1 }),
//     ok: true,
//   });

//   render(
//     <AuthContext.Provider value={{ token }}>
//       <Categories />
//     </AuthContext.Provider>
//   );

//   await waitFor(() => {
//     const categoryItem = screen.getByText("giong-cuu-kelantan");
//     expect(categoryItem).toBeVisible();
//   });
// });

// test("it should have content name 'Dê'", async () => {
//   fetch.mockResolvedValueOnce({
//     json: async () => ({ categories: mockSuccessResponse, totalPages: 1 }),
//     ok: true,
//   });

//   render(
//     <AuthContext.Provider value={{ token: token }}>
//       <Categories />
//     </AuthContext.Provider>
//   );

//   await waitFor(() => {
//     const categoryItem = screen.getByText("Dê");
//     expect(categoryItem).toBeVisible();
//   });
// });

// test("it should handle error message", async () => {
//   render(<Categories />);
//   const errorMessage = await screen.findByText("No results found");
//   expect(errorMessage).toBeVisible();
// });

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         categories: [
//           {
//             _id: "66091f9cdf96ed7a1635a967",
//             name: "Giống cừu Kelantan",
//             slug: "giong-cuu-kelantan",
//           },
//           { _id: "66138d895f2feff77d198e91", name: "Dê", slug: "de" },
//         ],
//         totalPages: 1,
//       }),
//   })
// );

// test("placeholder search", async () => {
//   render(<Categories />);
//   screen.getByPlaceholderText(/Tìm kiếm.../i);
// });

// test("searches and displays searched category", async () => {
//   render(
//     <AuthContext.Provider value={{ token }}>
//       <Categories />
//     </AuthContext.Provider>
//   );

//   fetch.mockImplementationOnce(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           categories: [
//             { _id: "66138d895f2feff77d198e91", name: "Dê", slug: "de" },
//           ],
//           totalPages: 1,
//         }),
//     })
//   );

//   const searchInput = screen.getByPlaceholderText("Tìm kiếm...");
//   fireEvent.change(searchInput, { target: { value: "Dê" } });

//   await waitFor(() => {
//     expect(screen.getByText("Dê")).toBeInTheDocument();
//   });
//   expect(screen.queryByText("Giống cừu Kelantan")).not.toBeInTheDocument();
// });

// test('renders "Thêm mới" dialog when "Tạo" button is clicked', async () => {
//   render(<Categories />);
//   fireEvent.click(screen.getByText("Tạo"));
//   const dialogTitle = await screen.findByText("Thêm mới");
//   expect(dialogTitle).toBeInTheDocument();
// });

// test('renders "Thông báo" dialog when button "Xóa" is clicked', async () => {
//   render(<Categories />);
//   // const checkboxes = screen.getAllByRole("checkbox");
//   // checkboxes.forEach((checkbox) => {
//   //   fireEvent.click(checkbox);
//   // });
//   const deleteButton = screen.getByText("Xóa");
//   fireEvent.click(deleteButton);
//   const dialogTitle = await screen.findByText("Thông báo");
//   expect(dialogTitle).toBeInTheDocument();
//   const dialogElement = await screen.findByText(
//     "Bạn có chắc chắn xóa những nhóm này?"
//   );
//   expect(dialogElement).toBeInTheDocument();
// });

// test('Check that when clicking "Tên nhóm", the order of the group name column is sorted', () => {
//   render(<Categories />);

//   const rowsBeforeSort = screen.getAllByRole("row");
//   const tenNhomColumn = screen.getByText("Tên nhóm");
//   fireEvent.click(tenNhomColumn);

//   const rowsAfterSort = screen.getAllByRole("row");
//   expect(rowsBeforeSort.length).toEqual(rowsAfterSort.length);
//   rowsBeforeSort.forEach((rowBefore, index) => {
//     const rowAfter = rowsAfterSort[index];
//     expect(rowBefore).toEqual(rowAfter);
//   });
// });
