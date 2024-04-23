import React from "react";
import {
    render,
    fireEvent
} from "@testing-library/react";
import Login, {
    validateInput
} from "./Login.jsx";
import {
    BrowserRouter
} from "react-router-dom";

describe("Login", () => {
    test("validate function should pass on correct input", () => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("validate function should fail on correct input", () => {
        const text = "text@testcom";
        expect(validateInput(text)).not.toBe(true);
    });

    test("displays error message when email or password is missing", () => {
        const {
            getByLabelText,
            getByText
        } = render(
            // eslint-disable-next-line react/jsx-no-undef
            <
            BrowserRouter >
            <
            Login / >
            <
            /BrowserRouter>
        );
        const submitButton = getByText("Đăng nhập");
        fireEvent.click(submitButton);

        const errorMessage = getByText("Chưa nhập email hoặc mật khẩu");
        expect(errorMessage).toBeInTheDocument();
    });

});