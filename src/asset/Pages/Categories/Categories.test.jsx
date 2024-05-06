// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import Categories from "./Categories.jsx";
// jest.mock("./api");

// test('placeholder', async () => {
//   render(<Categories />);
//   screen.getByPlaceholderText(/Tìm kiếm.../i);
// });

import { screen, render } from "@testing-library/react";
import TodoList, { todoUrl, userUrl } from "./api";

import { rest } from "msw";
import { setupServer } from "msw/node";

const todoResponse = rest.get(todoUrl, (req, res, ctx) => {
  return res(
    ctx.json([
      { id: 1, userId: 1, title: "clean room", completed: true },
      { id: 2, userId: 2, title: "clean car", completed: true },
    ])
    // ctx.json([
    //   {
    //     _id: "66091f9cdf96ed7a1635a967",
    //     name: "Giống cừu Kelantan",
    //     slug: "giong-cuu-kelantan",
    //     description: "Xuất xứ tại tỉnh Kelantan của bán đảo Malacca thuộc Malaysia. Do một số chủ đồn điền người Pháp nhập vào nuôi tại nước ta khoảng năm 1906 để thử nghiệm. Cừu Kelantan là giống nhỏ con như cừu Yunam. Có sắc lông màu vàng hoặc trắng, đẩu nhỏ, cổ ngắn, thân thấp, đùi ngắn và nhỏ nên ít thịt. Người dân đặt cho chúng cái tên là “cừu cỏ” vì trông thân chúng nhỏ như con dê cỏ nội địa của nước ta.",
    //     images: [
    //       {
    //         path: "https://res.cloudinary.com/dzo0r5bea/image/upload/v1711874062/agriculture_traceability/gdcmeghissbqjk4sxvlo.jpg",
    //         filename: "agriculture_traceability/gdcmeghissbqjk4sxvlo",
    //         _id: "6609200fdf96ed7a1635a972"
    //       }
    //     ],
    //     createdAt: "2024-03-31T08:32:28.857Z",
    //     updatedAt: "2024-03-31T08:34:23.759Z",
    //     __v: 1
    //   },
    //   {
    //     _id: "66138d895f2feff77d198e91",
    //     name: "Dê",
    //     slug: "de",
    //     description: "Dê (danh pháp hai phần: Capra hircus) là loài động vật nhai lại, chân có móng thuộc họ Bovidae. Chúng là loài gia súc, có lẽ sau chó và có lẽ cùng thời với cừu, được nuôi để lấy thịt dê, sữa dê và da dê. ",
    //     images: [
    //       {
    //         path: "https://res.cloudinary.com/dzo0r5bea/image/upload/v1714187694/agriculture_traceability/jskv0mgz2ynevzx0spts.jpg",
    //         filename: "agriculture_traceability/jskv0mgz2ynevzx0spts",
    //         _id: "662c6dafa4dac8237501ed31"
    //       }
    //     ],
    //     createdAt: "2024-04-08T06:24:09.900Z",
    //     updatedAt: "2024-04-27T03:15:41.570Z",
    //     __v: 1
    //   }
    // ],)
  );
});

const todoErrorResponse = rest.get(todoUrl, (req, res, ctx) => {
  return res(ctx.status(500));
});

const userResponse = rest.get(userUrl, (req, res, ctx) => {
  return res(
    ctx.json([
      { id: 1, name: "Bruce Banner" },
      { id: 2, name: "Clark Kent" },
    ])
  );
});

const handlers = [todoResponse, userResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should have the correct todo item clean room", async () => {
  render(<TodoList />);
  const todoItem = await screen.findByText("clean room");
  expect(todoItem).toBeVisible();
});

test("it should have correct user Bruce Banner", async () => {
  render(<TodoList />);
  const todoItem = await screen.findByText("Bruce Banner");
  expect(todoItem).toBeVisible();
});

test("it should have the correct todo item clean car", async () => {
  render(<TodoList />);
  const todoItem = await screen.findByText("clean car");
  expect(todoItem).toBeVisible();
});

test("it should have correct user Clark Kent", async () => {
  render(<TodoList />);
  const todoItem = await screen.findByText("Clark Kent");
  expect(todoItem).toBeVisible();
});

test("it should handle error message from todo", async () => {
  server.use(todoErrorResponse);
  render(<TodoList />);
  const todoItem = await screen.findByText("Opps come back later");
  expect(todoItem).toBeVisible();
});
