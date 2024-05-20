import React from "react";
 import { fireEvent, render, screen, waitFor } from "@testing-library/react";
 import '@testing-library/jest-dom';
import Register, {
  validateInput,validatePassword
} from "./register.jsx";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios", ()=>({
    __esModule:true,

    default:{
        get:() => ({
            data:{id:1,name:"John"}
        }),
    },
}))
//Kiểm tra trình dữ chỗ và nút button có trên màn hình không
test("first-name input should be rendered", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const firstInputEl = screen.getByPlaceholderText(/Họ/i);
    expect(firstInputEl).toBeInTheDocument();
  });
  test("last-name input should be rendered", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const firstInputEl = screen.getByPlaceholderText(/Tên/i);
    expect(firstInputEl).toBeInTheDocument();
  });
test("email input should be rendered", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  expect(usernameInputEl).toBeInTheDocument();
});
test("button should be rendered", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});
test("password input should be rendered", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText("Mật khẩu");
  expect(passwordInputEl).toBeInTheDocument();
});

// Kiểm tra value input có rỗng
test("first-name input should be empty", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const firstInputEl = screen.getByPlaceholderText(/Họ/i);
    expect(firstInputEl.value).toBe("");
  });
  test("last-name input should should be empty", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const firstInputEl = screen.getByPlaceholderText(/Tên/i);
    expect(firstInputEl.value).toBe("");
  });
  test("email input should be empty", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const usernameInputEl = screen.getByPlaceholderText(/Email/i);
    expect(usernameInputEl.value).toBe("");
  });
  test("password input input should be empty", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);
    expect(passwordInputEl.value).toBe("");
  });
  
//Vô hiệu hóa button khi chưa đủ thông tin
test("button should be disabled", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled()
});

// Kiểm tra xem phần tử chứa thông báo lỗi có ẩn đi ban đầu không
test("error message should not be visible initially", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const errorEl = screen.queryByTestId("error"); // Sử dụng queryByTestId để kiểm tra không tồn tại
    expect(errorEl).not.toBeInTheDocument();
  });
  
//Loading không hiện lên 
test("loading should not be rendered", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).not.toHaveTextContent(/Loading/i);
  });

//Kiểm tra các mục có thể thay đổi
test("first-name input should change", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const firstNameInputEl = screen.getByPlaceholderText(/Họ/i);
    const testValue="test";
    fireEvent.change(firstNameInputEl, { target: { value: testValue } });
    expect(firstNameInputEl.value).toBe(testValue);
  });

  test("last-name input should change", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const lastNameInputEl = screen.getByPlaceholderText(/Tên/i);
    const testValue="test";
    fireEvent.change(lastNameInputEl,{target:{value:testValue}});
    expect(lastNameInputEl.value).toBe(testValue);
  });
  test("email input should change", () => {//email có thể thay đổi
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const usernameInputEl = screen.getByPlaceholderText(/Email/i);
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });
  
  test("password input should change", () => {//password có thể thay đổi
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);
    const testValue = "test";
  
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  //Kiểm tra khi đầy đủ thông tin thì button không bị vô hiệu hóa
  test("button should not be disabled when inputs exist", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const buttonEl = screen.getByRole("button");
    const firstNameInputEl = screen.getByPlaceholderText(/Họ/i);
    const lastNameInputEl = screen.getByPlaceholderText(/Tên/i);
    const usernameInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);
  
    const testValue = "test";
  
    fireEvent.change(firstNameInputEl, { target: { value: testValue } });
    fireEvent.change(lastNameInputEl, { target: { value: testValue } });
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(buttonEl).not.toBeDisabled();
  });

 // Loading hiện lên khi click
test("loading should not be rendered when click", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const buttonEl = screen.getByRole("button");
    const firstNameInputEl = screen.getByPlaceholderText(/Họ/i);
    const lastNameInputEl = screen.getByPlaceholderText(/Tên/i);
    const usernameInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);
  
    const testValue = "test";
  
    fireEvent.change(firstNameInputEl, { target: { value: testValue } });
    fireEvent.change(lastNameInputEl, { target: { value: testValue } });
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

   expect(buttonEl).toHaveTextContent("Loading");
  });

//Kiểm tra định dạng Email
  test("validate function should pass on correct input", () => {
    const text = "text@test.com";
    expect(validateInput(text)).toBe(true);
  });

  test("validate function should fail on correct input", () => {
    const text = "text@testcom";
    expect(validateInput(text)).not.toBe(true);
  });

//Kiểm tra kí tự mật khẩu
test("validate password function should pass on correct input", () => {
    const text = "password";
    expect(validatePassword(text)).toBe(true);
  });

 //Kiểm tra email đã tồn tại khi click
 test("Email is exists", async() => {                 //SAI
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  const firstNameInputEl = screen.getByPlaceholderText(/Họ/i);
  const lastNameInputEl = screen.getByPlaceholderText(/Tên/i);
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);

  const testValue = "admin@gmail.com";

  fireEvent.change(firstNameInputEl, { target: { value: testValue } });
  fireEvent.change(lastNameInputEl, { target: { value: testValue } });
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  Tên/i);
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Mật khẩu/i);
  await screen.findByText("Email đã tồn tại");
  expect(screen.getByText("Email đã tồn tại")).toBeInTheDocument();
  // const errorEl = screen.getByTestId("error");
  // expect(errorEl).toHaveTextContent(/Email đã tồn tại/i);
});
