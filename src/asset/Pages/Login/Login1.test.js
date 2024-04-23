



import React from "react";
 import { fireEvent, render, screen, waitFor } from "@testing-library/react";
 import '@testing-library/jest-dom';
import Login, {
  validateInput
} from "./Login.jsx";
import { BrowserRouter } from "react-router-dom";
  test("validate function should pass on correct input", () => {
    const text = "text@test.com";
    expect(validateInput(text)).toBe(true);
  });

  test("validate function should fail on correct input", () => {
    const text = "text@testcom";
    expect(validateInput(text)).not.toBe(true);
  });
test("email input should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  expect(usernameInputEl).toBeInTheDocument();
});
test("button should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});
test("password input should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  expect(passwordInputEl.value).toBe("");
});

    it("displays error message when email or password is missing", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
  
      const submitButton = screen.queryByRole('button');
  // expect(submitButton).toHaveTextContent(//);
      // const errorMessage = screen.getByText("Chưa nhập email hoặc mật khẩu");
      // expect(errorMessage).toBeInTheDocument();
    });

test("loading should not be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/Đăng nhập.../i);
});

test("email input should change", () => {//email có thể thay đổi
  render(
    <BrowserRouter>
      <Login />
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
      <Login />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exist", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("button should not be disabled when inputs exist 123", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});



