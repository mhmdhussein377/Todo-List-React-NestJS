import {render, screen} from "@testing-library/react";
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

});
