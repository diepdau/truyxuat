import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login1 from "./ForgotPassword.jsx";


test("email input should be rendered", () => {
  render(<Login1 />);
  const usernameInputEl = screen.getByPlaceholderText(/email/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login1 />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login1 />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(<Login1 />);
  const usernameInputEl = screen.getByPlaceholderText(/email/i);
  expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login1 />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login1 />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login1 />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Login1 />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("email input should change", () => {
  render(<Login1 />);
  const usernameInputEl = screen.getByPlaceholderText(/email/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login1 />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exist", () => {
  render(<Login1 />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when click", () => {
  render(<Login1 />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

// test("loading should not be rendered after fetching", async () => {
//   render(<Login1 />);
//   const buttonEl = screen.getByRole("button");
//   const usernameInputEl = screen.getByPlaceholderText(/email/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(usernameInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
// });

