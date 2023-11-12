import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input component", () => {
    test("renders with the correct label and placeholder", () => {
        const label = "Username";
        const placeholder = "Enter your username";
        render(<Input
            label={label}
            type="text"
            value=""
            placeholder={placeholder}
            name="username"
            onChange={() => {}}/>);

        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    test("calls the onChange function when the input value changes", () => {
        const onChangeMock = jest.fn()
        render(<Input
            label="Email"
            type="text"
            value=""
            placeholder="Enter your email"
            name="username"
            onChange={onChangeMock}/>);

        fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
            target: {value: "mohammad.hussein377@gmail.com"}
        })

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({target: {value: "mohammad.hussein377@gmail.com"}})
        )
    })

    test("renders as a required input when 'required' prop is provided", () => {
        render(<Input
            label="Email"
            type="text"
            value=""
            placeholder="Enter your email"
            name="username"
            onChange={() => {}}
            required/>);

        expect(screen.getAllByLabelText("Email")).toBeRequired()
    })

});
